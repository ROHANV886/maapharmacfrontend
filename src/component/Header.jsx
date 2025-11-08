import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useCart } from "../component/cartContext";
import { secureStorage } from "../component/secureStorage";
import logo from "../assets/maaphy.jpeg";

import aerobics from "../data/Aerobics.json";
import yoga from "../data/yoga.json";

// Merge and remove duplicates
const allDataRaw = [...aerobics, ...yoga];
const uniqueDataMap = new Map();
allDataRaw.forEach((item) => {
  if (item && item.name) {
    const uniqueKey = item.name.toLowerCase().trim();
    if (!uniqueDataMap.has(uniqueKey)) {
      uniqueDataMap.set(uniqueKey, item);
    }
  }
});
const allData = Array.from(uniqueDataMap.values());

export default function Header() {
  const { cartItems = [] } = useCart();
  const totalItems = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 1),
    0
  );

  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch user from secureStorage
  useEffect(() => {
    const fetchUser = () => {
      try {
        const storedUser = secureStorage.get("user");
        setUser(storedUser || null);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
    window.addEventListener("storage", fetchUser);
    window.addEventListener("storageChange", fetchUser);
    return () => {
      window.removeEventListener("storage", fetchUser);
      window.removeEventListener("storageChange", fetchUser);
    };
  }, []);

  // ✅ Search Suggestions
  useEffect(() => {
    const term = searchQuery.toLowerCase().trim();
    if (term.length < 2) return setSuggestions([]);
    const results = allData
      .filter(
        (item) =>
          item.name?.toLowerCase().includes(term) ||
          item.category?.toLowerCase().includes(term) ||
          item.subCategory?.toLowerCase().includes(term)
      )
      .slice(0, 10);
    setSuggestions(results);
  }, [searchQuery]);

  // ✅ Search Submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSuggestions([]);
      setSearchQuery("");
    }
  };

  const handleSuggestionClick = (item) => {
    navigate(`/search?q=${encodeURIComponent(item.name)}`);
    setSuggestions([]);
    setSearchQuery("");
  };

  // ✅ Logout
  const handleLogout = () => {
    secureStorage.remove("user");
    localStorage.removeItem("access");
    setUser(null);
    window.dispatchEvent(new Event("storageChange"));
    navigate("/login");
  };

  return (
    <>
      {/* --- Main Navbar --- */}
      <nav className="navbar navbar-light bg-light py-3 sticky-top shadow-sm border-bottom">
        <div className="container-fluid d-flex flex-wrap align-items-center">
          {/* Logo Section */}
          <Link
            className="navbar-brand d-flex align-items-center me-3"
            to="/"
            style={{ flexShrink: 0 }}
          >
            <img
              src={logo}
              alt="Maa Pharmacy Logo"
              style={{ height: "90px", width: "auto", marginRight: "8px" }}
            />
            <span className="fw-bold fs-5 text-dark d-none d-sm-block">
              Maa Pharmacy Care
            </span>
          </Link>

          {/* Desktop Icons (Right Side) */}
          <div className="d-flex align-items-center ms-lg-auto text-dark d-none d-lg-flex order-lg-3">
            {user && (
              <Link
                to="/my-orders"
                className="text-dark text-decoration-none me-3"
                title="My Orders"
              >
                <i className="bi bi-box-seam-fill fs-5"></i>
              </Link>
            )}

            {user ? (
              <div className="d-flex align-items-center me-3">
                <span className="me-3 text-capitalize fw-semibold text-dark">
                  👋 Hi, {user.username || user.name || "User"}
                </span>
                <button
                  className="btn btn-outline-dark btn-sm"
                  onClick={handleLogout}
                  title="Logout"
                >
                  <i className="bi bi-box-arrow-right me-1"></i> Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="text-dark text-decoration-none me-3"
                title="Login"
              >
                <i className="bi bi-person fs-5"></i>
              </Link>
            )}

            <Link
              to="/wishlist"
              className="text-dark text-decoration-none me-3"
              title="Wishlist"
            >
              <i className="bi bi-heart fs-5"></i>
            </Link>

            <div className="position-relative me-2" title="Cart">
              <Link
                to="/cart"
                className="text-dark text-decoration-none position-relative"
              >
                <i className="bi bi-cart fs-5"></i>
                {totalItems > 0 && (
                  <span
                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                    style={{ fontSize: "0.7rem" }}
                  >
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
                
          {/* Search Bar */}
          
          <div
            className="w-100 mt-1 mt-sm-0 mt-lg-0 order-3 order-lg-2 ms-auto"
            style={{
              position: "relative",
              maxWidth: "500px",
              flexGrow: 1,
              width: "auto",
              flexBasis: "150px",
              marginRight: "1rem",
            }}
          >
            <form className="d-flex align-items-center" onSubmit={handleSearchSubmit}>
              <input
                className="form-control"
                type="search"
                placeholder="Enter Keyword or Item"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onBlur={() => setTimeout(() => setSuggestions([]), 200)}
                autoComplete="off"
              />
            </form>

            {suggestions.length > 0 && (
              <ul
                className="list-group shadow"
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  zIndex: 2000,
                  maxHeight: "400px",
                  overflowY: "auto",
                  marginTop: "5px",
                }}
              >
                {suggestions.map((item, index) => (
                  <li
                    key={`${item.id}-${index}`}
                    className="list-group-item list-group-item-action d-flex align-items-center"
                    style={{ cursor: "pointer" }}
                    onMouseDown={() => handleSuggestionClick(item)}
                  >
                    <img
                      src={item.img || "https://via.placeholder.com/50"}
                      alt=""
                      style={{
                        width: "40px",
                        height: "40px",
                        objectFit: "contain",
                        marginRight: "10px",
                      }}
                    />
                    <div>
                      <div className="fw-bold">{item.name}</div>
                      <small className="text-muted">{item.category}</small>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* --- Mobile Bottom Navigation --- */}
      <nav
        className="navbar fixed-bottom navbar-light bg-light d-lg-none shadow-lg border-top"
        style={{ zIndex: 1050, height: "60px" }}
      >
        <div className="container-fluid d-flex justify-content-around align-items-center px-0">
          <Link
            to="/"
            className="text-decoration-none text-dark d-flex flex-column align-items-center py-1"
            style={{ fontSize: "0.7rem" }}
          >
            <i className="bi bi-house-fill fs-5 mb-1"></i>Home
          </Link>

          {user && (
            <Link
              to="/my-orders"
              className="text-decoration-none text-dark d-flex flex-column align-items-center py-1"
              style={{ fontSize: "0.7rem" }}
            >
              <i className="bi bi-box-seam-fill fs-5 mb-1"></i>Orders
            </Link>
          )}

          {user ? (
            <Link
              to="/account"
              className="text-decoration-none text-dark d-flex flex-column align-items-center py-1"
              style={{ fontSize: "0.7rem" }}
            >
              <i className="bi bi-person-circle fs-5 mb-1"></i>Account
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-decoration-none text-dark d-flex flex-column align-items-center py-1"
              style={{ fontSize: "0.7rem" }}
            >
              <i className="bi bi-person fs-5 mb-1"></i>Login
            </Link>
          )}

          <Link
            to="/wishlist"
            className="text-decoration-none text-dark d-flex flex-column align-items-center py-1"
            style={{ fontSize: "0.7rem" }}
          >
            <i className="bi bi-heart fs-5 mb-1"></i>Wishlist
          </Link>

          <div
            className="position-relative d-flex flex-column align-items-center py-1"
            style={{ fontSize: "0.7rem" }}
          >
            <Link
              to="/cart"
              className="text-decoration-none text-dark position-relative d-flex flex-column align-items-center"
            >
              <i className="bi bi-cart fs-5 mb-1"></i>Cart
              {totalItems > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.7rem" }}
                >
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}
