import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const DATA_FILE = path.join(process.cwd(), "src/content/reactions.json");

interface ReactionCounts {
  love: number;
  smile: number;
  think: number;
  inspire: number;
}

interface ReactionData {
  reactions: Record<string, ReactionCounts>;
  userVotes: Record<string, string>; // Maps userHash to reactionType
}

// Default/Initial reactions count helper
const getInitialCounts = (): ReactionCounts => ({
  love: 0,
  smile: 0,
  think: 0,
  inspire: 0,
});

// Load data safely
function loadData(): ReactionData {
  if (!fs.existsSync(DATA_FILE)) {
    return { reactions: {}, userVotes: {} };
  }
  try {
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    const parsed = JSON.parse(fileContent);
    return {
      reactions: parsed.reactions || {},
      userVotes: parsed.userVotes || {},
    };
  } catch (e) {
    console.error("Error reading reactions database:", e);
    return { reactions: {}, userVotes: {} };
  }
}

// Save data safely
function saveData(data: ReactionData) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("Error writing reactions database:", e);
  }
}

// Generate anonymous secure user hash for the article slug
function getUserHash(req: NextRequest, slug: string): string {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "127.0.0.1";
  const userAgent = req.headers.get("user-agent") || "";
  
  // Combine IP, user agent, and slug to make a unique hash key
  return crypto
    .createHash("sha256")
    .update(`${ip}-${userAgent}-${slug}`)
    .digest("hex");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "Missing slug parameter." }, { status: 400 });
  }

  const data = loadData();
  const userHash = getUserHash(req, slug);
  
  const postReactions = data.reactions[slug] || getInitialCounts();
  const userReaction = data.userVotes[userHash] || null;

  return NextResponse.json({
    reactions: postReactions,
    userReaction,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { slug, type } = body;

    if (!slug || !type) {
      return NextResponse.json({ error: "Missing slug or type in request body." }, { status: 400 });
    }

    const validTypes = ["love", "smile", "think", "inspire"];
    if (!validTypes.includes(type)) {
      return NextResponse.json({ error: "Invalid reaction type." }, { status: 400 });
    }
    const typeCast = type as keyof ReactionCounts;

    const data = loadData();
    const userHash = getUserHash(req, slug);

    // Initialize counts for this slug if they don't exist
    if (!data.reactions[slug]) {
      data.reactions[slug] = getInitialCounts();
    }

    const currentCounts = data.reactions[slug];
    const previousReaction = data.userVotes[userHash] || null;

    if (previousReaction === typeCast) {
      // 1. User clicked the same emoji again -> Undo reaction
      currentCounts[typeCast] = Math.max(0, currentCounts[typeCast] - 1);
      delete data.userVotes[userHash];
    } else {
      // 2. User reacts for the first time OR changes reaction
      if (previousReaction) {
        // Decrement old reaction type
        const prevType = previousReaction as keyof ReactionCounts;
        currentCounts[prevType] = Math.max(0, currentCounts[prevType] - 1);
      }
      
      // Increment new reaction type
      currentCounts[typeCast] = (currentCounts[typeCast] || 0) + 1;
      
      // Save new vote
      data.userVotes[userHash] = typeCast;
    }

    saveData(data);

    return NextResponse.json({
      reactions: currentCounts,
      userReaction: data.userVotes[userHash] || null,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to process reaction." }, { status: 500 });
  }
}
