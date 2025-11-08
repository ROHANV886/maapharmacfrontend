import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAuth } from "./AuthContext";
import { toast } from "react-toastify";
import { secureStorage } from "../component/secureStorage";

// ✅ Login Component
export default function Login({ setUser }) {
  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // ✅ API call for login
      const res = await axios.post(
        "https://rohanv99058.pythonanywhere.com/api/login/",
        JSON.stringify(formData),
        { headers: { "Content-Type": "application/json" } }
      );

      // ✅ Extract tokens
      const { access, refresh } = res.data;

      // ✅ Store in AuthContext
      loginUser(formData.username, access, refresh);

      // ✅ Store user securely
      const userData = { username: formData.username };
      secureStorage.set("user", userData);

      // ✅ Update state in parent
      setUser(userData);

      // ✅ Dispatch event to sync tabs
      window.dispatchEvent(new Event("storageChange"));

      toast.success(`Welcome back, ${formData.username}! 👋`);
      navigate("/");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.detail || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "90vh" }}
    >
      <div className="col-11 col-sm-10 col-md-8 col-lg-6 col-xl-4">
        <div className="card shadow-lg rounded-3 border-0">
          <div className="card-body p-4 p-md-5">
            <h2 className="h2 fw-bold text-center text-primary mb-4">Login</h2>

            {error && <p className="text-danger text-center mb-3">{error}</p>}

            <form onSubmit={handleSubmit} className="vstack gap-3">
              {/* Username */}
              <div className="form-floating">
                <input
                  type="text"
                  name="username"
                  id="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Username"
                  required
                  disabled={loading}
                />
                <label htmlFor="username">Username</label>
              </div>

              {/* Password */}
              <div className="form-floating">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Password"
                  required
                  disabled={loading}
                />
                <label htmlFor="password">Password</label>
              </div>

              <div className="text-end">
                <Link
                  to="/forgot-password"
                  className="text-decoration-none text-primary small fw-semibold"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 py-2 d-flex align-items-center justify-content-center"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Logging in...
                  </>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <p className="text-center mt-4 text-muted">
              Don’t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary fw-semibold text-decoration-none"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
