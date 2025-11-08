import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap-icons/font/bootstrap-icons.css'; 

// ✅ API base URL: PythonAnywhere domain use karein
const API_BASE = "https://rohanv99058.pythonanywhere.com/api";

const TrackOrderPage = () => {
    const { orderId } = useParams(); 
    const [orderDetail, setOrderDetail] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const steps = ["Order Confirmed", "Packed", "Dispatched", "Delivered"];
    const statusMessages = {
        "Order Confirmed": "Your order has been successfully confirmed and is being processed.",
        "Packed": "Your item has been packed and is ready for shipment.",
        "Dispatched": "Your item has been shipped and is on its way.",
        "Delivered": "Your item has been delivered successfully.",
    };
    
    useEffect(() => {
        const fetchStatus = async () => {
            if (!orderId) { setError("No Order ID provided."); setLoading(false); return; }

            try {
                const token = localStorage.getItem("access");
                if (!token) { setError("Please log in to track your order."); return; }
                
                const res = await axios.get(
                    `${API_BASE}/orders/${orderId}/`, 
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setOrderDetail(res.data); 
            } catch (err) {
                setError(`Error: ${err.response ? err.response.status : 'Network Error'}. Order not found or session expired.`);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, [orderId]);

    const getStepIndex = (status) => steps.indexOf(status);

    if (loading) return <p className="text-center mt-5">Loading order details...</p>;
    if (error) return <p className="text-center mt-5 text-danger fw-bold">{error}</p>;
    if (!orderDetail) return <p className="text-center mt-5">Order details not available.</p>;

    const currentStatus = orderDetail.status;
    const activeIndex = getStepIndex(currentStatus);
    
    const eventDate = orderDetail.created_at ? new Date(orderDetail.created_at) : new Date();
    const formattedDate = eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
    const formattedTime = eventDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });

    return (
        <div className="container py-5" style={{ minHeight: "60vh", backgroundColor: '#f8f9fa' }}>
            <h2 className="text-center fw-bold mb-4">Order Tracking</h2>
            <div className="card shadow-sm mx-auto" style={{ maxWidth: '900px', backgroundColor: 'white' }}>
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        {steps.map((step, index) => ( 
                            <div key={step} className="text-center position-relative flex-fill">
                                <span className={`text-nowrap ${index <= activeIndex ? 'fw-bold text-dark' : 'text-muted'}`}>
                                    {step === "Dispatched" ? "Shipped" : step}
                                </span>
                            </div>
                        ))}
                    </div>

                    <div className="position-relative mb-4" style={{ height: '20px' }}>
                        <div className="position-absolute bg-secondary opacity-25" style={{ height: '4px', width: '100%', top: '8px', borderRadius: '2px' }}></div>
                        
                        <div className="position-absolute bg-success" style={{ height: '4px', width: `${(activeIndex / (steps.length - 1)) * 100}%`, top: '8px', borderRadius: '2px', transition: 'width 0.8s ease-in-out'}}></div>

                        {steps.map((step, index) => {
                            const isStepActive = index <= activeIndex;
                            return (
                                <div key={step} className="position-absolute" style={{ left: `${(index / (steps.length - 1)) * 100}%`, transform: 'translateX(-50%)', top: '0' }}>
                                    <div className={`rounded-circle d-flex align-items-center justify-content-center`}
                                        style={{ width: '20px', height: '20px', backgroundColor: isStepActive ? '#28a745' : '#ced4da', border: `2px solid ${isStepActive ? '#28a745' : '#adb5bd'}`, transition: 'all 0.3s'}}>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-4 p-3 bg-light rounded">
                        <h5 className="mb-2 text-dark">
                            {statusMessages[currentStatus] || `Current Status: ${currentStatus}`}
                        </h5>
                        <p className="text-muted small mb-0">
                            {formattedDate}, {formattedTime} &nbsp;&nbsp;&nbsp; Current Status: {currentStatus}
                        </p>
                    </div>
                </div>
            </div>
            <p className="text-center mt-4 text-muted small">
                Order ID: <strong>{orderDetail.order_id}</strong>
            </p>
        </div>
    );
};

export default TrackOrderPage;