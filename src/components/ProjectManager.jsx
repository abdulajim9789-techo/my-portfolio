
import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  ExternalLink,
  Code2,
  ImagePlus,
} from "lucide-react";

const emptyProject = {
  title: "",
  description: "",
  technologies: "",
  github: "",
  live: "",
  image: "",
};

export default function ProjectManager({
  projects = [],
  setPortfolio,
}) {
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyProject);
  const [loading, setLoading] = useState(false);

  const startAdd = () => {
    setEditingId("new");
    setForm({ ...emptyProject });
  };

  const startEdit = (project) => {
    setEditingId(project.id);

    setForm({
      title: project.title || "",
      description: project.description || "",
      technologies: Array.isArray(project.technologies)
        ? project.technologies.join(", ")
        : Array.isArray(project.tech)
          ? project.tech.join(", ")
          : "",
      github: project.github || "",
      live: project.live || "",
      image: project.image || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyProject });
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      event.target.value = "";
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("Please choose an image smaller than 2 MB.");
      event.target.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setForm((prev) => ({
        ...prev,
        image: reader.result,
      }));
    };

    reader.onerror = () => {
      alert("Could not read the image.");
    };

    reader.readAsDataURL(file);
    event.target.value = "";
  };

  const handleSave = () => {
    if (!form.title.trim()) {
      alert("Project title is required.");
      return;
    }

    if (!form.description.trim()) {
      alert("Project description is required.");
      return;
    }

    const technologies = form.technologies
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);

    const projectData = {
      id:
        editingId === "new"
          ? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
          : editingId,
      title: form.title.trim(),
      description: form.description.trim(),
      technologies,
      tech: technologies,
      github: form.github.trim(),
      live: form.live.trim(),
      image: form.image || "",
    };

    setLoading(true);

    try {
      setPortfolio((prev) => {
        const currentProjects = prev.projects || [];

        const updatedProjects =
          editingId === "new"
            ? [...currentProjects, projectData]
            : currentProjects.map((project) =>
                project.id === editingId
                  ? projectData
                  : project
              );

        return {
          ...prev,
          projects: updatedProjects,
        };
      });

      alert(
        editingId === "new"
          ? "Project added successfully!"
          : "Project updated successfully!"
      );

      cancelEdit();
    } catch (error) {
      console.error("Project save error:", error);
      alert("Could not save the project.");
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) return;

    setPortfolio((prev) => ({
      ...prev,
      projects: (prev.projects || []).filter(
        (project) => project.id !== id
      ),
    }));

    if (editingId === id) {
      cancelEdit();
    }

    alert("Project deleted successfully!");
  };

  return (
    <section className="admin-panel">
      <div className="crud-header">
        <div>
          <p className="admin-eyebrow">PROJECT MANAGEMENT</p>
          <h2>Projects</h2>
          <span>
            Add, edit and delete projects shown on your portfolio.
          </span>
        </div>

        {editingId === null && (
          <button
            className="primary-button"
            type="button"
            onClick={startAdd}
          >
            <Plus size={17} />
            Add Project
          </button>
        )}
      </div>

      {editingId !== null && (
        <div className="crud-form">
          <div className="crud-form-top">
            <h3>
              {editingId === "new"
                ? "Add New Project"
                : "Edit Project"}
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
            <div className="form-group full-width">
              <label>Project Image</label>

              <div className="project-image-upload">
                {form.image ? (
                  <div className="project-image-preview">
                    <img
                      src={form.image}
                      alt="Project preview"
                    />

                    <div className="project-image-actions">
                      <label className="secondary-button">
                        <ImagePlus size={16} />
                        Change Image
                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg,image/webp"
                          onChange={handleImageUpload}
                          hidden
                        />
                      </label>

                      <button
                        className="delete-button"
                        type="button"
                        onClick={() => handleChange("image", "")}
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <label className="project-upload-box">
                    <ImagePlus size={32} />
                    <strong>Upload Project Image</strong>
                    <span>PNG, JPG or JPEG · Maximum 2 MB</span>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
            </div>

            <div className="form-group">
              <label>Project Title</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  handleChange("title", e.target.value)
                }
                placeholder="Portfolio Management System"
              />
            </div>

            <div className="form-group">
              <label>Technologies</label>
              <input
                type="text"
                value={form.technologies}
                onChange={(e) =>
                  handleChange("technologies", e.target.value)
                }
                placeholder="React, JavaScript, CSS"
              />
              <small>Separate technologies with commas.</small>
            </div>

            <div className="form-group">
              <label>GitHub URL</label>
              <input
                type="url"
                value={form.github}
                onChange={(e) =>
                  handleChange("github", e.target.value)
                }
                placeholder="https://github.com/username/project"
              />
            </div>

            <div className="form-group">
              <label>Live Demo URL</label>
              <input
                type="url"
                value={form.live}
                onChange={(e) =>
                  handleChange("live", e.target.value)
                }
                placeholder="https://your-project.vercel.app"
              />
            </div>

            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                rows="6"
                value={form.description}
                onChange={(e) =>
                  handleChange("description", e.target.value)
                }
                placeholder="Describe your project..."
              />
            </div>
          </div>

          <div className="crud-actions">
            <button
              className="primary-button"
              type="button"
              onClick={handleSave}
              disabled={loading}
            >
              <Save size={17} />
              {loading ? "Saving..." : "Save Project"}
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
        {projects.length === 0 ? (
          <div className="empty-state">
            <p>No projects yet.</p>
            <button
              className="primary-button"
              type="button"
              onClick={startAdd}
            >
              <Plus size={17} />
              Add Your First Project
            </button>
          </div>
        ) : (
          projects.map((project) => (
            <article
              className="crud-item"
              key={project.id}
            >
              {project.image && (
                <div className="crud-item-image">
                  <img
                    src={project.image}
                    alt={project.title}
                  />
                </div>
              )}

              <div className="crud-item-content">
                <div className="crud-item-title">
                  <h3>{project.title}</h3>

                  <div className="crud-tags">
                    {(
                      project.technologies ||
                      project.tech ||
                      []
                    ).map((tech, index) => (
                      <span key={`${tech}-${index}`}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <p>{project.description}</p>

                <div className="crud-links">
                  {project.github && project.github !== "#" && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Code2 size={14} />
                      GitHub
                    </a>
                  )}

                  {project.live && project.live !== "#" && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={14} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>

              <div className="crud-item-actions">
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => startEdit(project)}
                  disabled={loading}
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() => deleteProject(project.id)}
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
