
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Trophy,
} from "lucide-react";

const emptyAchievement = {
  title: "",
  organization: "",
  date: "",
  description: "",
  link: "",
};

const getId = (achievement) =>
  achievement.id ?? achievement._id;

export default function AchievementManager({
  achievements = [],
  setPortfolio,
}) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyAchievement });
  const [loading, setLoading] = useState(false);

  const startAdd = () => {
    setEditingId("new");
    setForm({ ...emptyAchievement });
  };

  const startEdit = (achievement) => {
    setEditingId(getId(achievement));

    setForm({
      title: achievement.title || "",
      organization: achievement.organization || "",
      date: achievement.date || "",
      description: achievement.description || "",
      link: achievement.link || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyAchievement });
  };

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveAchievement = () => {
    if (!form.title.trim()) {
      alert("Achievement title is required.");
      return;
    }

    const isNew = editingId === "new";

    if (!isNew && editingId == null) {
      alert("Unable to identify this achievement. Please try again.");
      return;
    }

    setLoading(true);

    try {
      const achievementData = {
        id: isNew
          ? `achievement-${Date.now()}`
          : editingId,
        title: form.title.trim(),
        organization: form.organization.trim(),
        date: form.date.trim(),
        description: form.description.trim(),
        link: form.link.trim(),
      };

      setPortfolio((prev) => {
        const currentAchievements = prev.achievements || [];

        const updatedAchievements = isNew
          ? [...currentAchievements, achievementData]
          : currentAchievements.map((achievement) =>
              getId(achievement) === editingId
                ? { ...achievement, ...achievementData }
                : achievement
            );

        return {
          ...prev,
          achievements: updatedAchievements,
        };
      });

      cancelEdit();

      alert(
        isNew
          ? "Achievement added successfully!"
          : "Achievement updated successfully!"
      );
    } catch (error) {
      console.error("Achievement save error:", error);
      alert("Unable to save achievement.");
    } finally {
      setLoading(false);
    }
  };

  const deleteAchievement = (id) => {
    if (id == null) {
      alert("Unable to identify this achievement.");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this achievement?"
    );

    if (!confirmed) return;

    setPortfolio((prev) => ({
      ...prev,
      achievements: (prev.achievements || []).filter(
        (achievement) => getId(achievement) !== id
      ),
    }));

    if (editingId === id) {
      cancelEdit();
    }

    alert("Achievement deleted successfully!");
  };

  return (
    <section className="admin-panel">
      {/* HEADER */}
      <div className="crud-header">
        <div>
          <p className="admin-eyebrow">
            ACHIEVEMENT MANAGEMENT
          </p>

          <h2>Achievements</h2>

          <span>
            Manage your accomplishments, awards and
            important milestones.
          </span>
        </div>

        {editingId === null && (
          <button
            className="primary-button"
            type="button"
            onClick={startAdd}
          >
            <Plus size={17} />
            Add Achievement
          </button>
        )}
      </div>

      {/* FORM */}
      {editingId !== null && (
        <div className="crud-form">
          <div className="crud-form-top">
            <h3>
              {editingId === "new"
                ? "Add Achievement"
                : "Edit Achievement"}
            </h3>

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
              <label>Achievement Title</label>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  updateField("title", e.target.value)
                }
                placeholder="SIH Hackathon Participant"
              />
            </div>

            <div className="form-group">
              <label>Organization</label>

              <input
                type="text"
                value={form.organization}
                onChange={(e) =>
                  updateField("organization", e.target.value)
                }
                placeholder="Smart India Hackathon"
              />
            </div>

            <div className="form-group">
              <label>Date / Year</label>

              <input
                type="text"
                value={form.date}
                onChange={(e) =>
                  updateField("date", e.target.value)
                }
                placeholder="2026"
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>

              <textarea
                rows={6}
                value={form.description}
                onChange={(e) =>
                  updateField("description", e.target.value)
                }
                placeholder="Describe your achievement..."
              />
            </div>

            <div className="form-group full-width">
              <label>Link (Optional)</label>

              <input
                type="url"
                value={form.link}
                onChange={(e) =>
                  updateField("link", e.target.value)
                }
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="crud-actions">
            <button
              className="primary-button"
              type="button"
              onClick={saveAchievement}
              disabled={loading}
            >
              <Save size={17} />
              {loading ? "Saving..." : "Save Achievement"}
            </button>

            <button
              className="secondary-button"
              type="button"
              onClick={cancelEdit}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* ACHIEVEMENT LIST */}
      <div className="crud-list">
        {achievements.length === 0 ? (
          <div className="empty-state">
            <Trophy size={32} />

            <p>No achievements yet.</p>

            <button
              className="primary-button"
              type="button"
              onClick={startAdd}
            >
              <Plus size={17} />
              Add Your First Achievement
            </button>
          </div>
        ) : (
          achievements.map((achievement, index) => (
            <article
              className="crud-item"
              key={getId(achievement) ?? index}
            >
              <div className="crud-item-content">
                <div className="crud-item-title">
                  <div className="skill-admin-icon">
                    <Trophy size={18} />
                  </div>

                  <h3>{achievement.title}</h3>

                  {achievement.date && (
                    <div className="crud-tags">
                      <span>{achievement.date}</span>
                    </div>
                  )}
                </div>

                {achievement.organization && (
                  <p>{achievement.organization}</p>
                )}

                {achievement.description && (
                  <p>{achievement.description}</p>
                )}

                {achievement.link && (
                  <p>
                    <a
                      href={achievement.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View achievement
                    </a>
                  </p>
                )}
              </div>

              <div className="crud-item-actions">
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => startEdit(achievement)}
                  disabled={loading}
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() =>
                    deleteAchievement(getId(achievement))
                  }
                  disabled={loading}
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
