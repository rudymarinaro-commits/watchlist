interface Props {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmModal({
  title,
  onCancel,
  onConfirm
}: Props) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <h2>Eliminare questo titolo?</h2>
        <p>
          Stai per rimuovere <strong>{title}</strong> dalla tua watchlist.
          Questa azione non può essere annullata.
        </p>
        <div className="modal-actions">
          <button className="btn btn-secondary" onClick={onCancel}>
            Annulla
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            Elimina
          </button>
        </div>
      </div>
    </div>
  );
}
