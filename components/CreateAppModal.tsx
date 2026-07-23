import { useState } from "react";
import { db } from "../lib/firebase";
import { ref, push, set, update } from "firebase/database";
import { User } from "firebase/auth";

interface Props {
  user: User;
  onClose: () => void;
}

function genId(len = 24) {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

export default function CreateAppModal({ user, onClose }: Props) {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [redirectUrls, setRedirectUrls] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const create = async () => {
    if (!name || !url || !redirectUrls || !callbackUrl) {
      setError("請填寫所有必填欄位");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const clientId = genId(24);
      const clientSecret = genId(48);
      const appsRef = ref(db, `apps/${user.uid}`);
      const newRef = push(appsRef);
      const appId = newRef.key!;
      const appData = {
        name,
        url,
        redirectUrls: redirectUrls.split(",").map(s => s.trim()).filter(Boolean),
        callbackUrl,
        clientId,
        clientSecret,
        createdAt: Date.now(),
        ownerId: user.uid,
      };
      // Write app data and public clientIndex atomically
      await update(ref(db), {
        [`apps/${user.uid}/${appId}`]: appData,
        [`clientIndex/${clientId}`]: { uid: user.uid, appId },
      });
      onClose();
    } catch (e: any) {
      setError("建立失敗：" + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 16,
        animation: "fadeIn 0.2s ease"
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "white",
          border: "1px solid var(--border)",
          borderRadius: 20,
          padding: 36,
          width: "100%",
          maxWidth: 520,
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "fadeUp 0.3s ease"
        }}
      >
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 6 }}>建立新應用</h2>
        <p style={{ color: "#737373", fontSize: 14, marginBottom: 28 }}>填寫應用資訊以取得 ReAuth 整合憑證</p>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <Field label="應用程式 / 網站 / 服務名稱 *">
            <input value={name} onChange={e => setName(e.target.value)} placeholder="例：My Awesome App" style={inputStyle} />
          </Field>
          <Field label="應用程式 / 網站 / 服務網址 *">
            <input value={url} onChange={e => setUrl(e.target.value)} placeholder="https://yourapp.com" style={inputStyle} />
          </Field>
          <Field label="接受的 Redirect URL *" hint="使用逗號 , 區分多個網址">
            <textarea
              value={redirectUrls}
              onChange={e => setRedirectUrls(e.target.value)}
              placeholder="https://yourapp.com/auth/callback, https://yourapp.com/login/callback"
              rows={3}
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </Field>
          <Field label="Callback URL *" hint="ReAuth 驗證完成後回傳使用者資料的端點">
            <input value={callbackUrl} onChange={e => setCallbackUrl(e.target.value)} placeholder="https://yourapp.com/api/reauth/callback" style={inputStyle} />
          </Field>

          <div style={{
            padding: "14px 16px",
            background: "rgba(124,110,247,0.08)",
            border: "1px solid rgba(124,110,247,0.2)",
            borderRadius: 10,
            fontSize: 12,
            color: "#737373",
            lineHeight: 1.6
          }}>
            ⚠️ 請注意，你使用 ReAuth 服務代表你同意 GitHub、Notion、Google、Discord、Cloudflare 的隱私權條款與服務條款。
          </div>
        </div>

        {error && (
          <div style={{
            marginTop: 16, padding: "10px 14px",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            borderRadius: 8, color: "#f87171", fontSize: 13
          }}>{error}</div>
        )}

        <div style={{ display: "flex", gap: 10, marginTop: 24 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "11px 0", fontSize: 14,
            border: "1px solid var(--border)",
            borderRadius: 10, color: "#737373"
          }}>取消</button>
          <button
            onClick={create}
            disabled={loading}
            style={{
              flex: 2, padding: "11px 0", fontSize: 14, fontWeight: 600,
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              color: "white", borderRadius: 10,
              opacity: loading ? 0.7 : 1
            }}
          >{loading ? "建立中…" : "建立應用"}</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label style={{ fontSize: 13, color: "#737373", marginBottom: 6, display: "block", fontWeight: 500 }}>
        {label}
      </label>
      {hint && <p style={{ fontSize: 12, color: "#737373", opacity: 0.7, marginBottom: 6 }}>{hint}</p>}
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "11px 14px",
  background: "#f3f4f6",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--text)",
  fontSize: 14,
  outline: "none",
};
