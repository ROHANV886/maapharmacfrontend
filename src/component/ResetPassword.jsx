// src/component/ResetPassword.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function ResetPassword() {
  const { uid, token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `https://rohanv99058.pythonanywhere.com/api/password-reset-confirm/${uid}/${token}/`,
        { password }
      );

      setMessage(res.data.message || "Password reset successfully ✅");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "90vh" }}
    >
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ maxWidth: "420px", width: "100%" }}>
        <h2 className="text-center mb-3 fw-bold text-primary">Reset Password</h2>
        <p className="text-center text-muted mb-4">
          Enter your new password below to reset your account.
        </p>

        <form onSubmit={handleSubmit} className="vstack gap-3">
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">New Password</label>
          </div>

          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label htmlFor="confirmPassword">Confirm Password</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100 py-2"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {message && (
          <p className="mt-3 text-success text-center fw-semibold">{message}</p>
        )}
        {error && (
          <p className="mt-3 text-danger text-center fw-semibold">{error}</p>
        )}
      </div>
    </div>
  );
}
