import { useEffect, useState } from "react";
import { api } from "./api";
import type { UserInfo } from "./types";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import WatchlistPage from "./pages/WatchlistPage";

type Page = "login" | "register" | "watchlist";

function App() {
  const [page, setPage] = useState<Page>("login");
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // ==========================================
  // On mount → check session and set state
  // ==========================================
  useEffect(() => {
    api
      .me()
      .then((u) => {
        if (u) {
          setUser(u);
          setPage("watchlist");
        } else {
          setUser(null);
          setPage("login");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  // ==========================================
  // UI – LOADING
  // ==========================================
  if (loading) {
    return <div className="centered">Caricamento...</div>;
  }

  // ==========================================
  // UI – REGISTER PAGE
  // ==========================================
  if (!user && page === "register") {
    return (
      <RegisterPage
        onRegistered={(u) => {
          setUser(u);
          setPage("watchlist");
        }}
        onBackToLogin={() => setPage("login")}
      />
    );
  }

  // ==========================================
  // UI – LOGIN PAGE
  // ==========================================
  if (!user && page === "login") {
    return (
      <LoginPage
        onLoginSuccess={(u) => {
          setUser(u);
          setPage("watchlist");
        }}
        onGoToRegister={() => setPage("register")}
      />
    );
  }

  // Extra guardia per far felice TypeScript
  if (!user) {
    return <div className="centered">Utente non autenticato</div>;
  }

  // ==========================================
  // UI – WATCHLIST PAGE
  // ==========================================
  return (
    <WatchlistPage
      user={user}
      onLogout={async () => {
        await api.logout();
        setUser(null);
        setPage("login");
      }}
    />
  );
}

export default App;
