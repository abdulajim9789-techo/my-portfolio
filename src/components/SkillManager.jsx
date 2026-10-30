
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Code2,
} from "lucide-react";

export default function SkillManager({
  skills = [],
  setPortfolio,
}) {
  const [editingId, setEditingId] = useState(null);
  const [skillName, setSkillName] = useState("");
  const [category, setCategory] = useState("Frontend");
  const [level, setLevel] = useState("Beginner");
  const [loading, setLoading] = useState(false);

  const startAdd = () => {
    setEditingId("new");
    setSkillName("");
    setCategory("Frontend");
    setLevel("Beginner");
  };

  const startEdit = (skill) => {
    setEditingId(skill.id);
    setSkillName(
      typeof skill === "string" ? skill : skill.name || ""
    );
    setCategory(skill.category || "Other");
    setLevel(skill.level || "Beginner");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setSkillName("");
    setCategory("Frontend");
    setLevel("Beginner");
  };

  const saveSkill = () => {
    const value = skillName.trim();

    if (!value) {
      alert("Skill name is required.");
      return;
    }

    const skillData = {
      id:
        editingId === "new"
          ? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
          : editingId,
      name: value,
      category,
      level,
    };

    setLoading(true);

    try {
      setPortfolio((prev) => {
        const currentSkills = prev.skills || [];

        const updatedSkills =
          editingId === "new"
            ? [...currentSkills, skillData]
            : currentSkills.map((skill) =>
                typeof skill === "string"
                  ? skill === skillName
                    ? skillData
                    : skill
                  : skill.id === editingId
                    ? skillData
                    : skill
              );

        return {
          ...prev,
          skills: updatedSkills,
        };
      });

      cancelEdit();

      alert(
        editingId === "new"
          ? "Skill added successfully!"
          : "Skill updated successfully!"
      );
    } catch (error) {
      console.error("Skill save error:", error);
      alert("Could not save the skill.");
    } finally {
      setLoading(false);
    }
  };

  const deleteSkill = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this skill?"
    );

    if (!confirmed) return;

    setPortfolio((prev) => ({
      ...prev,
      skills: (prev.skills || []).filter((skill) =>
        typeof skill === "string"
          ? skill !== id
          : skill.id !== id
      ),
    }));

    alert("Skill deleted successfully!");
  };

  return (
    <section className="admin-panel">
      <div className="crud-header">
        <div>
          <p className="admin-eyebrow">SKILLS MANAGEMENT</p>
          <h2>Skills</h2>
          <span>
            Manage the technologies and skills displayed on your portfolio.
          </span>
        </div>

        {editingId === null && (
          <button
            className="primary-button"
            type="button"
            onClick={startAdd}
          >
            <Plus size={17} />
            Add Skill
          </button>
        )}
      </div>

      {editingId !== null && (
        <div className="crud-form">
          <div className="crud-form-top">
            <h3>
              {editingId === "new" ? "Add New Skill" : "Edit Skill"}
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

          <div className="form-group">
            <label>Skill Name</label>
            <input
              type="text"
              value={skillName}
              onChange={(e) => setSkillName(e.target.value)}
              placeholder="e.g. React"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label>Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Programming">Programming</option>
              <option value="Tools">Tools</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>

          <div className="crud-actions">
            <button
              className="primary-button"
              type="button"
              onClick={saveSkill}
              disabled={loading}
            >
              <Save size={17} />
              {loading ? "Saving..." : "Save Skill"}
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

      <div className="skill-admin-grid">
        {skills.length === 0 ? (
          <div className="empty-state">
            <p>No skills yet.</p>
            <button
              className="primary-button"
              type="button"
              onClick={startAdd}
            >
              <Plus size={17} />
              Add Your First Skill
            </button>
          </div>
        ) : (
          skills.map((skill, index) => {
            const isLegacySkill = typeof skill === "string";
            const id = isLegacySkill ? skill : skill.id;
            const name = isLegacySkill ? skill : skill.name;

            return (
              <div
                className="skill-admin-card"
                key={id ?? index}
              >
                <div className="skill-admin-info">
                  <div className="skill-admin-icon">
                    <Code2 size={18} />
                  </div>

                  <div>
                    <strong>{name}</strong>
                    <small>
                      {isLegacySkill
                        ? "Other • Beginner"
                        : `${skill.category || "Other"} • ${skill.level || "Beginner"}`}
                    </small>
                  </div>
                </div>

                <div className="skill-admin-actions">
                  <button
                    className="edit-button"
                    type="button"
                    onClick={() =>
                      startEdit(
                        isLegacySkill
                          ? {
                              id: skill,
                              name: skill,
                              category: "Other",
                              level: "Beginner",
                            }
                          : skill
                      )
                    }
                    disabled={loading}
                  >
                    <Pencil size={14} />
                    Edit
                  </button>

                  <button
                    className="delete-button"
                    type="button"
                    onClick={() => deleteSkill(id)}
                    disabled={loading}
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
