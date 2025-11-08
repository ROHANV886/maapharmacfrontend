// src/component/ForgetPassword.jsx
import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axios.post(
        "https://rohanv99058.pythonanywhere.com/api/password-reset/",
        { email }
      );
      setMessage(res.data.message || "Password reset link sent to your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong. Try again!");
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
            <h2 className="h3 fw-bold text-center text-primary mb-4">
              Forgot Password
            </h2>
            <p className="text-muted text-center mb-4">
              Enter your registered email address, and we’ll send you a reset link.
            </p>

            <form onSubmit={handleSubmit} className="vstack gap-3">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label htmlFor="email">Email address</label>
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-lg w-100 py-2"
              >
                Send Reset Link
              </button>
            </form>

            {message && (
              <p className="mt-3 text-success text-center fw-semibold">
                {message}
              </p>
            )}
            {error && (
              <p className="mt-3 text-danger text-center fw-semibold">
                {error}
              </p>
            )}

            <p className="text-center mt-4 text-muted">
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-primary fw-semibold text-decoration-none"
              >
                Back to Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
