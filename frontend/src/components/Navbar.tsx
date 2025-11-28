import { useState, useRef, useEffect } from "react";
import type { UserInfo } from "../types";

interface Props {
  user: UserInfo;
  onLogout: () => void;
}

export default function Navbar({ user, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const initial =
    (user.name?.charAt(0) || user.email?.charAt(0) || "?").toUpperCase();

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar">
      <span className="app-title">Personal Watchlist</span>

      <div className="navbar-right" ref={ref}>
        <button
          className="avatar"
          onClick={() => setOpen(!open)}
        >
          {initial}
        </button>

        <button
          className={`avatar-arrow ${open ? "open" : ""}`}
          onClick={() => setOpen(!open)}
        >
          ▼
        </button>

        {open && (
          <div className="user-dropdown">
            <div className="menu-name">{user.name} {user.surname}</div>
            <div className="menu-email">{user.email}</div>
            <button className="dropdown-logout" onClick={onLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
