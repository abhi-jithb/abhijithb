import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  if (!clientId) {
    return NextResponse.json(
      { error: "GITHUB_CLIENT_ID environment variable is not configured on the server." },
      { status: 500 }
    );
  }

  // Determine host and protocol dynamically to handle localhost and any Vercel domain automatically
  const host = req.headers.get("host") || "localhost:3000";
  const protocol = host.includes("localhost") || host.includes("127.0.0.1") ? "http" : "https";
  const redirectUri = `${protocol}://${host}/api/callback`;

  // Generate a random state for CSRF protection
  const state = Math.random().toString(36).substring(2, 15);

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=repo,user&redirect_uri=${encodeURIComponent(
    redirectUri
  )}&state=${state}`;

  return NextResponse.redirect(authUrl);
}
