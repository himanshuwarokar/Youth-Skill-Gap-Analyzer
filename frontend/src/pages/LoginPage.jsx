import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";
import { useAuth } from "../context/AuthContext";
import TopNavbar from "../components/TopNavbar";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [resetForm, setResetForm] = useState({ email: "", newPassword: "", confirmPassword: "" });
  const [isRegister, setIsRegister] = useState(false);
  const [showForgot, setShowForgot] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [theme, setTheme] = useState(() => localStorage.getItem("ysg_theme") || "light");
  const [showPassword, setShowPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("ysg_theme", theme);
  }, [theme]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleResetChange = (event) => {
    const { name, value } = event.target;
    setResetForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      if (isRegister) {
        await api.request("/auth/register", {
          method: "POST",
          body: JSON.stringify({
            name: form.name,
            email: form.email,
            password: form.password,
          }),
        });
      }

      const data = await api.request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email: form.email, password: form.password }),
      });

      login(data);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setError("Password and confirm password do not match");
      return;
    }

    setLoading(true);
    try {
      const data = await api.request("/auth/forgot-password", {
        method: "POST",
        body: JSON.stringify({
          email: resetForm.email,
          newPassword: resetForm.newPassword,
        }),
      });
      setSuccess(data.message);
      setShowForgot(false);
      setResetForm({ email: "", newPassword: "", confirmPassword: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page auth-page">
      <TopNavbar
        theme={theme}
        onToggleTheme={() => setTheme((prev) => (prev === "light" ? "dark" : "light"))}
      />

      <form className="auth-form" onSubmit={showForgot ? handleForgotPassword : handleSubmit}>
        <h1>
          {showForgot ? "Forgot Password" : isRegister ? "Create Account" : "Login"}
        </h1>
        <p className="muted">Students can access and manage role-based learning roadmaps here.</p>

        {!showForgot && isRegister && (
          <label>
            Full Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
        )}

        {!showForgot && (
          <>
            <label>
              Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>

            <label>
              Password
              <div className="password-field">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  required
                />
                <button
                  className="eye-btn"
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "Hide" : "Eye"}
                </button>
              </div>
            </label>
          </>
        )}

        {showForgot && (
          <>
            <label>
              Registered Email
              <input
                name="email"
                type="email"
                value={resetForm.email}
                onChange={handleResetChange}
                required
              />
            </label>

            <label>
              New Password
              <div className="password-field">
                <input
                  name="newPassword"
                  type={showResetPassword ? "text" : "password"}
                  value={resetForm.newPassword}
                  onChange={handleResetChange}
                  required
                />
                <button
                  className="eye-btn"
                  type="button"
                  onClick={() => setShowResetPassword((prev) => !prev)}
                >
                  {showResetPassword ? "Hide" : "Eye"}
                </button>
              </div>
            </label>

            <label>
              Confirm New Password
              <div className="password-field">
                <input
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={resetForm.confirmPassword}
                  onChange={handleResetChange}
                  required
                />
                <button
                  className="eye-btn"
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                >
                  {showConfirmPassword ? "Hide" : "Eye"}
                </button>
              </div>
            </label>
          </>
        )}

        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}

        <button className="btn btn-primary" type="submit" disabled={loading}>
          {loading
            ? "Please wait..."
            : showForgot
              ? "Reset Password"
              : isRegister
                ? "Register & Login"
                : "Login"}
        </button>

        {!showForgot && (
          <button
            className="btn btn-secondary"
            type="button"
            onClick={() => setIsRegister((prev) => !prev)}
          >
            {isRegister ? "Already have an account? Login" : "New user? Register"}
          </button>
        )}

        <button className="text-btn" type="button" onClick={() => setShowForgot((prev) => !prev)}>
          {showForgot ? "Back to Login" : "Forgot password?"}
        </button>

        <Link to="/" className="text-link">Back to Home</Link>
      </form>
    </div>
  );
}
