import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom"; // Link ko import kiya
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// Bootstrap CSS import (yeh file zaroori hai, waise aapne Homepage.jsx mein ki hui hai)
import "bootstrap/dist/css/bootstrap.min.css";

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://rohanv99058.pythonanywhere.com/api/register/",
        formData
      );
      toast.success(res.data.message || "User created successfully");

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      const errorMsg = err.response?.data?.error || "Signup failed";
      toast.error(errorMsg);
    }
  };

  return (
    // Fragment ka istemaal taaki page content aur ToastContainer dono return kar sakein
    <>
      <div className="container-fluid d-flex align-items-center justify-content-center bg-light" style={{ minHeight: "90vh" }}>
        {/* Signup form thoda chauda (wider) hota hai login se, isliye col-xl-5 */}
        <div className="col-11 col-sm-10 col-md-8 col-lg-7 col-xl-5">
          <div className="card shadow-lg rounded-3 border-0">
            <div className="card-body p-4 p-md-5">
              <h2 className="h2 fw-bold text-center text-primary mb-4">
                Sign Up
              </h2>

              <form onSubmit={handleSubmit} className="vstack gap-3">
                <div className="form-floating">
                  <input
                    name="username"
                    id="username"
                    placeholder="Username"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <label htmlFor="username">Username</label>
                </div>

                <div className="form-floating">
                  <input
                    name="email"
                    id="email"
                    placeholder="Email"
                    type="email"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <label htmlFor="email">Email</label>
                </div>

                {/* First Name aur Last Name ke liye Row */}
                <div className="row g-3">
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        name="first_name"
                        id="first_name"
                        placeholder="First Name"
                        onChange={handleChange}
                        className="form-control"
                      />
                      <label htmlFor="first_name">First Name</label>
                    </div>
                  </div>
                  <div className="col-sm-6">
                    <div className="form-floating">
                      <input
                        name="last_name"
                        id="last_name"
                        placeholder="Last Name"
                        onChange={handleChange}
                        className="form-control"
                      />
                      <label htmlFor="last_name">Last Name</label>
                    </div>
                  </div>
                </div>

                <div className="form-floating">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    onChange={handleChange}
                    className="form-control"
                    required
                  />
                  <label htmlFor="password">Password</label>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 py-2 fw-medium"
                >
                  Sign Up
                </button>
              </form>

              {/* Login ke liye link (UX ke liye achha hai) */}
              <p className="text-center mt-4 text-muted">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-primary fw-semibold text-decoration-none"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </>
  );
}
