import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import productsdata from "../data/Aerobics.json";
import bannerImg from "../assets/Aerobic/Aerobics.png";
import { Link } from "react-router-dom";
import { useCart } from "../component/cartContext";
import ProductGrid from "../pages/ProductGrid";
// Data setup
const allProducts = productsdata;
const allCategories = [
  ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
];

// ✅ Helper: make clean slugs
const makeSlug = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "";

export default function Aerobics() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [searchQuery, setSearchQuery] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const filteredProducts = allProducts
    .filter((item) => item.id >= 1 && item.id <= 28)
    .filter((item) => {
      const matchSearch =
        item.name &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory =
        selectedCategory === "all" ||
        (item.category &&
          item.category.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim());

      const numericPrice = parseFloat(
        String(item.price || "0").replace(/[₹,]/g, "").trim()
      );
      const matchPrice = !isNaN(numericPrice) && numericPrice <= maxPrice;

      return matchSearch && matchCategory && matchPrice;
    });

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(2000);
    setSearchQuery("");
  };

  return (
    <div className="abdominal-page">
      {showPopup && (
        <div
          className="alert alert-success position-fixed bottom-0 end-0 m-4 shadow"
          style={{ zIndex: 1050, borderRadius: "10px", padding: "10px 20px" }}
        >
          ✅ Added to Cart Successfully!
        </div>
      )}

      <div className="banner">
        <img src={bannerImg} alt="Aerobics Banner" className="banner-img" />
      </div>

      <div className="container mt-4">
        <div className="row">
          {/* ✅ Sidebar Filter */}
          <div className="col-md-3 filter-sidebar">
            <h5>Filter</h5>
            <hr />

            {/* ✅ Search Filter */}
            <div className="filter-section">
              <label>Search by Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter product name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* ✅ Category Filter */}
            <div className="filter-section mt-3">
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

            {/* ✅ Price Filter */}
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

          {/* ✅ Product Grid */}
          <div className="col-md-9">
              <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
