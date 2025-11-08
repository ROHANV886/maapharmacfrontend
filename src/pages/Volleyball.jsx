import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import productsdata from "../data/Volleyball.json";
import { useCart } from "../component/cartContext";
// ✅ Step 1: Import Link
import { Link } from "react-router-dom";
import ProductGrid from "../pages/ProductGrid";

const allProducts = productsdata;
const allCategories = [...new Set(allProducts.map((p) => p.category))];

// ✅ Step 2: Add makeSlug function
const makeSlug = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "";

const Volleyball = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const { addToCart } = useCart();
  const [showPopup, setShowPopup] = useState(false); // Renamed for consistency

  // ✅ New state for search
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddToCart = (item) => { // Renamed for consistency
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  // ✅ New Handler for Clear Filters
  const handleClearFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(2000);
    setSearchQuery("");
  };

  // ✅ Updated Filter logic
  const filteredProducts = allProducts
    .filter((i) => i.id >= 1 && i.id <= 32) // Keeps your original ID filter
    .filter((i) => {
      // 1. Search Filter
      const matchSearch =
        i.name && i.name.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category Filter
      const matchCategory =
        selectedCategory === "all" ||
        i.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
      
      // 3. Price Filter
      const numericPrice = parseFloat(String(i.price).replace(/[₹,]/g, "").trim());
      
      return matchSearch && matchCategory && numericPrice <= maxPrice;
    });

  return (
    <div className="abdominal-page">
      {/* ✅ Updated Success Popup (bottom-right) */}
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

      <div className="banner">
        <img
          src="https://www.tynorstore.com/media/catalog/category/Volleyball_1-3d61aaff.webp"
          alt="Banner"
          className="banner-img"
        />
      </div>

      <div className="container mt-4">
        <div className="row">
          {/* ✅ Updated Sidebar Filter */}
          <div className="col-md-3 filter-sidebar">
            <h5>Filter</h5>
            <hr />

            {/* ✅ New: Search by Name */}
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
              {/* ✅ New: Clear Filters Button */}
              <button
                className="btn btn-outline-secondary btn-sm mt-2"
                onClick={handleClearFilters}
              >
                Clear Filters
              </button>
            </div>

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

          {/* Products */}
          <div className="col-md-9">
                <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Volleyball;