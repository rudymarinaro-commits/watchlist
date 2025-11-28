import { useState } from "react";
import type { WatchlistItem } from "../types";

interface Props {
  item: WatchlistItem;
  onClose: () => void;
  onSave: (data: any) => void;
}

export default function EditItemModal({ item, onClose, onSave }: Props) {
  const [title, setTitle] = useState(item.title);
  const [type, setType] = useState(item.type);
  const [status, setStatus] = useState(item.status);
  const [rating, setRating] = useState<number | null>(item.rating ?? null);
  const [notes, setNotes] = useState(item.notes ?? "");

  function handleSave() {
    onSave({
      title,
      type,
      status,
      rating,
      notes,
    });
  }

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Modifica titolo</h2>

        <div className="form-field">
          <label>Titolo</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="auth-input"
          />
        </div>

        <div className="form-field">
          <label>Tipo</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="auth-input"
          >
            <option value="Film">Film</option>
            <option value="Serie">Serie</option>
          </select>
        </div>

        <div className="form-field">
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="auth-input"
          >
            <option value="Da vedere">Da vedere</option>
            <option value="In visione">In visione</option>
            <option value="Completato">Completato</option>
            <option value="Abbandonato">Abbandonato</option>
          </select>
        </div>

        <div className="form-field">
          <label>Rating</label>
          <input
            type="number"
            min={1}
            max={10}
            value={rating ?? ""}
            className="auth-input"
            onChange={(e) => {
              const val = e.target.value;
              setRating(val ? parseInt(val, 10) : null);
            }}
          />
        </div>

        <div className="form-field">
          <label>Note</label>
          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="auth-input"
          />
        </div>

        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onClose}>
            Annulla
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Salva
          </button>
        </div>
      </div>
    </div>
  );
}
