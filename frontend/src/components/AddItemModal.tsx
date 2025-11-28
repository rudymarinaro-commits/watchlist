import { FormEvent, useState } from "react";
import type { WatchlistStatus, WatchlistType } from "../types";

interface Props {
  onClose: () => void;
  onSave: (data: {
    title: string;
    type: WatchlistType;
    status: WatchlistStatus;
    rating?: number | null;
    notes?: string | null;
  }) => void;
}

export default function AddItemModal({ onClose, onSave }: Props) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<WatchlistType>("Film");
  const [status, setStatus] = useState<WatchlistStatus>("Da vedere");
  const [rating, setRating] = useState<string>("");
  const [notes, setNotes] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSave({
      title,
      type,
      status,
      rating: rating ? Number(rating) : null,
      notes: notes || null
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Nuovo titolo</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Titolo</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="form-field">
            <label>Tipo</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as WatchlistType)}
            >
              <option value="Film">Film</option>
              <option value="Serie">Serie TV</option>
            </select>
          </div>

          <div className="form-field">
            <label>Stato</label>
            <select
              value={status}
              onChange={(e) =>
                setStatus(e.target.value as WatchlistStatus)
              }
            >
              <option value="Da vedere">Da vedere</option>
              <option value="In visione">In visione</option>
              <option value="Completato">Completato</option>
              <option value="Abbandonato">Abbandonato</option>
            </select>
          </div>

          <div className="form-field">
            <label>Voto (1–10, opzionale)</label>
            <input
              type="number"
              min={1}
              max={10}
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />
          </div>

          <div className="form-field">
            <label>Note</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Annulla
            </button>
            <button type="submit" className="btn btn-primary">
              Aggiungi
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
