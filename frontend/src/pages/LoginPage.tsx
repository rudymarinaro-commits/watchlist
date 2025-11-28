import { FormEvent, useState, useEffect, useRef } from "react";
import { api } from "../api";
import type { UserInfo } from "../types";

interface Props {
  onLoginSuccess: (user: UserInfo) => void;
  onGoToRegister: () => void;
}

// Validazione semplice email
function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function LoginPage({ onLoginSuccess, onGoToRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // 👇 Riferimento per autofocus sul campo email
  const emailRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Validazione lato client
    if (!isValidEmail(email)) {
      setError("Inserisci una email valida");
      setLoading(false);
      return;
    }

    if (!password) {
      setError("Inserisci la password");
      setLoading(false);
      return;
    }

    try {
      const user = await api.login(email, password);
      onLoginSuccess(user);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Errore durante il login"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Login Watchlist</h1>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-form-field">
          <label className="auth-label">Email</label>
          <input
            ref={emailRef}
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError(null);
            }}
            style={{
              borderColor: email && !isValidEmail(email) ? "red" : ""
            }}
            required
          />
        </div>

        <div className="auth-form-field">
          <label className="auth-label">Password</label>
          <div className="password-wrapper">
            <input
              className="auth-input"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(null);
              }}
              required
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        <div className="auth-actions">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "..." : "Accedi"}
          </button>
        </div>

        <button
          type="button"
          className="link-button"
          onClick={onGoToRegister}
        >
          Non hai un account? Registrati
        </button>
      </form>
    </div>
  );
}
