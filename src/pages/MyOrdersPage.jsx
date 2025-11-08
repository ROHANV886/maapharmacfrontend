import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // ✅ Link aur useNavigate import kiya
import 'bootstrap/dist/css/bootstrap.min.css';
import { secureStorage } from "../component/secureStorage"; // ✅ Secure storage check ke liye

// ✅ API base URL (Apne hisaab se update karein agar zaroori ho)
const API_BASE = "https://rohanv99058.pythonanywhere.com/api"; 

const MyOrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("access");
            const user = secureStorage.get("user");

            if (!token || !user) {
                // Agar user logged out hai, toh redirect karo
                navigate("/login");
                return;
            }

            try {
                // Logged-in user ke saare orders fetch karein
                const res = await axios.get(`${API_BASE}/orders/`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                // Orders ko reverse order mein set karein (latest order sabse upar)
                setOrders(res.data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)));
            } catch (err) {
                console.error("Failed to fetch order history:", err.response?.data || err.message);
                if (err.response && err.response.status === 401) {
                    setError("Session expired. Please log in again.");
                    // navigate("/login"); // Agar session expire ho toh
                } else {
                    setError("Failed to fetch order history.");
                }
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [navigate]);

    const formatPrice = (price) => `₹${parseFloat(price).toFixed(2)}`;

    if (loading) return <p className="text-center mt-5">Loading orders...</p>;
    if (error) return <p className="text-center mt-5 text-danger fw-bold">{error}</p>;
    
    // Agar koi order nahi hai
    if (orders.length === 0) return (
        <div className="container my-5 text-center" style={{ minHeight: "60vh" }}>
            <h4 className="fw-bold">You haven't placed any orders yet.</h4>
            <p className="text-muted">Start shopping now to see your tracking history! 🛒</p>
        </div>
    );

    return (
        <div className="container my-5" style={{ minHeight: "60vh" }}>
            <h2 className="text-center fw-bold mb-5">My Order History</h2>
            
            <div className="row">
                {orders.map(order => (
                    <div key={order.order_id} className="col-12 mb-4">
                        <div className="card shadow-sm border-0">
                            <div className="card-body d-md-flex justify-content-between align-items-center">
                                
                                {/* Order Info Section */}
                                <div>
                                    <h5 className="card-title fw-bold text-primary mb-1">
                                        Order ID: {order.order_id}
                                    </h5>
                                    <p className="card-text mb-1">
                                        Placed On: {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="card-text mb-2">
                                        <span className="fw-bold">Total:</span> {formatPrice(order.total_price)}
                                    </p>
                                </div>
                                
                                {/* Status and Button Section */}
                                <div className="text-md-end mt-3 mt-md-0">
                                    <p className="card-text mb-2">
                                        <span className="fw-bold">Status:</span> 
                                        <span className={`ms-2 badge ${
                                            order.status === 'Delivered' ? 'bg-success' : 
                                            order.status === 'Cancelled' ? 'bg-danger' : 
                                            'bg-primary'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </p>

                                    {/* Track Order Button */}
                                    <Link 
                                        to={`/track-order/${order.order_id}`} 
                                        className="btn btn-sm btn-dark"
                                    >
                                        View Status
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrdersPage;