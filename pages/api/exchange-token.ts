import type { NextApiRequest, NextApiResponse } from "next";

const SECRETS: Record<string, string> = {
  github: process.env.GITHUB_SECRET || "",
  notion: process.env.NOTION_SECRET || "",
  discord: process.env.DISCORD_SECRET || "",
  google: process.env.GOOGLE_SECRET || "",
  cloudflare: process.env.CLOUDFLARE_SECRET || "",
};

const CLIENT_IDS: Record<string, string> = {
  github: "Ov23liZa2VOeGWTIm7sY",
  notion: "3a4d872b-594c-8113-8f10-0037193a1f79",
  discord: "1529130544485498960",
  google: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
  cloudflare: "50e5a0cda519a8e7bf8e5b64f64f3464",
};

const TOKEN_URLS: Record<string, string> = {
  github: "https://github.com/login/oauth/access_token",
  notion: "https://api.notion.com/v1/oauth/token",
  discord: "https://discord.com/api/oauth2/token",
  google: "https://oauth2.googleapis.com/token",
  cloudflare: "https://dash.cloudflare.com/oauth2/token",
};

const USER_URLS: Record<string, string> = {
  github: "https://api.github.com/user",
  notion: "https://api.notion.com/v1/users/me",
  discord: "https://discord.com/api/users/@me",
  google: "https://www.googleapis.com/oauth2/v3/userinfo",
  cloudflare: "https://api.cloudflare.com/client/v4/user",
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const { code, provider, reauth_client_id } = req.body;

  if (!code || !provider) return res.status(400).json({ error: "Missing code or provider" });

  const baseUrl = process.env.NEXTAUTH_URL || `https://${req.headers.host}`;
  const redirectUri = `${baseUrl}/callback`;

  try {
    // Exchange code for access token
    let tokenData: any;

    if (provider === "notion") {
      const credentials = Buffer.from(`${CLIENT_IDS.notion}:${SECRETS.notion}`).toString("base64");
      const tokenRes = await fetch(TOKEN_URLS.notion, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${credentials}`,
        },
        body: JSON.stringify({ grant_type: "authorization_code", code, redirect_uri: redirectUri }),
      });
      tokenData = await tokenRes.json();
    } else if (provider === "discord") {
      const params = new URLSearchParams({
        client_id: CLIENT_IDS.discord,
        client_secret: SECRETS.discord,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      });
      const tokenRes = await fetch(TOKEN_URLS.discord, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      tokenData = await tokenRes.json();
    } else if (provider === "google") {
      const params = new URLSearchParams({
        client_id: CLIENT_IDS.google,
        client_secret: SECRETS.google,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      });
      const tokenRes = await fetch(TOKEN_URLS.google, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      tokenData = await tokenRes.json();
    } else if (provider === "cloudflare") {
      const params = new URLSearchParams({
        client_id: CLIENT_IDS.cloudflare,
        client_secret: SECRETS.cloudflare,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
      });
      const tokenRes = await fetch(TOKEN_URLS.cloudflare, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });
      tokenData = await tokenRes.json();
    } else {
      // GitHub
      const tokenRes = await fetch(TOKEN_URLS.github, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          client_id: CLIENT_IDS.github,
          client_secret: SECRETS.github,
          code,
          redirect_uri: redirectUri,
        }),
      });
      tokenData = await tokenRes.json();
    }

    if (tokenData.error) {
      return res.status(400).json({ error: tokenData.error_description || tokenData.error });
    }

    const accessToken = tokenData.access_token || tokenData.access_token;

    // Get user info
    const userRes = await fetch(USER_URLS[provider], {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        ...(provider === "notion" ? { "Notion-Version": "2022-06-28" } : {}),
      },
    });
    const userData = await userRes.json();

    // Normalize user data
    let user: any = {};
    if (provider === "github") {
      // Also get emails if email is null
      let email = userData.email;
      if (!email) {
        try {
          const emailRes = await fetch("https://api.github.com/user/emails", {
            headers: { "Authorization": `Bearer ${accessToken}` },
          });
          const emails = await emailRes.json();
          email = emails.find((e: any) => e.primary)?.email || emails[0]?.email;
        } catch {}
      }
      user = { id: String(userData.id), email, name: userData.name || userData.login, avatar: userData.avatar_url, username: userData.login };
    } else if (provider === "notion") {
      user = { id: userData.bot?.owner?.user?.id || userData.id, email: userData.bot?.owner?.user?.person?.email, name: userData.bot?.owner?.user?.name || userData.name, avatar: userData.bot?.owner?.user?.avatar_url };
    } else if (provider === "discord") {
      user = { id: userData.id, email: userData.email, name: userData.global_name || userData.username, avatar: userData.avatar ? `https://cdn.discordapp.com/avatars/${userData.id}/${userData.avatar}.png` : null, username: userData.username };
    } else if (provider === "google") {
      user = { id: userData.sub, email: userData.email, name: userData.name, avatar: userData.picture };
    } else if (provider === "cloudflare") {
      const u = userData.result || userData;
      user = { id: String(u.id), email: u.email, name: u.first_name ? `${u.first_name} ${u.last_name}` : u.username, avatar: null, username: u.username };
    }

    return res.status(200).json({ user, access_token: accessToken });
  } catch (err: any) {
    console.error("Token exchange error:", err);
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}
