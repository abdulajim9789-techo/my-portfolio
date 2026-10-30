
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  GraduationCap,
} from "lucide-react";

const emptyEducation = {
  degree: "",
  institution: "",
  status: "",
};

const getEducationId = (item) => item.id ?? item._id;

export default function EducationManager({
  education = [],
  setPortfolio,
}) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyEducation);
  const [loading, setLoading] = useState(false);

  const startAdd = () => {
    setEditingId("new");
    setForm({ ...emptyEducation });
  };

  const startEdit = (item) => {
    setEditingId(getEducationId(item));
    setForm({
      degree: item.degree || "",
      institution: item.institution || "",
      status: item.status || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyEducation });
  };

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveEducation = () => {
    if (!form.degree.trim()) {
      alert("Degree is required.");
      return;
    }

    if (!form.institution.trim()) {
      alert("Institution is required.");
      return;
    }

    setLoading(true);

    try {
      const isNew = editingId === "new";

      const educationData = {
        id: isNew
          ? `education-${Date.now()}`
          : editingId,
        degree: form.degree.trim(),
        institution: form.institution.trim(),
        status: form.status.trim(),
      };

      setPortfolio((prev) => {
        const currentEducation = prev.education || [];

        const updatedEducation = isNew
          ? [...currentEducation, educationData]
          : currentEducation.map((item) =>
              getEducationId(item) === editingId
                ? { ...item, ...educationData }
                : item
            );

        return {
          ...prev,
          education: updatedEducation,
        };
      });

      cancelEdit();

      alert(
        isNew
          ? "Education added successfully!"
          : "Education updated successfully!"
      );
    } catch (error) {
      console.error("Education save error:", error);
      alert("Unable to save education.");
    } finally {
      setLoading(false);
    }
  };

  const deleteEducation = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education entry?"
    );

    if (!confirmed) return;

    setPortfolio((prev) => ({
      ...prev,
      education: (prev.education || []).filter(
        (item) => getEducationId(item) !== id
      ),
    }));

    if (editingId === id) {
      cancelEdit();
    }

    alert("Education deleted successfully!");
  };

  return (
    <section className="admin-panel">
      <div className="crud-header">
        <div>
          <p className="admin-eyebrow">
            EDUCATION MANAGEMENT
          </p>
          <h2>Education</h2>
          <span>
            Manage your education and academic background.
          </span>
        </div>

        {editingId === null && (
          <button
            className="primary-button"
            type="button"
            onClick={startAdd}
          >
            <Plus size={17} />
            Add Education
          </button>
        )}
      </div>

      {editingId !== null && (
        <div className="crud-form">
          <div className="crud-form-top">
            <h3>
              {editingId === "new"
                ? "Add Education"
                : "Edit Education"}
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
              <label>Degree / Course</label>
              <input
                type="text"
                value={form.degree}
                onChange={(e) =>
                  updateField("degree", e.target.value)
                }
                placeholder="B.Tech Information Technology"
              />
            </div>

            <div className="form-group">
              <label>Institution</label>
              <input
                type="text"
                value={form.institution}
                onChange={(e) =>
                  updateField("institution", e.target.value)
                }
                placeholder="Arunai Engineering College"
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <input
                type="text"
                value={form.status}
                onChange={(e) =>
                  updateField("status", e.target.value)
                }
                placeholder="Currently Pursuing"
              />
            </div>
          </div>

          <div className="crud-actions">
            <button
              className="primary-button"
              type="button"
              onClick={saveEducation}
              disabled={loading}
            >
              <Save size={17} />
              {loading ? "Saving..." : "Save Education"}
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

      <div className="crud-list">
        {education.length === 0 ? (
          <div className="empty-state">
            <GraduationCap size={32} />
            <p>No education entries yet.</p>

            <button
              className="primary-button"
              type="button"
              onClick={startAdd}
            >
              <Plus size={17} />
              Add Your Education
            </button>
          </div>
        ) : (
          education.map((item) => (
            <article
              className="crud-item"
              key={getEducationId(item)}
            >
              <div className="crud-item-content">
                <div className="crud-item-title">
                  <div className="skill-admin-icon">
                    <GraduationCap size={18} />
                  </div>
                  <h3>{item.degree}</h3>
                </div>

                <p>{item.institution}</p>

                {item.status && (
                  <div className="crud-tags">
                    <span>{item.status}</span>
                  </div>
                )}
              </div>

              <div className="crud-item-actions">
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => startEdit(item)}
                  disabled={loading}
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() =>
                    deleteEducation(getEducationId(item))
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
