import { useState } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Save,
  X,
  Award,
  ExternalLink,
  ImagePlus,
} from "lucide-react";

export default function CertificationManager({
  certifications = [],
  setPortfolio,
}) {
  const emptyCertification = {
    title: "",
    issuer: "",
    year: "",
    credentialUrl: "",
    image: "",
  };

  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ ...emptyCertification });
  const [loading, setLoading] = useState(false);

  // Support both new localStorage IDs and old MongoDB IDs.
  const getId = (certification) =>
    certification.id ?? certification._id;

  const startAdd = () => {
    setEditingId("new");
    setForm({ ...emptyCertification });
  };

  const startEdit = (certification) => {
    setEditingId(getId(certification));

    setForm({
      title: certification.title || "",
      issuer: certification.issuer || "",
      year: certification.year || "",
      credentialUrl: certification.credentialUrl || "",
      image: certification.image || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ ...emptyCertification });
  };

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Upload certificate image as Base64.
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
      if (typeof reader.result !== "string") {
        alert("Could not read the image.");
        return;
      }

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

  const removeImage = () => {
    setForm((prev) => ({
      ...prev,
      image: "",
    }));
  };

  // Add or update certification without backend API calls.
  const saveCertification = () => {
    if (!form.title.trim()) {
      alert("Certification title is required.");
      return;
    }

    if (!form.issuer.trim()) {
      alert("Issuer name is required.");
      return;
    }

    setLoading(true);

    try {
      const isNew = editingId === "new";

      const certificationData = {
        id: isNew
          ? `certification-${Date.now()}`
          : editingId,
        title: form.title.trim(),
        issuer: form.issuer.trim(),
        year: form.year.trim(),
        credentialUrl: form.credentialUrl.trim(),
        image: form.image || "",
      };

      setPortfolio((prev) => {
        const currentCertifications =
          prev.certifications || [];

        const updatedCertifications = isNew
          ? [...currentCertifications, certificationData]
          : currentCertifications.map((certification) =>
              getId(certification) === editingId
                ? certificationData
                : certification
            );

        return {
          ...prev,
          certifications: updatedCertifications,
        };
      });

      cancelEdit();

      alert(
        isNew
          ? "Certification added successfully!"
          : "Certification updated successfully!"
      );
    } catch (error) {
      console.error("Certification save error:", error);
      alert("Unable to save certification.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCertification = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this certification?"
    );

    if (!confirmed) return;

    setPortfolio((prev) => ({
      ...prev,
      certifications: (prev.certifications || []).filter(
        (certification) => getId(certification) !== id
      ),
    }));

    if (editingId === id) {
      cancelEdit();
    }

    alert("Certification deleted successfully!");
  };

  return (
    <section className="admin-panel">
      {/* HEADER */}
      <div className="crud-header">
        <div>
          <p className="admin-eyebrow">
            CERTIFICATION MANAGEMENT
          </p>

          <h2>Certifications</h2>

          <span>
            Add certificate details, upload images and
            manage verification links.
          </span>
        </div>

        {editingId === null && (
          <button
            className="primary-button"
            type="button"
            onClick={startAdd}
          >
            <Plus size={17} />
            Add Certification
          </button>
        )}
      </div>

      {/* FORM */}
      {editingId !== null && (
        <div className="crud-form">
          <div className="crud-form-top">
            <h3>
              {editingId === "new"
                ? "Add Certification"
                : "Edit Certification"}
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
              <label>Certification Title</label>

              <input
                type="text"
                value={form.title}
                onChange={(e) =>
                  updateField("title", e.target.value)
                }
                placeholder="Java Programming Certificate"
              />
            </div>

            <div className="form-group">
              <label>Issuer / Organization</label>

              <input
                type="text"
                value={form.issuer}
                onChange={(e) =>
                  updateField("issuer", e.target.value)
                }
                placeholder="HackerRank"
              />
            </div>

            <div className="form-group">
              <label>Year</label>

              <input
                type="text"
                value={form.year}
                onChange={(e) =>
                  updateField("year", e.target.value)
                }
                placeholder="2026"
              />
            </div>

            <div className="form-group">
              <label>Credential URL (Optional)</label>

              <input
                type="url"
                value={form.credentialUrl}
                onChange={(e) =>
                  updateField("credentialUrl", e.target.value)
                }
                placeholder="https://..."
              />
            </div>

            {/* CERTIFICATE IMAGE */}
            <div className="form-group full-width">
              <label>Certificate Image</label>

              <div className="certificate-upload">
                {!form.image ? (
                  <label className="upload-box">
                    <ImagePlus size={28} />

                    <strong>
                      Upload Certificate Image
                    </strong>

                    <span>
                      PNG, JPG or JPEG · Maximum 2 MB
                    </span>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/jpg"
                      onChange={handleImageUpload}
                    />
                  </label>
                ) : (
                  <div className="certificate-preview">
                    <img
                      src={form.image}
                      alt="Certificate preview"
                    />

                    <div className="certificate-preview-actions">
                      <label className="secondary-button">
                        <ImagePlus size={16} />
                        Change Image

                        <input
                          type="file"
                          accept="image/png,image/jpeg,image/jpg"
                          onChange={handleImageUpload}
                          hidden
                        />
                      </label>

                      <button
                        className="delete-button"
                        type="button"
                        onClick={removeImage}
                      >
                        <Trash2 size={15} />
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* FORM ACTIONS */}
          <div className="crud-actions">
            <button
              className="primary-button"
              type="button"
              onClick={saveCertification}
              disabled={loading}
            >
              <Save size={17} />
              {loading ? "Saving..." : "Save Certification"}
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

      {/* CERTIFICATION LIST */}
      <div className="crud-list">
        {certifications.length === 0 ? (
          <div className="empty-state">
            <Award size={32} />

            <p>No certifications yet.</p>

            <button
              className="primary-button"
              type="button"
              onClick={startAdd}
            >
              <Plus size={17} />
              Add Your First Certification
            </button>
          </div>
        ) : (
          certifications.map((certification, index) => (
            <article
              className="crud-item"
              key={getId(certification) ?? index}
            >
              <div className="crud-item-content">
                {certification.image && (
                  <div className="cert-admin-thumbnail">
                    <img
                      src={certification.image}
                      alt={certification.title}
                    />
                  </div>
                )}

                <div className="crud-item-title">
                  <div className="skill-admin-icon">
                    <Award size={18} />
                  </div>

                  <h3>{certification.title}</h3>

                  {certification.year && (
                    <div className="crud-tags">
                      <span>{certification.year}</span>
                    </div>
                  )}
                </div>

                <p>{certification.issuer}</p>

                {certification.credentialUrl && (
                  <div className="crud-links">
                    <a
                      href={certification.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink size={14} />
                      View Credential
                    </a>
                  </div>
                )}
              </div>

              <div className="crud-item-actions">
                <button
                  className="edit-button"
                  type="button"
                  onClick={() => startEdit(certification)}
                  disabled={loading}
                >
                  <Pencil size={15} />
                  Edit
                </button>

                <button
                  className="delete-button"
                  type="button"
                  onClick={() =>
                    deleteCertification(getId(certification))
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