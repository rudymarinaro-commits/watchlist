import type { UserInfo, WatchlistItem, RegisterPayload } from "./types";

const BASE_URL = "http://localhost:3000/api";

// =====================
// Helper request
// =====================
async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
  });

  if (!res.ok) {
    const text = await res.text();
    let msg = "Errore di rete";
    try {
      msg = JSON.parse(text).error || msg;
    } catch {
      msg = text;
    }
    throw new Error(msg);
  }

  return res.json() as Promise<T>;
}

export const api = {

  // LOGIN
  login(email: string, password: string) {
    return request<UserInfo>("/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });
  },

  // REGISTER
  register(payload: RegisterPayload) {
    return request<UserInfo>("/register", {
      method: "POST",
      body: JSON.stringify(payload)
    });
  },

  // LOGOUT
  logout() {
    return request("/logout", {
      method: "POST"
    });
  },

  // ME
  me() {
    return request<UserInfo | null>("/me");
  },

  // WATCHLIST
  getWatchlist() {
    return request<WatchlistItem[]>("/watchlist");
  },

  addWatchlistItem(data: {
    title: string;
    type: string;
    status: string;
    rating?: number | null;
    notes?: string | null;
  }) {
    return request<WatchlistItem>("/watchlist", {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  updateWatchlistItem(id: number, data: Partial<{
    title: string;
    type: string;
    status: string;
    rating?: number | null;
    notes?: string | null;
  }>) {
    return request<WatchlistItem>(`/watchlist/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  },

  deleteWatchlistItem(id: number) {
    return request(`/watchlist/${id}`, {
      method: "DELETE"
    });
  }
};
