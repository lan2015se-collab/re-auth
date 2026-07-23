import Head from "next/head";
import Link from "next/link";

export default function Terms() {
  return (
    <>
      <Head><title>服務條款 — ReAuth</title></Head>
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
          <h1 style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 8 }}>服務條款</h1>
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
            <Link href="/privacy" style={{ color: "var(--text2)" }}>隱私權政策</Link>
            <Link href="/terms" style={{ color: "var(--accent2)" }}>服務條款</Link>
          </div>
        </footer>
      </div>
    </>
  );
}

const sections = [
  {
    title: "1. 服務說明",
    content: `
      <p>ReAuth 是一個 OAuth 2.0 聚合服務，允許開發者透過單一整合點，為其應用程式使用者提供多種第三方平台（包括 GitHub、Google、Discord、Notion 及 Cloudflare）的 OAuth 登入功能。</p>
      <p style="margin-top:10px">使用 ReAuth 服務即表示你同意本服務條款。如不同意，請停止使用本服務。</p>
    `
  },
  {
    title: "2. 帳號責任",
    content: `
      <ul style="padding-left:20px;display:flex;flex-direction:column;gap:8px">
        <li>你須對你帳號下的所有活動負責，包括你建立的應用程式及 Client Secret 的保管。</li>
        <li>請勿與他人共用你的帳號密碼或 Client Secret。</li>
        <li>如發現未授權使用你帳號的情形，請立即通知我們。</li>
        <li>你必須提供真實、準確的帳號資訊。</li>
      </ul>
    `
  },
  {
    title: "3. 可接受的使用方式",
    content: `
      <p>使用 ReAuth 服務時，你同意：</p>
      <ul style="margin-top:10px;padding-left:20px;display:flex;flex-direction:column;gap:8px">
        <li>僅將 ReAuth 用於合法目的，不得用於欺詐、釣魚、惡意軟體散布或任何違法活動</li>
        <li>尊重各 OAuth 提供商（GitHub、Google、Discord、Notion、Cloudflare）的服務條款</li>
        <li>不得對 ReAuth 系統進行未授權的存取、滲透測試或惡意攻擊</li>
        <li>不得以自動化方式濫用 API，造成系統過載</li>
        <li>不得假冒他人或提供誤導性資訊</li>
      </ul>
    `
  },
  {
    title: "4. 第三方服務條款",
    content: `
      <p>ReAuth 整合以下第三方 OAuth 服務。使用這些服務即表示你同意其各自的服務條款：</p>
      <ul style="margin-top:10px;padding-left:20px;display:flex;flex-direction:column;gap:6px">
        <li>GitHub 服務條款：github.com/site/terms</li>
        <li>Google 服務條款：policies.google.com/terms</li>
        <li>Discord 服務條款：discord.com/terms</li>
        <li>Notion 服務條款：notion.so/terms</li>
        <li>Cloudflare 服務條款：cloudflare.com/terms</li>
      </ul>
      <p style="margin-top:12px">ReAuth 對第三方服務的可用性、準確性或內容不承擔責任。</p>
    `
  },
  {
    title: "5. 服務可用性",
    content: `
      <p>我們致力於提供穩定的服務，但不保證 ReAuth 服務 100% 無中斷。我們保留以下權利：</p>
      <ul style="margin-top:10px;padding-left:20px;display:flex;flex-direction:column;gap:6px">
        <li>在事先通知或不通知的情況下，對服務進行維護、升級或修改</li>
        <li>在違反本條款的情況下，暫停或終止使用者帳號</li>
        <li>隨時調整服務功能或停止提供特定功能</li>
      </ul>
    `
  },
  {
    title: "6. 免責聲明",
    content: `
      <p>ReAuth 服務以「現狀」提供，不提供任何明示或暗示的保證。在法律允許的最大範圍內，ReAuth 不對以下情況承擔責任：</p>
      <ul style="margin-top:10px;padding-left:20px;display:flex;flex-direction:column;gap:6px">
        <li>因 OAuth 提供商服務中斷或政策變更導致的服務影響</li>
        <li>因 Client Secret 外洩或帳號被盜用導致的損失</li>
        <li>資料傳輸過程中的任何間接損失</li>
        <li>第三方對你應用程式使用者的資料處理方式</li>
      </ul>
    `
  },
  {
    title: "7. 智慧財產權",
    content: `
      <p>ReAuth 的品牌、標誌、程式碼及文件受相關智慧財產權法保護。你建立的應用程式設定及資料屬於你所有，但 ReAuth 保留提供服務所需的使用授權。</p>
    `
  },
  {
    title: "8. 條款修改",
    content: `
      <p>我們保留隨時修改本服務條款的權利。重大變更將透過網站公告或電子郵件通知。在修改後繼續使用服務，即視為接受更新後的條款。</p>
    `
  },
  {
    title: "9. 準據法",
    content: `
      <p>本服務條款受現行適用法律管轄。因本條款引起的任何爭議，雙方應先以協商方式解決。</p>
    `
  }
];
