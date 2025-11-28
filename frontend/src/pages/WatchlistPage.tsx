import { useEffect, useState } from "react";
import { api } from "../api";
import type { UserInfo, WatchlistItem } from "../types";
import Navbar from "../components/Navbar";
import AddItemModal from "../components/AddItemModal";
import EditItemModal from "../components/EditItemModal";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

interface Props {
  user: UserInfo;
  onLogout: () => void;
}

export default function WatchlistPage({ user, onLogout }: Props) {
  const [items, setItems] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editItem, setEditItem] = useState<WatchlistItem | null>(null);
  const [deleteItem, setDeleteItem] = useState<WatchlistItem | null>(null);

  useEffect(() => {
    api
      .getWatchlist()
      .then(setItems)
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Errore")
      )
      .finally(() => setLoading(false));
  }, []);

  async function handleLogout() {
    await api.logout();
    onLogout();
  }

  async function handleAddItem(data: any) {
    try {
      const created = await api.addWatchlistItem(data);
      setItems((prev) => [created, ...prev]);
      setShowAddModal(false);
    } catch (err) {
      console.error(err);
      alert("Errore nell'aggiunta del titolo");
    }
  }

  async function handleEditItemSave(data: any) {
    if (!editItem) return;
    try {
      const updated = await api.updateWatchlistItem(editItem.id, data);
      setItems((prev) =>
        prev.map((i) => (i.id === updated.id ? updated : i))
      );
      setEditItem(null);
    } catch (err) {
      console.error(err);
      alert("Errore nella modifica del titolo");
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteItem) return;
    try {
      await api.deleteWatchlistItem(deleteItem.id);
      setItems((prev) => prev.filter((i) => i.id !== deleteItem.id));
      setDeleteItem(null);
    } catch (err) {
      console.error(err);
      alert("Errore nell'eliminazione del titolo");
    }
  }

  return (
    <div className="app-layout">
      <Navbar user={user} onLogout={handleLogout} />

      <main className="watchlist-main">
        <div className="watchlist-header">
          <h2>La tua Watchlist</h2>
          <button
            className="btn btn-primary"
            onClick={() => setShowAddModal(true)}
          >
            + Nuovo titolo
          </button>
        </div>

        {loading && <div>Caricamento watchlist...</div>}
        {error && <div className="auth-error">{error}</div>}

        {!loading && items.length === 0 && (
          <p className="empty-message">
            Nessun titolo ancora. Aggiungi il primo con il pulsante in alto.
          </p>
        )}

        <div className="watchlist-grid">
          {items.map((item) => (
            <div key={item.id} className="watchlist-card">
              <h3>{item.title}</h3>
              <p className="tag-row">
                <span className="tag">{item.type}</span>
                <span className="tag">{item.status}</span>
                {item.rating != null && (
                  <span className="tag rating">{item.rating}/10</span>
                )}
              </p>
              {item.notes && <p className="notes">{item.notes}</p>}
              <div className="card-actions">
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditItem(item)}
                >
                  Modifica
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setDeleteItem(item)}
                >
                  Elimina
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {showAddModal && (
        <AddItemModal
          onClose={() => setShowAddModal(false)}
          onSave={handleAddItem}
        />
      )}

      {editItem && (
        <EditItemModal
          item={editItem}
          onClose={() => setEditItem(null)}
          onSave={handleEditItemSave}
        />
      )}

      {deleteItem && (
        <DeleteConfirmModal
          title={deleteItem.title}
          onCancel={() => setDeleteItem(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
}
