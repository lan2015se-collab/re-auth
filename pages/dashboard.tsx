import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { ref, push, onValue, set } from "firebase/database";
import { useRouter } from "next/router";
import CreateAppModal from "../components/CreateAppModal";
import AppDetail from "../components/AppDetail";

export interface AppData {
  id: string;
  name: string;
  url: string;
  redirectUrls: string[];
  callbackUrl: string;
  clientId: string;
  clientSecret: string;
  createdAt: number;
  ownerId: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [apps, setApps] = useState<AppData[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      if (!u) { router.push("/"); return; }
      setUser(u);
      const appsRef = ref(db, `apps/${u.uid}`);
      onValue(appsRef, (snap) => {
        const data = snap.val();
        if (data) {
          const list: AppData[] = Object.entries(data).map(([id, v]: any) => ({ id, ...v }));
          setApps(list.sort((a, b) => b.createdAt - a.createdAt));
        } else {
          setApps([]);
        }
        setLoading(false);
      });
    });
    return () => unsub();
  }, [router]);

  return (
    <>
      <Head>
        <title>儀表板 — ReAuth</title>
      </Head>
      <div style={{ minHeight: "100vh", background: "#fafafa" }}>
        {/* Nav */}
        <nav style={{
          borderBottom: "1px solid var(--border)",
          padding: "0 32px",
          height: 64,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: "white"
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
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 13, color: "#737373" }}>{user?.email}</span>
            <button onClick={() => signOut(auth).then(() => router.push("/"))} style={{
              padding: "7px 16px", fontSize: 13,
              border: "1px solid var(--border)",
              borderRadius: 980, color: "#737373"
            }}>登出</button>
          </div>
        </nav>

        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em" }}>我的應用</h1>
              <p style={{ color: "#737373", fontSize: 14, marginTop: 4 }}>管理你的 ReAuth OAuth 整合</p>
            </div>
            <button onClick={() => setShowCreate(true)} style={{
              padding: "10px 22px",
              background: "linear-gradient(135deg, var(--accent), var(--accent2))",
              color: "white",
              borderRadius: 980,
              fontSize: 14,
              fontWeight: 600
            }}>＋ 建立應用</button>
          </div>

          {loading ? (
            <div style={{ textAlign: "center", color: "#737373", padding: 60 }}>載入中…</div>
          ) : apps.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "80px 32px",
              border: "2px dashed var(--border)",
              borderRadius: 20,
              color: "#737373"
            }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>🔐</div>
              <h3 style={{ fontSize: 18, fontWeight: 600, color: "var(--text)", marginBottom: 8 }}>尚未建立任何應用</h3>
              <p style={{ fontSize: 14, marginBottom: 24 }}>點擊右上角「建立應用」開始整合 ReAuth</p>
              <button onClick={() => setShowCreate(true)} style={{
                padding: "10px 24px",
                background: "var(--accent)",
                color: "white",
                borderRadius: 980,
                fontSize: 14,
                fontWeight: 600
              }}>立即建立</button>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {apps.map(app => (
                <div
                  key={app.id}
                  onClick={() => setSelectedApp(app)}
                  style={{
                    padding: "20px 24px",
                    background: "white",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius)",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    transition: "all var(--transition)"
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,110,247,0.4)";
                    (e.currentTarget as HTMLElement).style.background = "#f3f4f6";
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                    (e.currentTarget as HTMLElement).style.background = "white";
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: 9,
                        background: "linear-gradient(135deg, var(--accent), var(--accent2))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 14, fontWeight: 700, color: "white"
                      }}>{app.name[0]?.toUpperCase()}</div>
                      <h3 style={{ fontSize: 16, fontWeight: 600 }}>{app.name}</h3>
                    </div>
                    <p style={{ fontSize: 12, color: "#737373", marginLeft: 44 }}>{app.url}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 11, color: "#737373", marginBottom: 3 }}>Client ID</p>
                      <code style={{
                        fontSize: 12,
                        background: "#f3f4f6",
                        padding: "3px 8px",
                        borderRadius: 6,
                        color: "var(--accent2)"
                      }}>{app.clientId.slice(0, 12)}…</code>
                    </div>
                    <span style={{ color: "#737373", fontSize: 18 }}>›</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showCreate && (
        <CreateAppModal
          user={user!}
          onClose={() => setShowCreate(false)}
        />
      )}
      {selectedApp && (
        <AppDetail
          app={selectedApp}
          onClose={() => setSelectedApp(null)}
        />
      )}
    </>
  );
}
