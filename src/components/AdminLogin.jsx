import { useState } from "react";
import "./AdminLogin.css";
import {
  LockKeyhole,
  UserRound,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export default function AdminLogin({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Demo credentials for the current frontend-only version.
    // These will be replaced by backend authentication later.
    const DEMO_USERNAME = "admin";
    const DEMO_PASSWORD = "admin123";

    if (
      username.trim() === DEMO_USERNAME &&
      password === DEMO_PASSWORD
    ) {
      sessionStorage.setItem(
        "adminAuthenticated",
        "true"
      );

      onLogin();
      return;
    }

    setError("Invalid username or password.");
  };

  return (
    <div className="admin-login-page">

      <div className="admin-login-glow admin-login-glow-one" />
      <div className="admin-login-glow admin-login-glow-two" />

      <div className="admin-login-card">

        <div className="admin-login-brand">
          <div className="admin-login-logo">
            <span>&lt;</span>
            Admin
            <span>/&gt;</span>
          </div>

          <div className="admin-login-badge">
            <ShieldCheck size={15} />
            Protected Area
          </div>
        </div>

        <div className="admin-login-heading">
          <p>PORTFOLIO MANAGEMENT</p>

          <h1>Welcome back.</h1>

          <span>
            Sign in to manage your portfolio.
          </span>
        </div>

        <form
          className="admin-login-form"
          onSubmit={handleSubmit}
        >

          <div className="login-field">
            <label>Username</label>

            <div className="login-input-wrapper">
              <UserRound size={18} />

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="login-field">
            <label>Password</label>

            <div className="login-input-wrapper">
              <LockKeyhole size={18} />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            className="login-submit"
            type="submit"
          >
            Sign In
            <ArrowRight size={18} />
          </button>

        </form>

        <div className="login-demo-note">
          <span>Demo login</span>
          <code>admin / admin123</code>
        </div>

        <button
          className="login-back"
          type="button"
          onClick={() =>
            (window.location.href = "/")
          }
        >
          ← Back to Portfolio
        </button>

      </div>
    </div>
  );
}