import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";

export default function CallbackTest() {
  const [payload, setPayload] = useState<any>(null);

  useEffect(() => {
    // Read data from URL query params (GET) or sessionStorage
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("reauth_payload");
    if (raw) {
      try { setPayload(JSON.parse(decodeURIComponent(raw))); } catch {}
    }
    // Also check sessionStorage for data set by test
    const stored = sessionStorage.getItem("last_reauth_payload");
    if (stored && !raw) {
      try { setPayload(JSON.parse(stored)); } catch {}
    }
  }, []);

  return (
    <>
      <Head><title>Callback 測試 — ReAuth</title></Head>
      <div style={{ minHeight: "100vh", background: "var(--bg)", padding: "60px 24px" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <Link href="/" style={{ fontSize: 13, color: "var(--text2)", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
            ← 返回首頁
          </Link>

          <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 8 }}>
            Callback 測試頁面
          </h1>
          <p style={{ color: "var(--text2)", fontSize: 14, marginBottom: 32 }}>
            這是 ReAuth 的內部測試端點。當使用者完成登入後，ReAuth 會將資料 POST 到此頁面。
          </p>

          {payload ? (
            <div>
              <div style={{
                padding: "12px 16px",
                background: "rgba(52,211,153,0.1)",
                border: "1px solid rgba(52,211,153,0.3)",
                borderRadius: 10,
                marginBottom: 20,
                fontSize: 14,
                color: "var(--green)"
              }}>
                ✓ 成功接收到登入資料
              </div>

              <div style={{
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                overflow: "hidden"
              }}>
                {payload.user && (
                  <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 16 }}>
                    {payload.user.avatar && (
                      <img src={payload.user.avatar} alt="" style={{ width: 48, height: 48, borderRadius: "50%", objectFit: "cover" }} />
                    )}
                    <div>
                      <p style={{ fontWeight: 600, fontSize: 16 }}>{payload.user.name || "未知使用者"}</p>
                      <p style={{ color: "var(--text2)", fontSize: 13 }}>{payload.user.email}</p>
                      <p style={{ color: "var(--accent2)", fontSize: 12, marginTop: 4 }}>透過 {payload.provider} 登入</p>
                    </div>
                  </div>
                )}
                <div style={{ padding: "16px 24px" }}>
                  <p style={{ fontSize: 12, color: "var(--text2)", marginBottom: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>完整 Payload</p>
                  <pre style={{
                    fontSize: 12,
                    color: "#7dd3fc",
                    background: "var(--bg3)",
                    padding: "14px 16px",
                    borderRadius: 8,
                    overflow: "auto",
                    lineHeight: 1.6
                  }}>{JSON.stringify({ ...payload, access_token: payload.access_token ? payload.access_token.slice(0, 8) + "…" : undefined }, null, 2)}</pre>
                </div>
              </div>
            </div>
          ) : (
            <div style={{
              padding: "48px 32px",
              border: "2px dashed var(--border)",
              borderRadius: 20,
              textAlign: "center",
              color: "var(--text2)"
            }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>📭</div>
              <p style={{ fontSize: 15, fontWeight: 500, color: "var(--text)", marginBottom: 8 }}>尚未收到任何 Callback</p>
              <p style={{ fontSize: 13 }}>使用 <Link href="/test-page" style={{ color: "var(--accent2)" }}>/test-page</Link> 測試登入流程</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
