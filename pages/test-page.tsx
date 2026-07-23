import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function TestPage() {
  const [clientId, setClientId] = useState("");
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  const loginUrl = clientId ? `${origin}/${clientId}/` : "";

  return (
    <>
      <Head><title>測試頁面 — ReAuth</title></Head>
      <div style={{
        minHeight: "100vh",
        background: "var(--bg)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24
      }}>
        <div style={{ width: "100%", maxWidth: 480, animation: "fadeUp 0.5s ease" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--text2)", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
            ← 返回首頁
          </Link>

          <div style={{
            background: "var(--bg2)",
            border: "1px solid var(--border)",
            borderRadius: 20,
            padding: "36px 32px"
          }}>
            {/* Logo */}
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 24, margin: "0 auto 14px"
              }}>🧪</div>
              <h1 style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-0.02em", marginBottom: 6 }}>
                ReAuth 登入測試
              </h1>
              <p style={{ color: "var(--text2)", fontSize: 14 }}>
                輸入你的 Client ID 測試登入流程
              </p>
            </div>

            {/* Client ID input */}
            <div style={{ marginBottom: 20 }}>
              <label style={{ fontSize: 13, color: "var(--text2)", marginBottom: 6, display: "block" }}>
                你的 Client ID
              </label>
              <input
                value={clientId}
                onChange={e => setClientId(e.target.value)}
                placeholder="從儀表板複製 Client ID"
                style={{
                  width: "100%", padding: "11px 14px",
                  background: "var(--bg3)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  color: "var(--text)", fontSize: 14, outline: "none",
                  fontFamily: "monospace"
                }}
              />
            </div>

            {/* Login button */}
            <a
              href={loginUrl || "#"}
              onClick={e => { if (!loginUrl) e.preventDefault(); }}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 10,
                padding: "14px 0",
                background: clientId
                  ? "linear-gradient(135deg, var(--accent), var(--accent2))"
                  : "rgba(124,110,247,0.3)",
                color: "white",
                borderRadius: 12,
                fontSize: 16,
                fontWeight: 600,
                cursor: clientId ? "pointer" : "not-allowed",
                textDecoration: "none",
                transition: "all var(--transition)"
              }}
            >
              <span style={{
                width: 22, height: 22, borderRadius: 6,
                background: "rgba(255,255,255,0.2)",
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800
              }}>R</span>
              使用 ReAuth 登入
            </a>

            {clientId && (
              <p style={{ marginTop: 12, fontSize: 12, color: "var(--text2)", textAlign: "center" }}>
                將導向：<code style={{ color: "var(--accent2)", fontSize: 11 }}>{loginUrl}</code>
              </p>
            )}

            <div style={{
              marginTop: 24,
              padding: "14px 16px",
              background: "var(--bg3)",
              border: "1px solid var(--border)",
              borderRadius: 10,
              fontSize: 12,
              color: "var(--text2)",
              lineHeight: 1.7
            }}>
              <p style={{ fontWeight: 600, color: "var(--text)", marginBottom: 6 }}>📋 測試說明</p>
              <p>1. 先到<Link href="/dashboard" style={{ color: "var(--accent2)" }}> 儀表板 </Link>建立應用，Callback URL 填：</p>
              <code style={{ color: "var(--accent2)", display: "block", margin: "4px 0", fontSize: 11 }}>
                {origin}/callback-test
              </code>
              <p>2. 複製 Client ID 填入上方</p>
              <p>3. 點擊「使用 ReAuth 登入」完成測試</p>
              <p>4. 登入後會跳到 <Link href="/callback-test" style={{ color: "var(--accent2)" }}>/callback-test</Link> 顯示資料</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
