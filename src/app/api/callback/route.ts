import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return NextResponse.json(
      { error: "Server environment variables GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET are not set." },
      { status: 500 }
    );
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  if (!code) {
    return NextResponse.json({ error: "Missing authorization code from GitHub." }, { status: 400 });
  }

  try {
    // Exchange the temporary code for an access token
    const res = await fetch("https://github.com/login/oauth/access_token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: clientId,
        client_secret: clientSecret,
        code,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return NextResponse.json(
        { error: data.error_description || data.error },
        { status: 400 }
      );
    }

    const token = data.access_token;

    // Send the token back to Decap CMS on the original page using window.opener.postMessage
    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <title>Authorizing Portfolio Admin...</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background: #fafaf9;
            color: #1c1917;
            text-align: center;
          }
          .card {
            background: white;
            padding: 2.5rem;
            border-radius: 1.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.05);
            border: 1px border black/5;
          }
          h2 { margin-top: 0; font-weight: 600; }
          p { color: #78716c; margin-bottom: 0; }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Authorizing...</h2>
          <p>Connecting with your GitHub account, please wait...</p>
        </div>
        <script>
          const token = "${token}";
          console.log("GitHub OAuth callback page loaded. Token exists:", !!token);
          
          const send = () => {
            if (window.opener) {
              console.log("Posting success message to opener window...");
              window.opener.postMessage(
                "authorization:github:success:" + JSON.stringify({ token: token, provider: "github" }),
                "*"
              );
              // Delay window.close() to ensure the browser successfully delivers the postMessage
              console.log("Scheduling popup window close...");
              setTimeout(() => {
                console.log("Closing popup window.");
                window.close();
              }, 1000);
            } else {
              console.warn("Opener window not detected.");
              const p = document.querySelector("p");
              if (p) {
                p.innerText = "Authorization successful! You can close this window now.";
              }
            }
          };
          
          send();
        </script>
      </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: {
        "Content-Type": "text/html",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to exchange OAuth token with GitHub" },
      { status: 500 }
    );
  }
}
