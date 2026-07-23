# ReAuth

Universal OAuth 2.0 hub — integrate GitHub, Google, Discord, Notion, and Cloudflare OAuth with a single ReAuth integration.

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in the values:

```bash
cp .env.example .env.local
```

The most important one is `NEXTAUTH_URL` — set this to your Vercel deployment URL after deploying.

### 3. Firebase Realtime Database Rules

In the Firebase console, set your Realtime Database rules to allow authenticated users to read/write their own data:

```json
{
  "rules": {
    "apps": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    }
  }
}
```

### 4. Google OAuth (optional)

To enable Google login:
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create OAuth 2.0 credentials
3. Add your Vercel URL + `/callback` as an authorized redirect URI
4. Add client ID to `NEXT_PUBLIC_GOOGLE_CLIENT_ID` and secret to `GOOGLE_SECRET`

### 5. Deploy to Vercel

```bash
# Push to GitHub, then connect repo in Vercel
# Set environment variables in Vercel dashboard
```

## How it works

1. You register on ReAuth and create an app → get Client ID + Client Secret
2. Add a "Login with ReAuth" button to your site pointing to `https://reauth.app/{client-id}/`
3. Users choose their preferred OAuth provider (GitHub, Google, etc.)
4. ReAuth handles the OAuth flow and sends user data to your Callback URL

## OAuth Callback Data

Your callback URL receives a POST request with:

```json
{
  "provider": "github",
  "user": {
    "id": "123456",
    "email": "user@example.com",
    "name": "User Name",
    "avatar": "https://..."
  },
  "access_token": "...",
  "reauth_client_id": "your-client-id"
}
```
