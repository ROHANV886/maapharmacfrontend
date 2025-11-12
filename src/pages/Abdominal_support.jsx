import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useCart } from "../component/cartContext";
import ProductGrid from "../pages/ProductGrid";

// JSON imports
import allData from "../data/All.json";
import flamingoData from "../data/Allflamingo.json";

// ✅ Merge JSON safely
const allProducts = [
  ...(Array.isArray(allData) ? allData : Object.values(allData).flat()),
  ...(Array.isArray(flamingoData)
    ? flamingoData
    : Object.values(flamingoData).flat()),
];

// ✅ Unique categories
const allCategories = [
  ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
];

// ✅ Helper: make clean slugs
const makeSlug = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "";

const Abdominal_support = () => {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Filter logic (subCategory + category + price)
  const filteredProducts = allProducts
    .filter(
      (item) =>
        item.subCategory &&
        item.subCategory.toLowerCase().includes("abdominal")
    )
    .filter((item) => {
      const matchCategory =
        selectedCategory === "all" ||
        (item.category &&
          item.category.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim());

      const numericPrice = parseFloat(
        String(item.price || "0").replace(/[₹,]/g, "").trim()
      );
      const matchPrice = !isNaN(numericPrice) && numericPrice <= maxPrice;

      return matchCategory && matchPrice;
    });

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(2000);
  };

  return (
    <div className="abdominal-page">
      {/* ✅ Popup */}
      {showPopup && (
        <div
          className="alert alert-success position-fixed bottom-0 end-0 m-4 shadow"
          style={{
            zIndex: 1050,
            borderRadius: "10px",
            padding: "10px 20px",
          }}
        >
          ✅ Added to Cart Successfully!
        </div>
      )}

      {/* ✅ Banner */}
      <div className="banner">
        <img
          src="https://www.tynorstore.com/media/catalog/category/Shop_for_Abdominal-d55a73c1.webp"
          alt="Abdominal Banner"
          className="banner-img"
        />
      </div>

      <div className="container mt-4">
        <div className="row">
          
          {/* ✅ FIX 1: Filters (Small screen par poori width, medium par 3 columns) */}
          <div className="col-12 col-md-3 filter-sidebar">
            <h5>Filter</h5>
            <hr />

            <div className="filter-section">
              <label>Category</label>
              <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                {allCategories.map((cat) => (
                  <li key={cat}>
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      onChange={() => setSelectedCategory(cat)}
                      checked={selectedCategory === cat}
                    />{" "}
                    {cat}
                  </li>
                ))}
                <li>
                  <input
                    type="radio"
                    name="category"
                    value="all"
                    onChange={() => setSelectedCategory("all")}
                    checked={selectedCategory === "all"}
                  />{" "}
                  All
                </li>
              </ul>

              <button
                className="btn btn-outline-secondary btn-sm mt-2"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>

            {/* Price Filter */}
            <div className="filter-section mt-3">
              <label>Max Price: ₹{maxPrice}</label>
              <input
                type="range"
                className="form-range"
                min="500"
                max="5000"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* ✅ FIX 2: Product Grid (Small screen par poori width, medium par 9 columns) */}
          <div className="col-12 col-md-9">
                <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Abdominal_support;