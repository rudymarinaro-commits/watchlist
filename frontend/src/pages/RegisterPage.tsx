import { FormEvent, useState } from "react";
import { api } from "../api";
import type { UserInfo } from "../types";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  onRegistered: (user: UserInfo) => void;
  onBackToLogin: () => void;
}

export default function RegisterPage({
  onRegistered,
  onBackToLogin
}: Props) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<"weak" | "medium" | "strong">("weak");


  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await api.register({
        name,
        surname,
        email,
        password,
        birthDate
      });
      onRegistered(user);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Errore durante la registrazione"
      );
    } finally {
      setLoading(false);
    }
  }

  function evaluatePasswordStrength(pw: string) {
    let score = 0;

    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[a-z]/.test(pw)) score++;
    if (/\d/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    if (score >= 4) return "strong";
    if (score >= 2) return "medium";
    return "weak";
  }

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h1>Registrazione</h1>

        {error && <div className="auth-error">{error}</div>}

        <div className="auth-form-field">
          <label className="auth-label">Nome</label>
          <input
            className="auth-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="auth-form-field">
          <label className="auth-label">Cognome</label>
          <input
            className="auth-input"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>

        <div className="auth-form-field">
          <label className="auth-label">Email</label>
          <input
            className="auth-input"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-form-field">
          <label className="auth-label">Data di nascita</label>
          <DatePicker
            selected={birthDate ? new Date(birthDate) : null}
            onChange={(date: Date | null) => {
              const iso = date ? date.toISOString().slice(0, 10) : "";
              setBirthDate(iso);
            }}
            dateFormat="yyyy-MM-dd"
            maxDate={new Date()}
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={90}
            placeholderText="Seleziona data"
            className="auth-input"
          />
        </div>

        <div className="auth-form-field">
          <label className="auth-label">Password</label>
          <div className="password-wrapper">
            <input
              className="auth-input"
              type={showPw ? "text" : "password"}
              value={password}
              onChange={(e) => {
                const pw = e.target.value;
                setPassword(pw);
                setPasswordStrength(evaluatePasswordStrength(pw));
              }}

              required
            />
            <button
              type="button"
              className="toggle-password-button"
              onClick={() => setShowPw(!showPw)}
            >
              {showPw ? "🙈" : "👁️"}
            </button>
          </div>
        </div>

        {password && (
          <div
            style={{
              fontSize: "0.8rem",
              marginTop: "-6px",
              marginBottom: "8px",
              color:
                passwordStrength === "strong"
                  ? "#4dff4d"
                  : passwordStrength === "medium"
                    ? "#ffd633"
                    : "#ff3333"
            }}
          >
            {passwordStrength === "strong" && "🟢 Password forte"}
            {passwordStrength === "medium" && "🟡 Password media"}
            {passwordStrength === "weak" && "🔴 Password debole"}
          </div>
        )}

        <div className="auth-actions">
          <button
            className="btn btn-primary"
            type="submit"
            disabled={loading}
          >
            {loading ? "..." : "Registrati"}
          </button>
        </div>

        <button
          type="button"
          className="link-button"
          onClick={onBackToLogin}
        >
          Torna al login
        </button>
      </form>
    </div>
  );
}
