import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../component/cartContext";

const makeSlug = (str) =>
  str?.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "";

export default function ProductGrid({ products }) {
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false);

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  return (
    <>
      {showPopup && (
        <div
          className="alert alert-success position-fixed bottom-0 end-0 m-4 shadow"
          style={{
            zIndex: 1050,
            borderRadius: "10px",
            padding: "10px 20px",
          }}
        >
          ✅ Added Successfully!
        </div>
      )}

      <div className="row">
        {products.length > 0 ? (
          products.map((item) => (
            <div className="col-md-4 mb-4" key={item.id}>
              <div className="card product-card shadow-sm h-100 border-0">
                <Link
                  to={`/product/${encodeURIComponent(makeSlug(item.name))}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  className="flex-grow-1 d-flex flex-column"
                >
                  <img
                    src={item.img || "https://via.placeholder.com/200"}
                    alt={item.name}
                    className="card-img-top"
                    style={{
                      height: "220px",
                      objectFit: "contain",
                      cursor: "pointer",
                      padding: "10px",
                    }}
                  />

                  <div className="card-body text-center d-flex flex-column justify-content-between">
                    <h6 className="card-title">{item.name}</h6>
                    <p className="price mb-2">
                      {/* FIX: Yahaan se '₹' hata diya gaya hai */}
                      <strong>{item.price}</strong>{" "}
                      {item.oldPrice && (
                        <span className="text-muted text-decoration-line-through ms-1">
                          {/* FIX: Yahaan se bhi '₹' hata diya gaya hai */}
                          {item.oldPrice}
                        </span>
                      )}
                    </p>
                  </div>
                </Link>

                <div className="p-3 text-center">
                  <button
                    className="btn btn-dark btn-sm mt-auto"
                    onClick={() => handleAddToCart(item)}
                  >
                    Add to Cart
                  </button>
                </div>
                
              </div>
            </div>
          ))
        ) : (
          <p className="text-center mt-4">No products found.</p>
        )}
      </div>
    </>
  );
}