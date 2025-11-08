import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../component/cartContext";

// ✅ Import all JSON data
import Aerobics from "../data/Aerobics.json";
import All from "../data/All.json";
import Athletics from "../data/Athletics.json";
import Badminton from "../data/Badminton.json";
import Cycling from "../data/cycling.json";
import Football from "../data/Football.json";
import Golf from "../data/Golf.json";
import GYM from "../data/GYM.json";
import Running from "../data/running.json";
import Tennis from "../data/Tennis.json";
import Volleyball from "../data/Volleyball.json";
import Walking from "../data/Walking.json";
import Yoga from "../data/yoga.json";
import flamingoData from "../data/Allflamingo.json";
import DailyRoutine from "../DailyRoutine/DailyRoutine.json"
import FreshArrivals from "../data/FreshArrival.json";

// ✅ Merge all JSONs
const allData = [
  ...Aerobics,
  ...All,
  ...Athletics,
  ...Badminton,
  ...Cycling,
  ...Football,
  ...Golf,
  ...GYM,
  ...Running,
  ...Tennis,
  ...Volleyball,
  ...Walking,
  ...Yoga,
  ...DailyRoutine,
  ...FreshArrivals,
  ...(Array.isArray(flamingoData)
    ? flamingoData
    : Object.values(flamingoData).flat()),
].map((item) => ({
  ...item,
  // ✅ Create a clean slug for URL matching
  slug: item.name
    ? item.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")
    : "",
}));

const ProductPage = () => {
  const { name } = useParams(); // now expects a name-based route
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!name) return;
    const found = allData.find(
      (item) => item.slug === decodeURIComponent(name.toLowerCase())
    );
    setProduct(found || null);
  }, [name]);

  if (!product) {
    return (
      <div className="text-center py-5">
        <h4>⚠️ Product not found!</h4>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ ...product, qty });
    alert(`${product.name} added to cart ✅`);
  };

  return (
    <div className="container my-5">
      <div className="row g-4">
        {/* LEFT: Product Image */}
        <div className="col-md-6 text-center">
          <img
            src={
              product.img ||
              "https://via.placeholder.com/400x400?text=No+Image+Available"
            }
            alt={product.name}
            className="img-fluid rounded shadow-sm"
            style={{ maxHeight: "420px", objectFit: "contain" }}
          />
        </div>

        {/* RIGHT: Product Info */}
        <div className="col-md-6">
          <h3 className="fw-bold mb-3">{product.name}</h3>

          <div className="mb-2">
            <span className="fs-4 text-success fw-bold">{product.price}</span>{" "}
            {product.oldPrice && (
              <del className="text-muted ms-2">{product.oldPrice}</del>
            )}
          </div>

          <p className="text-muted mb-3">
            Category: <b>{product.category}</b>
            {product.subCategory && (
              <>
                {" "}
                | Sub-category: <b>{product.subCategory}</b>
              </>
            )}
          </p>

          {/* Quantity */}
          <div className="mb-4">
            <b>Quantity:</b>
            <div className="d-flex align-items-center gap-2 mt-2">
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
              >
                -
              </button>
              <span className="fw-bold">{qty}</span>
              <button
                className="btn btn-outline-secondary"
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-4">
            <button
              className="btn btn-primary me-3 px-4"
              onClick={handleAddToCart}
            >
              🛒 Add to Cart
            </button>
            <button className="btn btn-outline-success px-4">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
