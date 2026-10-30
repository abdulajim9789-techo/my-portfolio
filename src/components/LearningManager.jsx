
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  BookOpen,
} from "lucide-react";

const emptyLearning = {
  title: "",
  status: "In progress",
};

const getTitle = (item) =>
  typeof item === "string" ? item : item.title || "";

const getStatus = (item) =>
  typeof item === "string"
    ? "In progress"
    : item.status || "In progress";

const getId = (item) =>
  typeof item === "string"
    ? item
    : item.id ?? item._id ?? item.title;

export default function LearningManager({
  learning = [],
  setPortfolio,
}) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyLearning });

  const startAdd = () => {
    setEditingId("new");
    setForm({ ...emptyLearning });
  };

  const startEdit = (item) => {
    setEditingId(getId(item));
    setForm({
      title: getTitle(item),
      status: getStatus(item),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyLearning });
  };

  const saveLearning = () => {
    if (!form.title.trim()) {
      alert("Learning topic is required.");
      return;
    }

    const isNew = editingId === "new";

    const learningItem = {
      id: isNew ? `learning-${Date.now()}` : editingId,
      title: form.title.trim(),
      status: form.status.trim() || "In progress",
    };

    setPortfolio((prev) => {
      const current = prev.learning || [];

      const updated = isNew
        ? [...current, learningItem]
        : current.map((item) =>
            getId(item) === editingId
              ? {
                  ...(typeof item === "object" ? item : {}),
                  ...learningItem,
                }
              : item
          );

      return {
        ...prev,
        learning: updated,
      };
    });

    cancelEdit();
    alert(isNew ? "Learning topic added!" : "Learning topic updated!");
  };

  const deleteLearning = (item) => {
    if (!window.confirm("Delete this learning topic?")) return;

    const id = getId(item);

    setPortfolio((prev) => ({
      ...prev,
      learning: (prev.learning || []).filter(
        (entry) => getId(entry) !== id
      ),
    }));

    if (editingId === id) cancelEdit();

    alert("Learning topic deleted!");
  };

  return (
    <section className="admin-panel">
      <div className="crud-header">
        <div>
          <p className="admin-eyebrow">LEARNING MANAGEMENT</p>
          <h2>Learning Journey</h2>
          <span>Manage the skills and topics you are learning.</span>
        </div>

        {editingId === null && (
          <button className="primary-button" onClick={startAdd} type="button">
            <Plus size={17} />
            Add Topic
          </button>
        )}
      </div>

      {editingId !== null && (
        <div className="crud-form">
          <div className="crud-form-top">
            <h3>{editingId === "new" ? "Add Topic" : "Edit Topic"}</h3>
            <button
              className="icon-button"
              type="button"
              onClick={cancelEdit}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="profile-form">
            <div className="form-group">
              <label>Learning Topic</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="React component architecture"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select
                value={form.status}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, status: e.target.value }))
                }
              >
                <option>In progress</option>
                <option>Completed</option>
                <option>Planned</option>
                <option>On hold</option>
              </select>
            </div>
          </div>

          <div className="crud-actions">
            <button
              className="primary-button"
              type="button"
              onClick={saveLearning}
            >
              <Save size={17} />
              Save Topic
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="crud-list">
        {learning.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={32} />
            <p>No learning topics yet.</p>
            <button
              className="primary-button"
              type="button"
              onClick={startAdd}
            >
              <Plus size={17} />
              Add Your First Topic
            </button>
          </div>
        ) : (
          learning.map((item, index) => (
            <article className="crud-item" key={getId(item) ?? index}>
              <div className="crud-item-content">
                <div className="crud-item-title">
                  <div className="skill-admin-icon">
                    <BookOpen size={18} />
                  </div>
                  <h3>{getTitle(item)}</h3>
                </div>

                <div className="crud-tags">
                  <span>{getStatus(item)}</span>
                </div>
              </div>

              <div className="crud-item-actions">
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => startEdit(item)}
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteLearning(item)}
                >
                  <Trash2 size={15} />
                  Delete
                </button>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
