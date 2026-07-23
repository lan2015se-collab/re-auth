import { useState } from "react";
import { AppData } from "../pages/dashboard";

interface Props {
  app: AppData;
  onClose: () => void;
}

export default function AppDetail({ app, onClose }: Props) {
  const [showSecret, setShowSecret] = useState(false);
  const [copied, setCopied] = useState("");
  const origin = typeof window !== "undefined" ? window.location.origin : "https://reauth.vercel.app";

  const copy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  };

  const loginUrl = `${origin}/${app.clientId}/`;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,0.75)",
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
          maxWidth: 600,
          maxHeight: "90vh",
          overflowY: "auto",
          animation: "fadeUp 0.3s ease"
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div>
            <h2 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em" }}>{app.name}</h2>
            <a href={app.url} target="_blank" rel="noreferrer" style={{ fontSize: 13, color: "var(--accent2)" }}>{app.url}</a>
          </div>
          <button onClick={onClose} style={{ color: "#737373", fontSize: 22, lineHeight: 1 }}>✕</button>
        </div>

        {/* Credentials */}
        <Section title="應用憑證">
          <CredRow label="Client ID" value={app.clientId} onCopy={() => copy(app.clientId, "id")} copied={copied === "id"} mono />
          <CredRow
            label="Client Secret"
            value={showSecret ? app.clientSecret : "•".repeat(32)}
            onCopy={() => copy(app.clientSecret, "secret")}
            copied={copied === "secret"}
            mono
            extra={
              <button onClick={() => setShowSecret(s => !s)} style={{
                fontSize: 12, color: "var(--accent2)", marginLeft: 8
              }}>{showSecret ? "隱藏" : "顯示"}</button>
            }
          />
        </Section>

        {/* Login URL */}
        <Section title="使用者登入網址">
          <p style={{ fontSize: 13, color: "#737373", marginBottom: 10 }}>
            將使用者導向以下網址，讓他們選擇登入方式：
          </p>
          <CredRow label="登入頁面 URL" value={loginUrl} onCopy={() => copy(loginUrl, "url")} copied={copied === "url"} mono />
        </Section>

        {/* Integration guide */}
        <Section title="整合指南">
          <p style={{ fontSize: 13, color: "#737373", marginBottom: 14, lineHeight: 1.7 }}>
            在你的網站加入以下按鈕，讓使用者透過 ReAuth 登入：
          </p>

          <CodeBlock label="HTML 按鈕範例（複製後替換 CSS）" lang="html" code={`<!-- 加入此 CSS -->
<style>
.reauth-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  padding: 16px 32px;
  font-size: 18px;
  font-weight: 600;
  color: #1e293b;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 14px;
  text-decoration: none;
  cursor: pointer;
  box-shadow: 0 6px 16px rgba(0,0,0,0.08);
  transition: all 0.25s ease-in-out;
  font-family: inherit;
}
.reauth-btn:hover {
  background-color: #f8fafc;
  border-color: #cbd5e1;
  box-shadow: 0 8px 20px rgba(0,0,0,0.12);
  transform: translateY(-3px);
}
.reauth-btn:active {
  transform: translateY(0);
  box-shadow: 0 3px 8px rgba(0,0,0,0.1);
}
.reauth-icon { width: 32px; height: 32px; object-fit: contain; }
</style>

<!-- 登入按鈕 -->
<a href="${loginUrl}" class="reauth-btn">
  <img src="https://raw.githubusercontent.com/lan2015se-collab/-/refs/heads/main/ReAuth_20260721_212121_0000.png"
       alt="ReAuth Icon" class="reauth-icon">
  <span>使用 ReAuth 登入或註冊</span>
</a>`} onCopy={() => copy(`<a href="${loginUrl}" class="reauth-btn"><img src="https://raw.githubusercontent.com/lan2015se-collab/-/refs/heads/main/ReAuth_20260721_212121_0000.png" alt="ReAuth" style="width:32px;height:32px"><span>使用 ReAuth 登入或註冊</span></a>`, "html")} copied={copied === "html"} />

          <CodeBlock label="JavaScript 範例" lang="js" code={`function loginWithReAuth() {
  window.location.href = "${loginUrl}";
}`} onCopy={() => copy(`function loginWithReAuth() {\n  window.location.href = "${loginUrl}";\n}`, "js")} copied={copied === "js"} />

          <div style={{
            padding: "16px",
            background: "#f3f4f6",
            border: "1px solid var(--border)",
            borderRadius: 10,
            marginTop: 12
          }}>
            <p style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>📥 Callback 資料格式</p>
            <p style={{ fontSize: 12, color: "#737373", marginBottom: 10, lineHeight: 1.6 }}>
              使用者登入後，ReAuth 會以 POST 請求將以下資料送到你的 Callback URL：
            </p>
            <pre style={{
              fontSize: 12, color: "#7dd3fc",
              background: "#fafafa",
              padding: "12px 14px",
              borderRadius: 8,
              overflow: "auto"
            }}>{`{
  "provider": "github",        // 登入平台
  "user": {
    "id": "user_provider_id",
    "email": "user@example.com",
    "name": "User Name",
    "avatar": "https://..."
  },
  "access_token": "...",
  "reauth_client_id": "${app.clientId}"
}`}</pre>
          </div>
        </Section>

        {/* Config summary */}
        <Section title="應用設定">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <InfoRow label="Callback URL" value={app.callbackUrl} />
            <InfoRow label="允許的 Redirect URLs" value={app.redirectUrls.join(", ")} />
            <InfoRow label="建立時間" value={new Date(app.createdAt).toLocaleString("zh-TW")} />
          </div>
        </Section>

        <button onClick={onClose} style={{
          width: "100%", marginTop: 8, padding: "11px 0",
          border: "1px solid var(--border)",
          borderRadius: 10, color: "#737373", fontSize: 14
        }}>關閉</button>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <h3 style={{ fontSize: 14, fontWeight: 600, color: "#737373", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 14 }}>
        {title}
      </h3>
      {children}
    </div>
  );
}

function CredRow({ label, value, onCopy, copied, mono, extra }: any) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "12px 16px",
      background: "#f3f4f6",
      border: "1px solid var(--border)",
      borderRadius: 10,
      marginBottom: 8
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 11, color: "#737373", marginBottom: 3 }}>{label}</p>
        <p style={{ fontSize: 13, fontFamily: mono ? "monospace" : "inherit", color: "var(--text)", wordBreak: "break-all" }}>
          {value}
          {extra}
        </p>
      </div>
      <button onClick={onCopy} style={{
        marginLeft: 12, padding: "5px 12px",
        background: copied ? "rgba(52,211,153,0.15)" : "white",
        border: `1px solid ${copied ? "rgba(52,211,153,0.4)" : "var(--border)"}`,
        borderRadius: 6,
        fontSize: 12,
        color: copied ? "var(--green)" : "#737373",
        whiteSpace: "nowrap",
        transition: "all 0.2s"
      }}>{copied ? "✓ 已複製" : "複製"}</button>
    </div>
  );
}

function CodeBlock({ label, lang, code, onCopy, copied }: any) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ fontSize: 12, color: "#737373" }}>{label}</span>
        <button onClick={onCopy} style={{
          fontSize: 12,
          color: copied ? "var(--green)" : "var(--accent2)",
          padding: "3px 10px",
          background: "#f3f4f6",
          border: "1px solid var(--border)",
          borderRadius: 6
        }}>{copied ? "✓ 已複製" : "複製"}</button>
      </div>
      <pre style={{
        background: "#fafafa",
        border: "1px solid var(--border)",
        borderRadius: 10,
        padding: "14px 16px",
        fontSize: 13,
        color: "#c084fc",
        overflow: "auto",
        lineHeight: 1.6
      }}>{code}</pre>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{
      display: "flex", gap: 12, padding: "10px 14px",
      background: "#f3f4f6", border: "1px solid var(--border)", borderRadius: 8
    }}>
      <span style={{ fontSize: 12, color: "#737373", minWidth: 140 }}>{label}</span>
      <span style={{ fontSize: 12, color: "var(--text)", wordBreak: "break-all" }}>{value}</span>
    </div>
  );
}
