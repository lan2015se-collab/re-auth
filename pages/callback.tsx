import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function CallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<"processing" | "success" | "error">("processing");
  const [message, setMessage] = useState("正在驗證身份…");

  useEffect(() => {
    if (!router.isReady) return;
    const { code, state, error } = router.query;

    if (error) {
      setStatus("error");
      setMessage("使用者取消登入或發生錯誤：" + error);
      return;
    }

    if (!code || !state) {
      setStatus("error");
      setMessage("缺少必要的授權參數");
      return;
    }

    let parsedState: { provider: string; reauth_client_id: string; state: string };
    try {
      parsedState = JSON.parse(decodeURIComponent(state as string));
    } catch {
      setStatus("error");
      setMessage("無效的 state 參數");
      return;
    }

    const savedState = sessionStorage.getItem("reauth_state");
    const callbackUrl = sessionStorage.getItem("reauth_callback");

    if (!callbackUrl) {
      setStatus("error");
      setMessage("找不到 Callback URL，請重新登入");
      return;
    }

    setMessage(`正在透過 ${parsedState.provider} 完成驗證…`);

    // Exchange code for token via our API
    fetch("/api/exchange-token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        provider: parsedState.provider,
        reauth_client_id: parsedState.reauth_client_id,
      }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) throw new Error(data.error);
        setMessage("驗證成功！正在導回應用程式…");
        setStatus("success");

        // POST user data to the app's callback URL
        const payload = {
          provider: parsedState.provider,
          user: data.user,
          access_token: data.access_token,
          reauth_client_id: parsedState.reauth_client_id,
        };

        // Use a form POST to send data to callback URL
        const form = document.createElement("form");
        form.method = "POST";
        form.action = callbackUrl;
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = "reauth_payload";
        input.value = JSON.stringify(payload);
        form.appendChild(input);
        document.body.appendChild(form);

        sessionStorage.removeItem("reauth_state");
        sessionStorage.removeItem("reauth_callback");

        setTimeout(() => form.submit(), 800);
      })
      .catch(err => {
        setStatus("error");
        setMessage("驗證失敗：" + err.message);
      });
  }, [router.isReady, router.query]);

  return (
    <div style={{
      minHeight: "100vh",
      background: "var(--bg)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24
    }}>
      <div style={{
        textAlign: "center",
        background: "var(--bg2)",
        border: "1px solid var(--border)",
        borderRadius: 20,
        padding: "48px 40px",
        maxWidth: 400,
        width: "100%",
        animation: "fadeUp 0.4s ease"
      }}>
        {status === "processing" && (
          <>
            <div style={{
              width: 56, height: 56,
              border: "3px solid var(--border)",
              borderTopColor: "var(--accent)",
              borderRadius: "50%",
              animation: "spin 0.8s linear infinite",
              margin: "0 auto 20px"
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </>
        )}
        {status === "success" && (
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(52,211,153,0.15)",
            border: "2px solid rgba(52,211,153,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, margin: "0 auto 20px"
          }}>✓</div>
        )}
        {status === "error" && (
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: "rgba(239,68,68,0.15)",
            border: "2px solid rgba(239,68,68,0.4)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 24, margin: "0 auto 20px"
          }}>✕</div>
        )}

        <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>
          {status === "processing" ? "驗證中" : status === "success" ? "驗證成功" : "驗證失敗"}
        </h2>
        <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.6 }}>{message}</p>

        {status === "error" && (
          <button
            onClick={() => router.back()}
            style={{
              marginTop: 20, padding: "10px 24px",
              background: "var(--accent)",
              color: "white", borderRadius: 980,
              fontSize: 14, fontWeight: 500
            }}
          >返回重試</button>
        )}

        <div style={{ marginTop: 28 }}>
          <a href="/" style={{ fontSize: 12, color: "var(--text2)", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{
              width: 16, height: 16, borderRadius: 4,
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: 8, fontWeight: 700, color: "white"
            }}>R</span>
            Powered by ReAuth
          </a>
        </div>
      </div>
    </div>
  );
}
