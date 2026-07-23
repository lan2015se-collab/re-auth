export const OAUTH_PROVIDERS = {
  github: {
    clientId: "Ov23liZa2VOeGWTIm7sY",
    authUrl: "https://github.com/login/oauth/authorize",
    tokenUrl: "https://github.com/login/oauth/access_token",
    userUrl: "https://api.github.com/user",
    scope: "read:user user:email",
    name: "GitHub",
    color: "#24292e",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>`,
  },
  notion: {
    clientId: "3a4d872b-594c-8113-8f10-0037193a1f79",
    authUrl: "https://api.notion.com/v1/oauth/authorize",
    tokenUrl: "https://api.notion.com/v1/oauth/token",
    userUrl: "https://api.notion.com/v1/users/me",
    scope: "",
    name: "Notion",
    color: "#000000",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.459 4.208c.746.606 1.026.56 2.428.466l13.215-.793c.28 0 .047-.28-.046-.326L17.86 1.968c-.42-.326-.981-.7-2.055-.607L3.01 2.295c-.466.046-.56.28-.374.466zm.793 3.08v13.904c0 .747.373 1.027 1.214.98l14.523-.84c.841-.046.935-.56.935-1.167V6.354c0-.606-.233-.933-.748-.887l-15.177.887c-.56.047-.747.327-.747.933zm14.337.745c.093.42 0 .84-.42.888l-.7.14v10.264c-.608.327-1.168.514-1.635.514-.748 0-.935-.234-1.495-.933l-4.577-7.186v6.952L12.21 19s0 .84-1.168.84l-3.222.186c-.093-.186 0-.653.327-.746l.84-.233V9.854L7.822 9.76c-.094-.42.14-1.026.793-1.073l3.456-.233 4.764 7.279v-6.44l-1.215-.14c-.093-.514.28-.887.747-.933zM1.936 1.035l13.31-.98c1.634-.14 2.055-.047 3.082.7l4.249 2.986c.7.513.934.653.934 1.213v16.378c0 1.026-.373 1.634-1.68 1.726l-15.458.934c-.98.047-1.448-.093-1.962-.747l-3.129-4.06c-.56-.747-.793-1.306-.793-1.96V2.667c0-.839.374-1.54 1.447-1.632z"/></svg>`,
  },
  discord: {
    clientId: "1529130544485498960",
    authUrl: "https://discord.com/api/oauth2/authorize",
    tokenUrl: "https://discord.com/api/oauth2/token",
    userUrl: "https://discord.com/api/users/@me",
    scope: "identify email",
    name: "Discord",
    color: "#5865F2",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057.1 18.09.12 18.12.144 18.14a19.9 19.9 0 0 0 5.993 3.03.077.077 0 0 0 .084-.028 13.96 13.96 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/></svg>`,
  },
  google: {
    clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "52797529844-brd07ntn33oe54hj5fpsdsktkdjrn6lt.apps.googleusercontent.com",
    authUrl: "https://accounts.google.com/o/oauth2/v2/auth",
    tokenUrl: "https://oauth2.googleapis.com/token",
    userUrl: "https://www.googleapis.com/oauth2/v3/userinfo",
    scope: "openid email profile",
    name: "Google",
    color: "#4285F4",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>`,
  },
  cloudflare: {
    clientId: "50e5a0cda519a8e7bf8e5b64f64f3464",
    authUrl: "https://dash.cloudflare.com/oauth2/auth",
    tokenUrl: "https://dash.cloudflare.com/oauth2/token",
    userUrl: "https://api.cloudflare.com/client/v4/user",
    scope: "account:read",
    name: "Cloudflare",
    color: "#F48120",
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 15.5c.1-.4.1-.8-.1-1.1-.2-.3-.5-.5-.9-.6l-9.1-.1c-.1 0-.1-.1-.1-.1s0-.1.1-.1l9.2-.5c.9 0 1.9-.8 2.2-1.7l.5-1.4c0-.1 0-.2-.1-.2C17.4 8.5 15.5 7.5 13.4 7.5c-1.7 0-3.3.7-4.4 1.9-.6-.4-1.3-.7-2.1-.7-1.6 0-2.9 1.1-3.1 2.6C2.4 11.6 1 13.1 1 14.9 1 16.9 2.6 18.5 4.6 18.5h11.6c.8 0 1.6-.6 1.8-1.4l.2-.8c0-.3-.2-.6-.5-.7-.4-.1-.9 0-1.1.3z"/></svg>`,
  },
};

export type ProviderKey = keyof typeof OAUTH_PROVIDERS;

export function getOAuthUrl(provider: ProviderKey, clientId: string, state: string): string {
  const p = OAUTH_PROVIDERS[provider];
  const baseUrl = typeof window !== "undefined" ? window.location.origin : process.env.NEXTAUTH_URL || "";
  const redirectUri = `${baseUrl}/callback`;
  const params = new URLSearchParams({
    client_id: p.clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    state: JSON.stringify({ provider, reauth_client_id: clientId, state }),
    ...(p.scope ? { scope: p.scope } : {}),
  });
  if (provider === "notion") {
    params.append("owner", "user");
  }
  return `${p.authUrl}?${params.toString()}`;
}
