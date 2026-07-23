import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import AuthModal from "../components/AuthModal";
import { auth } from "../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";

export default function Home() {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsub();
  }, []);

  return (
    <>
      <Head>
        <title>ReAuth — Universal OAuth Hub</title>
        <meta name="description" content="一個整合解鎖所有 OAuth。整合 GitHub、Google、Discord、Notion、Cloudflare。" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="D0TB1QmwaS5GtHMUGrSM3jwGsuFBAPUzEEj4yfQvOok" />
      </Head>

      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        {/* Nav */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          borderBottom: "1px solid var(--border)",
          background: "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          padding: "0 24px",
          height: 60,
          display: "flex", alignItems: "center", justifyContent: "space-between"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <img
              src="https://raw.githubusercontent.com/lan2015se-collab/-/refs/heads/main/ReAuth_20260721_212121_0000.png"
              alt="ReAuth"
              style={{ width: 28, height: 28, objectFit: "contain" }}
            />
            <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.02em" }}>ReAuth</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {user ? (
              <>
                <Link href="/dashboard" style={{
                  padding: "8px 18px",
                  background: "var(--text)",
                  color: "white",
                  borderRadius: 980,
                  fontSize: 14, fontWeight: 600
                }}>儀表板</Link>
                <button onClick={() => signOut(auth)} style={{
                  padding: "8px 16px", fontSize: 14, color: "var(--text2)",
                  borderRadius: 980, border: "1px solid var(--border)"
                }}>登出</button>
              </>
            ) : (
              <button onClick={() => setShowAuth(true)} style={{
                padding: "8px 20px",
                background: "var(--text)",
                color: "white",
                borderRadius: 980,
                fontSize: 14, fontWeight: 600
              }}>註冊 / 登入</button>
            )}
          </div>
        </nav>

        {/* Hero */}
        <section style={{ padding: "80px 24px 60px", textAlign: "center", maxWidth: 680, margin: "0 auto" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "5px 14px",
            background: "#f0f9ff",
            border: "1px solid #bae6fd",
            borderRadius: 980,
            fontSize: 13, color: "#0369a1",
            marginBottom: 28, fontWeight: 500
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s infinite" }}></span>
            現已支援 5 個 OAuth 提供商
          </div>

          <h1 style={{
            fontSize: "clamp(36px, 6vw, 60px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.1,
            marginBottom: 20,
            color: "var(--text)"
          }}>
            一個整合<br />解鎖所有 OAuth
          </h1>

          <p style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "var(--text2)",
            maxWidth: 500, margin: "0 auto 40px",
            lineHeight: 1.7
          }}>
            ReAuth 是集合多個主流平台的 OAuth 2.0 中樞。你的使用者只需「使用 ReAuth 登入」，
            即可透過 GitHub、Google、Discord、Notion 或 Cloudflare 完成認證並回傳到你的服務。
          </p>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {user ? (
              <Link href="/dashboard" style={{
                padding: "13px 28px",
                background: "var(--text)",
                color: "white",
                borderRadius: 980,
                fontSize: 15, fontWeight: 600,
                display: "inline-block"
              }}>進入儀表板 →</Link>
            ) : (
              <button onClick={() => setShowAuth(true)} style={{
                padding: "13px 28px",
                background: "var(--text)",
                color: "white",
                borderRadius: 980,
                fontSize: 15, fontWeight: 600
              }}>免費開始使用 →</button>
            )}
            <a href="#how-it-works" style={{
              padding: "13px 28px",
              border: "1px solid var(--border)",
              color: "var(--text)",
              borderRadius: 980,
              fontSize: 15, fontWeight: 500
            }}>了解更多</a>
          </div>
        </section>

        {/* About ReAuth - for Google OAuth verification */}
        <section style={{ padding: "48px 24px", maxWidth: 680, margin: "0 auto" }}>
          <p style={{ fontSize: 13, letterSpacing: "0.12em", color: "var(--text3)", textTransform: "uppercase", marginBottom: 24 }}>
            REAUTH · ESTD 2025
          </p>

          <div style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "24px",
            marginBottom: 16
          }}>
            <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12 }}>關於 ReAuth</h2>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
              ReAuth 是一個 OAuth 2.0 聚合服務平台，讓開發者只需一次整合，就能為應用程式使用者提供
              GitHub、Google、Discord、Notion、Cloudflare 等多個主流平台的登入功能。
              我們統一處理所有 OAuth 流程，並以標準格式將使用者資料回傳到你的服務。
            </p>
          </div>

          <div style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "24px",
            marginBottom: 16
          }}>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
              使用者透過 ReAuth 以 Google 帳號登入時，我們僅會取得基本公開資料（Email 與姓名）來建立身份驗證，
              絕不會將資料用於其他用途或與第三方分享。
            </p>
          </div>

          <div style={{
            border: "1px solid var(--border)",
            borderRadius: "var(--radius)",
            padding: "24px"
          }}>
            <p style={{ fontSize: 15, color: "var(--text2)", lineHeight: 1.8 }}>
              ReAuth 由開發者為開發者打造。透過我們的服務，你可以讓使用者選擇自己偏好的登入平台，
              你的後端只需處理一個統一的 Callback 格式，省去大量串接時間。
            </p>
          </div>
        </section>

        {/* Login button preview */}
        <section style={{ padding: "20px 24px 60px", textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "var(--text3)", marginBottom: 20 }}>你的使用者將看到這個按鈕</p>
          <a href="#" onClick={e => e.preventDefault()} className="reauth-btn">
            <img
              src="https://raw.githubusercontent.com/lan2015se-collab/-/refs/heads/main/ReAuth_20260721_212121_0000.png"
              alt="ReAuth Icon"
              className="reauth-icon"
            />
            <span>使用 ReAuth 登入或註冊</span>
          </a>
        </section>

        {/* Provider badges */}
        <section style={{ padding: "0 24px 60px", textAlign: "center" }}>
          <p style={{ color: "var(--text3)", fontSize: 12, marginBottom: 16, textTransform: "uppercase", letterSpacing: "0.1em" }}>
            支援的登入平台
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            {["GitHub", "Google", "Discord", "Notion", "Cloudflare"].map(p => (
              <div key={p} style={{
                padding: "6px 16px",
                border: "1px solid var(--border)",
                borderRadius: 980,
                fontSize: 13, fontWeight: 500,
                color: "var(--text)",
                background: "var(--bg2)"
              }}>{p}</div>
            ))}
          </div>
        </section>


        {/* App Purpose Section */}
        <section style={{ padding: '60px 24px', maxWidth: 760, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <h2 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 700, letterSpacing: '-0.03em', marginBottom: 12 }}>
              ReAuth 是什麼？
            </h2>
            <p style={{ color: 'var(--text2)', fontSize: 15, lineHeight: 1.7, maxWidth: 560, margin: '0 auto' }}>
              ReAuth 是一個 <strong style={{ color: 'var(--text)' }}>OAuth 2.0 聚合服務</strong>，
              讓你的應用程式只需一次整合，就能讓使用者透過多個主流平台登入。
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { icon: '🔐', title: '統一認證入口', desc: '使用者只需按一個按鈕，即可選擇他們偏好的登入平台，不需要記住密碼。' },
              { icon: '⚡', title: '快速整合', desc: '你的開發者只需接入一個 ReAuth API，就自動獲得 GitHub、Google、Discord 等多平台支援。' },
              { icon: '🛡️', title: '安全可靠', desc: '所有 OAuth 流程由 ReAuth 處理，使用 reCAPTCHA 防止機器人，保護你的使用者。' },
              { icon: '📊', title: '統一資料格式', desc: '無論使用者用哪個平台登入，你收到的使用者資料格式都相同，省去大量開發時間。' },
            ].map(({ icon, title, desc }) => (
              <div key={title} style={{ padding: '22px 20px', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', background: 'var(--bg2)' }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{icon}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, padding: '24px 28px', background: '#f0f9ff', border: '1px solid #bae6fd', borderRadius: 'var(--radius-lg)' }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, color: '#0369a1' }}>💡 使用情境範例</h3>
            <p style={{ fontSize: 14, color: '#0c4a6e', lineHeight: 1.7 }}>
              你正在開發一個 SaaS 工具。你希望讓使用者能用 GitHub 或 Google 帳號登入，
              但不想分別串接兩個 OAuth 服務。只需整合 ReAuth，使用者就能選擇自己偏好的平台，
              你的後端只需要處理一個統一的 Callback 格式。
            </p>
          </div>
        </section>

        {/* Comparison */}
        <section style={{ padding: "60px 24px", background: "var(--bg2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 12 }}>
              ReAuth vs 傳統方案
            </h2>
            <p style={{ textAlign: "center", color: "var(--text2)", marginBottom: 48, fontSize: 15 }}>
              比較 ReAuth 與自行實作或其他第三方服務的差異
            </p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid var(--border)" }}>
                    <th style={{ textAlign: "left", padding: "12px 16px", color: "var(--text2)", fontSize: 13, fontWeight: 500 }}>功能</th>
                    <th style={{ padding: "12px 16px", fontSize: 14, fontWeight: 700, textAlign: "center", color: "var(--accent)" }}>✦ ReAuth</th>
                    <th style={{ padding: "12px 16px", fontSize: 14, fontWeight: 500, textAlign: "center", color: "var(--text2)" }}>自行實作</th>
                    <th style={{ padding: "12px 16px", fontSize: 14, fontWeight: 500, textAlign: "center", color: "var(--text2)" }}>Auth0 / Clerk</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["多平台 OAuth 整合", "5+ 個平台", "需逐一接入", "✓ 支援"],
                    ["設定複雜度", "極低，一次整合", "每個平台分開", "中等"],
                    ["Token 管理", "自動處理", "需自行實作", "✓ 支援"],
                    ["費用", "免費開始", "開發工時成本", "依方案計費"],
                    ["Callback 格式", "統一格式", "各平台不同", "統一格式"],
                  ].map(([feature, reauth, self, other], i) => (
                    <tr key={feature as string} style={{ borderBottom: "1px solid var(--border2)", background: i % 2 === 0 ? "transparent" : "var(--bg3)" }}>
                      <td style={{ padding: "14px 16px", fontSize: 14 }}>{feature}</td>
                      <td style={{ padding: "14px 16px", fontSize: 14, textAlign: "center", color: "var(--green)", fontWeight: 600 }}>✓ {reauth}</td>
                      <td style={{ padding: "14px 16px", fontSize: 14, textAlign: "center", color: "var(--text2)" }}>{self}</td>
                      <td style={{ padding: "14px 16px", fontSize: 14, textAlign: "center", color: "var(--text2)" }}>{other}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" style={{ padding: "80px 24px", maxWidth: 800, margin: "0 auto" }}>
          <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", textAlign: "center", marginBottom: 48 }}>
            三步驟串接完成
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {[
              { step: "01", title: "建立應用", desc: "在 ReAuth 儀表板建立你的應用，取得 Client ID 與 Client Secret。" },
              { step: "02", title: "加入按鈕", desc: "在你的服務加入「使用 ReAuth 登入」按鈕，導向 ReAuth 認證頁面。" },
              { step: "03", title: "接收資料", desc: "使用者完成登入後，ReAuth 將使用者資料回傳到你的 Callback URL。" },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{
                padding: 24,
                background: "var(--bg2)",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-lg)"
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: "var(--accent)", letterSpacing: "0.05em", marginBottom: 10 }}>{step}</div>
                <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 8 }}>{title}</h3>
                <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        {!user && (
          <section style={{ padding: "60px 24px", textAlign: "center", borderTop: "1px solid var(--border)" }}>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 34px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>
              立即開始使用 ReAuth
            </h2>
            <p style={{ color: "var(--text2)", marginBottom: 28, fontSize: 15 }}>免費建立帳號，幾分鐘內完成整合</p>
            <button onClick={() => setShowAuth(true)} style={{
              padding: "13px 32px",
              background: "var(--text)",
              color: "white",
              borderRadius: 980,
              fontSize: 15, fontWeight: 600
            }}>免費註冊</button>
          </section>
        )}

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid var(--border)",
          padding: "24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12, color: "var(--text2)", fontSize: 13
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <img src="https://raw.githubusercontent.com/lan2015se-collab/-/refs/heads/main/ReAuth_20260721_212121_0000.png" alt="" style={{ width: 18, height: 18, objectFit: "contain" }} />
            <span>ReAuth © 2025</span>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <Link href="/privacy" style={{ color: "var(--text2)" }}>隱私權政策</Link>
            <Link href="/terms" style={{ color: "var(--text2)" }}>服務條款</Link>
          </div>
        </footer>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}
