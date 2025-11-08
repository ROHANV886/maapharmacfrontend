// src/pages/Cart.jsx
import React from "react";
import { useCart } from "../component/cartContext";
import { useAuth } from "../component/AuthContext";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Cart() {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!cartItems) return <p>Loading...</p>;

  // ✅ Fix NaN issue by cleaning price before calculation
  const total = cartItems.reduce((sum, item) => {
    const cleanPrice = parseFloat(String(item.price).replace(/[^0-9.]/g, "")) || 0;
    const quantity = parseInt(item.quantity) || 1;
    return sum + cleanPrice * quantity;
  }, 0);

  // ✅ Checkout handler with login check
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("🛒 Your cart is empty!");
      return;
    }

    if (!user) {
      // If not logged in, redirect to login first
      alert("Please log in to continue to checkout.");
      navigate("/login", { state: { from: "/checkout" } });
      return;
    }

    // ✅ If logged in, go to checkout
    navigate("/checkout");
  };

  return (
    <div className="container mt-5">
      <h3 className="fw-bold mb-4 text-center">🛍️ Your Cart</h3>

      {cartItems.length === 0 ? (
        <div className="text-center bg-light p-5 rounded shadow-sm">
          <h5>Your cart is empty 😢</h5>
        </div>
      ) : (
        <div className="row">
          {/* 🧾 Left: Cart Items */}
          <div className="col-md-8">
            <ul className="list-group mb-3 shadow-sm rounded">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
                >
                  <div className="d-flex align-items-center">
                    {item.img && (
                      <img
                        src={item.img}
                        alt={item.name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                          borderRadius: "8px",
                          marginRight: "15px",
                        }}
                      />
                    )}
                    <div>
                      <h6 className="mb-1">{item.name}</h6>
                      <p className="mb-0 text-muted">₹{item.price}</p>
                    </div>
                  </div>

                  {/* ➕➖ Quantity Control */}
                  <div className="d-flex align-items-center">
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        updateQuantity(item.id, Math.max((item.quantity || 1) - 1, 1))
                      }
                    >
                      −
                    </button>
                    <span
                      className="px-3 fw-bold"
                      style={{ minWidth: "30px", textAlign: "center" }}
                    >
                      {item.quantity || 1}
                    </span>
                    <button
                      className="btn btn-outline-secondary btn-sm"
                      onClick={() =>
                        updateQuantity(item.id, (item.quantity || 1) + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  {/* ❌ Remove */}
                  <button
                    className="btn btn-danger btn-sm ms-3"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 💰 Right: Summary */}
          <div className="col-md-4">
            <div className="card shadow-sm p-4">
              <h5 className="fw-bold mb-3 text-center">Order Summary</h5>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <strong>₹{total.toFixed(2)}</strong>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <strong>₹0</strong>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-3">
                <span className="fw-bold">Total</span>
                <span className="fw-bold text-success">₹{total.toFixed(2)}</span>
              </div>

              {/* 🧭 Redirect to Checkout */}
              <button className="btn btn-success w-100 mb-2" onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <button className="btn btn-outline-danger w-100" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
