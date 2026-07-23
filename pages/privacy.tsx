import Head from "next/head";
import Link from "next/link";

export default function Privacy() {
  return (
    <>
      <Head><title>隱私權政策 — ReAuth</title></Head>
      <div style={{ minHeight: "100vh", background: "var(--bg)" }}>
        <nav style={{
          borderBottom: "1px solid var(--border)",
          padding: "0 32px", height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "var(--bg2)"
        }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{
              width: 28, height: 28, borderRadius: 7,
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 13, fontWeight: 700, color: "white"
            }}>R</div>
            <span style={{ fontWeight: 700, fontSize: 16 }}>ReAuth</span>
          </Link>
        </nav>

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "60px 24px" }}>
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>隱私權政策</h1>
          <p style={{ color: "var(--text2)", marginBottom: 48 }}>最後更新：2025 年 1 月</p>

          {sections.map(({ title, content }) => (
            <div key={title} style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 14, color: "var(--accent2)" }}>{title}</h2>
              <div style={{ color: "var(--text2)", lineHeight: 1.8, fontSize: 15 }}
                dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          ))}
        </div>

        <footer style={{
          borderTop: "1px solid var(--border)",
          padding: "24px 32px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12, color: "var(--text2)", fontSize: 13
        }}>
          <span>ReAuth © 2025</span>
          <div style={{ display: "flex", gap: 24 }}>
            <Link href="/privacy" style={{ color: "var(--accent2)" }}>隱私權政策</Link>
            <Link href="/terms" style={{ color: "var(--text2)" }}>服務條款</Link>
          </div>
        </footer>
      </div>
    </>
  );
}

const sections = [
  {
    title: "1. 我們收集的資訊",
    content: `
      <p>當你使用 ReAuth 服務時，我們可能會收集以下類型的資訊：</p>
      <ul style="margin-top:10px;padding-left:20px;display:flex;flex-direction:column;gap:6px">
        <li><strong style="color:#f0f0f5">帳號資訊：</strong>當你以電子郵件和密碼建立 ReAuth 帳號時，我們會儲存你的電子郵件地址（密碼以加密形式儲存於 Firebase Authentication）。</li>
        <li><strong style="color:#f0f0f5">應用程式設定：</strong>你建立的應用名稱、網址、Redirect URL、Callback URL 及系統產生的 Client ID / Client Secret。</li>
        <li><strong style="color:#f0f0f5">OAuth 使用者資料：</strong>當終端使用者透過 ReAuth 完成 OAuth 登入時，我們會短暫處理（但不永久儲存）來自各 OAuth 平台的使用者基本資料（姓名、電子郵件、頭像），並直接轉送至你的應用 Callback URL。</li>
        <li><strong style="color:#f0f0f5">使用記錄：</strong>包括 IP 位址、瀏覽器類型、訪問時間等標準伺服器日誌資訊。</li>
      </ul>
    `
  },
  {
    title: "2. 資訊的使用方式",
    content: `
      <p>我們收集的資訊用於以下目的：</p>
      <ul style="margin-top:10px;padding-left:20px;display:flex;flex-direction:column;gap:6px">
        <li>提供、維護及改善 ReAuth 服務</li>
        <li>驗證你的身份並保護你的帳號安全</li>
        <li>協助你管理 OAuth 應用程式設定</li>
        <li>偵測、防止及回應技術問題或濫用行為</li>
        <li>發送與服務相關的重要通知（如安全警示）</li>
      </ul>
      <p style="margin-top:12px">我們<strong style="color:#f0f0f5">不會</strong>將你的個人資料出售、租賃或分享給第三方用於商業行銷目的。</p>
    `
  },
  {
    title: "3. 第三方 OAuth 服務",
    content: `
      <p>ReAuth 作為中間層服務，整合以下第三方 OAuth 提供商：</p>
      <ul style="margin-top:10px;padding-left:20px;display:flex;flex-direction:column;gap:6px">
        <li><strong style="color:#f0f0f5">GitHub</strong> — 受 GitHub 隱私權政策約束</li>
        <li><strong style="color:#f0f0f5">Google</strong> — 受 Google 隱私權政策約束</li>
        <li><strong style="color:#f0f0f5">Discord</strong> — 受 Discord 隱私權政策約束</li>
        <li><strong style="color:#f0f0f5">Notion</strong> — 受 Notion 隱私權政策約束</li>
        <li><strong style="color:#f0f0f5">Cloudflare</strong> — 受 Cloudflare 隱私權政策約束</li>
      </ul>
      <p style="margin-top:12px">使用者在透過上述平台登入時，即表示同意各平台的隱私權政策與服務條款。使用者資料從各平台取得後，僅作轉送用途，不在 ReAuth 伺服器上永久保存。</p>
    `
  },
  {
    title: "4. 資料安全",
    content: `
      <p>我們採取以下措施保護你的資料：</p>
      <ul style="margin-top:10px;padding-left:20px;display:flex;flex-direction:column;gap:6px">
        <li>使用 Firebase Authentication 處理帳號認證，密碼以業界標準方式加密儲存</li>
        <li>所有資料傳輸均透過 HTTPS 加密</li>
        <li>Client Secret 應由你自行妥善保管，ReAuth 不對因 Secret 洩漏造成的損失負責</li>
        <li>Firebase Realtime Database 設有安全性規則，僅允許已驗證使用者存取自己的資料</li>
      </ul>
    `
  },
  {
    title: "5. 資料保存與刪除",
    content: `
      <p>你可以隨時在儀表板中刪除你建立的應用程式及相關設定。如需刪除你的 ReAuth 帳號，請聯繫我們。帳號刪除後，我們將在合理時間內刪除所有與你帳號關聯的資料（法律要求保留的除外）。</p>
    `
  },
  {
    title: "6. Cookie",
    content: `
      <p>ReAuth 使用必要的 Cookie 和 sessionStorage 以維持你的登入狀態及 OAuth 流程中的 state 驗證。我們不使用追蹤性 Cookie 或第三方廣告 Cookie。</p>
    `
  },
  {
    title: "7. 未成年人保護",
    content: `
      <p>ReAuth 服務不針對 13 歲以下兒童。我們不會故意收集未成年人的個人資訊。如果你認為我們意外收集了兒童的資料，請立即聯繫我們。</p>
    `
  },
  {
    title: "8. 政策變更",
    content: `
      <p>我們可能會不時更新本隱私權政策。重大變更時，我們將在網站上發布通知。繼續使用服務即表示你接受更新後的政策。</p>
    `
  },
  {
    title: "9. 聯繫我們",
    content: `
      <p>如對本隱私權政策有任何疑問，請透過 GitHub Issues 或應用程式內的聯繫方式與我們聯繫。</p>
    `
  }
];
