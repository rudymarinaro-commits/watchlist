export type WatchlistStatus =
  | "Da vedere"
  | "In visione"
  | "Completato"
  | "Abbandonato";

export type WatchlistType = "Film" | "Serie";

export interface WatchlistItem {
  id: number;
  userid: number;
  title: string;
  type: WatchlistType;
  status: WatchlistStatus;
  rating?: number | null;
  notes?: string | null;
}

export interface UserInfo {
  id: number;
  name: string;
  surname: string;
  email: string;
  birthDate?: string;
}

export interface RegisterPayload {
  name: string;
  surname: string;
  email: string;
  password: string;
  birthDate: string;
}


