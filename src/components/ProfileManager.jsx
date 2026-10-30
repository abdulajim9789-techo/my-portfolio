
import { useEffect, useState } from "react";
import {
  Save,
  ImagePlus,
  Trash2,
} from "lucide-react";

export default function ProfileManager({
  portfolio,
  setPortfolio,
}) {
  const existingProfile = portfolio?.profile || {};

  const [form, setForm] = useState({
    name: existingProfile.name || "",
    role: existingProfile.role || "",
    college: existingProfile.college || "",
    location: existingProfile.location || "",
    email: existingProfile.email || "",
    github: existingProfile.github || "",
    linkedin: existingProfile.linkedin || "",
    about: existingProfile.about || existingProfile.bio || "",
    image: existingProfile.image || "",
  });

  const [loading, setLoading] = useState(false);

  // Keep the form synchronized with saved profile data.
  useEffect(() => {
    const profile = portfolio?.profile || {};

    setForm({
      name: profile.name || "",
      role: profile.role || "",
      college: profile.college || "",
      location: profile.location || "",
      email: profile.email || "",
      github: profile.github || "",
      linkedin: profile.linkedin || "",
      about: profile.about || profile.bio || "",
      image: profile.image || "",
    });
  }, [portfolio?.profile]);

  const updateField = (field, value) => {
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

  const removeImage = () => {
    setForm((prev) => ({
      ...prev,
      image: "",
    }));
  };

  const saveProfile = () => {
    if (!form.name.trim()) {
      alert("Name is required.");
      return;
    }

    if (!form.role.trim()) {
      alert("Role is required.");
      return;
    }

    try {
      setLoading(true);

      const profileData = {
        ...form,
        name: form.name.trim(),
        role: form.role.trim(),
        college: form.college.trim(),
        location: form.location.trim(),
        email: form.email.trim(),
        github: form.github.trim(),
        linkedin: form.linkedin.trim(),
        about: form.about.trim(),
        image: form.image || "",
      };

      // Update React state. App.jsx saves it to localStorage.
      setPortfolio((prev) => ({
        ...prev,
        profile: profileData,
      }));

      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Profile save error:", error);
      alert("Could not save the profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-panel">
      <div className="crud-header">
        <div>
          <p className="admin-eyebrow">PROFILE MANAGEMENT</p>
          <h2>Profile</h2>
          <span>
            Manage your personal information and profile image.
          </span>
        </div>
      </div>

      <div className="crud-form">
        <div className="profile-form">
          <div className="form-group full-width">
            <label>Profile Image</label>

            <div className="profile-image-upload">
              {form.image ? (
                <div className="profile-image-preview">
                  <img src={form.image} alt="Profile preview" />

                  <div className="profile-image-actions">
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
                      onClick={removeImage}
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  </div>
                </div>
              ) : (
                <label className="profile-upload-box">
                  <ImagePlus size={32} />
                  <strong>Upload Profile Image</strong>
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
            <label>Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your Name"
            />
          </div>

          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              value={form.role}
              onChange={(e) => updateField("role", e.target.value)}
              placeholder="B.Tech IT Student & Frontend Developer"
            />
          </div>

          <div className="form-group">
            <label>College</label>
            <input
              type="text"
              value={form.college}
              onChange={(e) => updateField("college", e.target.value)}
              placeholder="Arunai Engineering College"
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={form.location}
              onChange={(e) => updateField("location", e.target.value)}
              placeholder="Tamil Nadu, India"
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="your.email@gmail.com"
            />
          </div>

          <div className="form-group">
            <label>GitHub</label>
            <input
              type="url"
              value={form.github}
              onChange={(e) => updateField("github", e.target.value)}
              placeholder="https://github.com/username"
            />
          </div>

          <div className="form-group">
            <label>LinkedIn</label>
            <input
              type="url"
              value={form.linkedin}
              onChange={(e) => updateField("linkedin", e.target.value)}
              placeholder="https://linkedin.com/in/username"
            />
          </div>

          <div className="form-group full-width">
            <label>About</label>
            <textarea
              rows="6"
              value={form.about}
              onChange={(e) => updateField("about", e.target.value)}
              placeholder="Write a short professional introduction about yourself..."
            />
          </div>
        </div>

        <div className="crud-actions">
          <button
            className="primary-button"
            type="button"
            onClick={saveProfile}
            disabled={loading}
          >
            <Save size={17} />
            {loading ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </section>
  );
}
