import { useState, useEffect, useRef } from "react";
import { auth } from "../lib/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

declare global {
  interface Window {
    grecaptcha: any;
    onInvisibleCaptchaLoad?: () => void;
  }
}

const CHECKBOX_SITE_KEY = "6Lcr7F8tAAAAAL45ahTZhF5-ofmLKtdf8DU2lwH_";
const INVISIBLE_SITE_KEY = "6Lcu8F8tAAAAAEal0gTgElBdHLIUZZt6i5ykwtx4";

interface Props { onClose: () => void; }

export default function AuthModal({ onClose }: Props) {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [captchaToken, setCaptchaToken] = useState("");
  const checkboxRef = useRef<HTMLDivElement>(null);
  const invisibleRef = useRef<number | null>(null);
  const widgetRef = useRef<number | null>(null);

  useEffect(() => {
    const renderCheckbox = () => {
      if (!checkboxRef.current || !window.grecaptcha?.render) return;
      if (widgetRef.current !== null) {
        try { window.grecaptcha.reset(widgetRef.current); } catch {}
        return;
      }
      widgetRef.current = window.grecaptcha.render(checkboxRef.current, {
        sitekey: CHECKBOX_SITE_KEY,
        callback: (token: string) => setCaptchaToken(token),
        "expired-callback": () => setCaptchaToken(""),
      });
    };

    if (window.grecaptcha?.render) {
      renderCheckbox();
    } else {
      const interval = setInterval(() => {
        if (window.grecaptcha?.render) { clearInterval(interval); renderCheckbox(); }
      }, 200);
      return () => clearInterval(interval);
    }
  }, []);

  // Reset captcha when mode changes
  useEffect(() => {
    setCaptchaToken("");
    if (widgetRef.current !== null && window.grecaptcha?.reset) {
      try { window.grecaptcha.reset(widgetRef.current); } catch {}
    }
  }, [mode]);

  const handle = async () => {
    if (!captchaToken) { setError("請完成驗證"); return; }
    setError(""); setLoading(true);
    try {
      // Execute invisible captcha
      if (window.grecaptcha && invisibleRef.current !== null) {
        await new Promise<void>((resolve) => {
          window.grecaptcha.execute(invisibleRef.current!);
          resolve();
        });
      }
      if (mode === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
      window.location.href = "/dashboard";
    } catch (e: any) {
      const msg: Record<string, string> = {
        "auth/email-already-in-use": "此 Email 已被使用",
        "auth/invalid-email": "Email 格式不正確",
        "auth/weak-password": "密碼至少需要 6 個字元",
        "auth/user-not-found": "找不到此帳號",
        "auth/wrong-password": "密碼錯誤",
        "auth/invalid-credential": "帳號或密碼錯誤",
      };
      setError(msg[e.code] || e.message);
      setCaptchaToken("");
      if (widgetRef.current !== null && window.grecaptcha?.reset) {
        try { window.grecaptcha.reset(widgetRef.current); } catch {}
      }
    } finally { setLoading(false); }
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "rgba(0,0,0,0.5)",
      backdropFilter: "blur(4px)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
      animation: "fadeIn 0.2s ease"
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "white",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "36px 32px",
        width: "100%", maxWidth: 400,
        boxShadow: "var(--shadow-lg)",
        animation: "fadeUp 0.3s ease"
      }}>
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <img
            src="https://raw.githubusercontent.com/lan2015se-collab/-/refs/heads/main/ReAuth_20260721_212121_0000.png"
            alt="ReAuth"
            style={{ width: 48, height: 48, objectFit: "contain", margin: "0 auto 12px", display: "block" }}
          />
          <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.03em" }}>
            {mode === "login" ? "登入 ReAuth" : "建立帳號"}
          </h2>
          <p style={{ color: "var(--text2)", fontSize: 14, marginTop: 4 }}>
            {mode === "login" ? "歡迎回來" : "開始免費使用"}
          </p>
        </div>

        {/* Tabs */}
        <div style={{
          display: "flex", background: "var(--bg3)",
          borderRadius: 10, padding: 4, marginBottom: 24, gap: 4
        }}>
          {(["login", "register"] as const).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(""); }} style={{
              flex: 1, padding: "8px 0", fontSize: 14, fontWeight: 500,
              borderRadius: 8,
              background: mode === m ? "white" : "transparent",
              color: mode === m ? "var(--text)" : "var(--text2)",
              border: mode === m ? "1px solid var(--border)" : "1px solid transparent",
              boxShadow: mode === m ? "var(--shadow-sm)" : "none",
              transition: "all var(--transition)"
            }}>{m === "login" ? "登入" : "註冊"}</button>
          ))}
        </div>

        {/* Fields */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label style={{ fontSize: 13, color: "var(--text2)", marginBottom: 6, display: "block", fontWeight: 500 }}>電子郵件</label>
            <input
              type="email" value={email} onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              onKeyDown={e => e.key === "Enter" && handle()}
              style={{
                width: "100%", padding: "11px 14px",
                background: "var(--bg2)", border: "1px solid var(--border)",
                borderRadius: 10, color: "var(--text)", fontSize: 14, outline: "none"
              }}
            />
          </div>
          <div>
            <label style={{ fontSize: 13, color: "var(--text2)", marginBottom: 6, display: "block", fontWeight: 500 }}>密碼</label>
            <input
              type="password" value={password} onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              onKeyDown={e => e.key === "Enter" && handle()}
              style={{
                width: "100%", padding: "11px 14px",
                background: "var(--bg2)", border: "1px solid var(--border)",
                borderRadius: 10, color: "var(--text)", fontSize: 14, outline: "none"
              }}
            />
          </div>
        </div>

        {/* reCAPTCHA checkbox */}
        <div style={{ marginTop: 16, display: "flex", justifyContent: "center" }}>
          <div ref={checkboxRef} />
        </div>

        {/* Invisible reCAPTCHA */}
        <div
          className="g-recaptcha"
          data-sitekey={INVISIBLE_SITE_KEY}
          data-size="invisible"
          data-badge="bottomright"
          style={{ display: "none" }}
        />

        {error && (
          <div style={{
            marginTop: 12, padding: "10px 14px",
            background: "#fef2f2", border: "1px solid #fecaca",
            borderRadius: 8, color: "var(--red)", fontSize: 13
          }}>{error}</div>
        )}

        <button
          onClick={handle}
          disabled={loading || !email || !password || !captchaToken}
          style={{
            width: "100%", marginTop: 16, padding: "12px 0",
            background: loading || !email || !password || !captchaToken ? "#d1d5db" : "var(--text)",
            color: "white", borderRadius: 10, fontSize: 15, fontWeight: 600,
            cursor: loading || !email || !password || !captchaToken ? "not-allowed" : "pointer",
            transition: "all var(--transition)"
          }}
        >{loading ? "處理中…" : mode === "login" ? "登入" : "建立帳號"}</button>

        <button onClick={onClose} style={{
          width: "100%", marginTop: 10, padding: "10px 0",
          color: "var(--text2)", fontSize: 14, borderRadius: 10
        }}>取消</button>
      </div>
    </div>
  );
}
