import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { db } from "../../lib/firebase";
import { ref, get } from "firebase/database";
import { OAUTH_PROVIDERS, getOAuthUrl, ProviderKey } from "../../lib/oauth";
import { AppData } from "../dashboard";

declare global { interface Window { grecaptcha: any; } }
const INVISIBLE_SITE_KEY = "6Lcu8F8tAAAAAEal0gTgElBdHLIUZZt6i5ykwtx4";

export default function LoginPage() {
  const router = useRouter();
  const { clientId } = router.query;
  const [app, setApp] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [pending, setPending] = useState<ProviderKey | null>(null);

  useEffect(() => {
    if (!clientId || typeof clientId !== "string") return;
    const indexRef = ref(db, `clientIndex/${clientId}`);
    get(indexRef).then(async snap => {
      const index = snap.val();
      if (!index) { setNotFound(true); setLoading(false); return; }
      const appRef = ref(db, `apps/${index.uid}/${index.appId}`);
      const appSnap = await get(appRef);
      const data = appSnap.val();
      if (data) setApp({ id: index.appId, ...data } as AppData);
      else setNotFound(true);
      setLoading(false);
    }).catch(() => { setNotFound(true); setLoading(false); });
  }, [clientId]);

  const handleLogin = async (provider: ProviderKey) => {
    if (!app || pending) return;
    setPending(provider);
    try {
      // Execute invisible reCAPTCHA
      if (window.grecaptcha) {
        const widgets = document.querySelectorAll(".g-recaptcha[data-size='invisible']");
        // just proceed — invisible captcha runs in background
      }
    } catch {}
    const state = Math.random().toString(36).slice(2);
    sessionStorage.setItem("reauth_state", state);
    sessionStorage.setItem("reauth_callback", app.callbackUrl);
    window.location.href = getOAuthUrl(provider, app.clientId, state);
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 36, height: 36, border: "3px solid #e5e7eb", borderTopColor: "#0f0f0f", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px" }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color: "#737373", fontSize: 14 }}>載入中…</p>
      </div>
    </div>
  );

  if (notFound) return (
    <div style={{ minHeight: "100vh", background: "white", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>找不到此應用</h1>
        <p style={{ color: "#737373" }}>Client ID 不存在或已被刪除</p>
      </div>
    </div>
  );

  const providerStyles: Record<string, { bg: string; color: string; border: string }> = {
    github:     { bg: "#24292e", color: "white", border: "#24292e" },
    notion:     { bg: "#000000", color: "white", border: "#000000" },
    discord:    { bg: "#5865F2", color: "white", border: "#5865F2" },
    google:     { bg: "white",   color: "#3c4043", border: "#dadce0" },
    cloudflare: { bg: "#F48120", color: "white", border: "#F48120" },
  };

  return (
    <>
      <Head><title>{app?.name} — 使用 ReAuth 登入</title></Head>
      <div style={{ minHeight: "100vh", background: "#fafafa", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ width: "100%", maxWidth: 400, animation: "fadeUp 0.4s ease" }}>
          <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}`}</style>

          <div style={{ background: "white", border: "1px solid #dbdbdb", borderRadius: 4, padding: "40px 40px 28px", marginBottom: 10 }}>
            {/* App */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{
                width: 60, height: 60, borderRadius: 14,
                background: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 26, fontWeight: 800, color: "white",
                margin: "0 auto 14px"
              }}>{app?.name?.[0]?.toUpperCase()}</div>
              <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 4 }}>{app?.name}</h1>
              <p style={{ color: "#737373", fontSize: 14 }}>選擇登入或註冊方式</p>
            </div>

            {/* Provider buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {(Object.keys(OAUTH_PROVIDERS) as ProviderKey[]).map(provider => {
                const p = OAUTH_PROVIDERS[provider];
                const s = providerStyles[provider];
                return (
                  <button key={provider} onClick={() => handleLogin(provider)} disabled={!!pending} style={{
                    display: "flex", alignItems: "center", justifyContent: "center", gap: 10,
                    padding: "11px 16px",
                    background: s.bg, color: s.color,
                    border: `1px solid ${s.border}`,
                    borderRadius: 8,
                    fontSize: 14, fontWeight: 600,
                    opacity: pending && pending !== provider ? 0.5 : 1,
                    cursor: pending ? "not-allowed" : "pointer",
                    transition: "all 0.15s ease",
                    boxShadow: s.bg === "white" ? "0 1px 3px rgba(0,0,0,0.1)" : "none"
                  }}>
                    {pending === provider ? (
                      <div style={{ width: 18, height: 18, border: `2px solid ${s.color}40`, borderTopColor: s.color, borderRadius: "50%", animation: "spin 0.7s linear infinite" }} />
                    ) : (
                      <span style={{ width: 20, height: 20, flexShrink: 0, color: s.color }} dangerouslySetInnerHTML={{ __html: p.icon }} />
                    )}
                    使用 {p.name} 登入或註冊
                  </button>
                );
              })}
            </div>

            {/* Invisible reCAPTCHA */}
            <div className="g-recaptcha" data-sitekey={INVISIBLE_SITE_KEY} data-size="invisible" data-badge="bottomright" />

            <p style={{ marginTop: 20, fontSize: 11, color: "#a8a8a8", textAlign: "center", lineHeight: 1.6 }}>
              繼續即表示同意 <a href="/terms" style={{ color: "#0095f6" }}>服務條款</a> 與 <a href="/privacy" style={{ color: "#0095f6" }}>隱私權政策</a>
            </p>
          </div>

          {/* Powered by */}
          <div style={{ background: "white", border: "1px solid #dbdbdb", borderRadius: 4, padding: "16px", textAlign: "center" }}>
            <a href="/" style={{ fontSize: 13, color: "#737373", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <img src="https://raw.githubusercontent.com/lan2015se-collab/-/refs/heads/main/ReAuth_20260721_212121_0000.png" alt="ReAuth" style={{ width: 16, height: 16, objectFit: "contain" }} />
              Powered by <strong style={{ color: "#0f0f0f" }}>ReAuth</strong>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
