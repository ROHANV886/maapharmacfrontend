import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../component/cartContext";
import { secureStorage } from "../component/secureStorage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReviewSection from "../pages/ReviewSection"; // ✅ Import Review Section

// ✅ Only Uttar Pradesh cities
const stateCityData = {
  "Uttar Pradesh": ["Noida", "Ghaziabad"],
};

// ✅ Helper function to safely parse price
const parsePrice = (price) => {
  if (!price) return 0;
  const numericString = String(price).replace(/[₹,]/g, "").trim();
  return parseFloat(numericString) || 0;
};

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [newOrderId, setNewOrderId] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    name: "",
    phone: "",
    email: "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setAddress({ ...address, state: selectedState, city: "" });
  };

  // Scroll to top when popups show
  useEffect(() => {
    if (showPopup || errorPopup) window.scrollTo(0, 0);
  }, [showPopup, errorPopup]);

  // ✅ Place Order Function
  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorPopup(false);

    const user = secureStorage.get("user");
    if (!user) {
      alert("Please login before placing your order!");
      window.location.href = "/login";
      setLoading(false);
      return;
    }

    if (
      !address.name ||
      !address.phone ||
      !address.email ||
      !address.street ||
      !address.city ||
      !address.state ||
      !address.pincode
    ) {
      setErrorPopup(true);
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(address.phone) || !/^\d{6}$/.test(address.pincode)) {
      alert("Please enter valid phone number and pincode.");
      setLoading(false);
      return;
    }

    // ✅ Order Data
    const orderData = {
      shippingAddress: address,
      orderItems: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity || 1,
        price: parsePrice(item.price),
      })),
      totalPrice: cartItems
        .reduce(
          (sum, item) => sum + parsePrice(item.price) * (item.quantity || 1),
          0
        )
        .toFixed(2),
      userEmail: address.email,
    };

    try {
      const token = localStorage.getItem("access");

      const response = await axios.post(
        "https://rohanv99058.pythonanywhere.com/api/place-order/",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const orderId = response.data.order_id;
      setNewOrderId(orderId);
      clearCart();
      setShowPopup(true);
    } catch (error) {
      console.error("Order failed:", error.response?.data || error.message);
      if (error.response && error.response.status === 401) {
        alert("Your session has expired. Please login again.");
        window.location.href = "/login";
      } else {
        alert("Order failed. Please check your details and try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSuccessClick = () => {
    setShowPopup(false);
    if (newOrderId) {
      navigate(`/track-order/${newOrderId}`, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">Checkout</h2>
      <div className="row">
        {/* 🧍‍♂️ Address Form */}
        <div className="col-md-7">
          <form className="card shadow p-4" onSubmit={handlePlaceOrder}>
            <h5 className="mb-3">Shipping Address</h5>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={address.name}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={address.phone}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={address.email}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-label">Street Address</label>
                <input
                  type="text"
                  name="street"
                  value={address.street}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="col-md-4">
                <label className="form-label">State</label>
                <select
                  name="state"
                  value={address.state}
                  onChange={handleStateChange}
                  className="form-select"
                  required
                >
                  <option value="">Select State</option>
                  <option value="Uttar Pradesh">Uttar Pradesh</option>
                </select>
              </div>
              <div className="col-md-6">
                <label className="form-label">City</label>
                <select
                  name="city"
                  value={address.city}
                  onChange={handleChange}
                  className="form-select"
                  required
                  disabled={!address.state}
                >
                  <option value="">
                    {address.state ? "Select City" : "Select State First"}
                  </option>
                  {address.state &&
                    stateCityData[address.state]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-md-2">
                <label className="form-label">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={address.pincode}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-end mt-4">
              <button
                type="submit"
                className="btn btn-success px-4"
                disabled={loading || cartItems.length === 0}
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                    ></span>
                    Placing Order...
                  </>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </form>

          {/* ✅ Add Review Section below Form */}
          <div className="mt-5">
            <ReviewSection />
          </div>
        </div>

        {/* 🛒 Cart Summary */}
        <div className="col-md-5 mt-4 mt-md-0">
          <div className="card shadow p-4">
            <h5 className="mb-3">Order Summary</h5>
            {cartItems.length === 0 ? (
              <p>No items in cart.</p>
            ) : (
              <>
                <ul className="list-group mb-3">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {item.name} × {item.quantity}
                      <span>
                        ₹{parsePrice(item.price) * (item.quantity || 1)}
                      </span>
                    </li>
                  ))}
                </ul>
                <h6 className="text-end">
                  Total: ₹
                  {cartItems
                    .reduce(
                      (sum, item) =>
                        sum +
                        parsePrice(item.price) * (item.quantity || 1),
                      0
                    )
                    .toFixed(2)}
                </h6>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Success Popup */}
      {showPopup && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">🎉 Order Successful!</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleSuccessClick}
                ></button>
              </div>
              <div className="modal-body">
                <p>Your order has been placed successfully!</p>
                <p className="text-muted">
                  You will be redirected to the tracking page now.
                </p>
                <button
                  className="btn btn-success mt-2"
                  onClick={handleSuccessClick}
                >
                  Track My Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⚠️ Error Popup */}
      {errorPopup && (
        <div
          className="modal fade show"
          style={{ display: "block", backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content text-center">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">⚠️ Missing Information</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setErrorPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Please fill all required address fields before placing your
                  order.
                </p>
                <button
                  className="btn btn-danger mt-2"
                  onClick={() => setErrorPopup(false)}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
