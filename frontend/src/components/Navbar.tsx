import { useState } from "react";
import type { UserInfo } from "../types";

interface Props {
  user: UserInfo;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: Props) {
  const [open, setOpen] = useState(false);

  const initial =
    user.name && user.name.length > 0
      ? user.name[0].toUpperCase()
      : "U";

  function toggleMenu() {
    setOpen((prev) => !prev);
  }

  return (
    <header className="navbar">
      <div className="app-title">Watchlist</div>

      <div className="navbar-right">
        {/* Avatar tondo */}
        <button
          className="avatar"
          onClick={toggleMenu}
          aria-label="Apri menu utente"
        >
          {initial}
        </button>

        {/* Freccia fuori dal cerchio */}
        <button
          className={`avatar-arrow ${open ? "open" : ""}`}
          onClick={toggleMenu}
          aria-label="Apri menu utente"
        >
          ▾
        </button>

        {open && (
          <div className="user-dropdown">
            <div className="menu-name">{user.name}</div>
            <div className="menu-email">{user.email}</div>
            <button
              className="dropdown-logout"
              onClick={onLogout}
            >
              Esci
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
