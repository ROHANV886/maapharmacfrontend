import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import productsdata from "../data/GYM.json";
import { useCart } from "../component/cartContext";
import { Link } from "react-router-dom";
import ProductGrid from "../pages/ProductGrid";

// All products
const allProducts = productsdata;

// Unique category list
const allCategories = [...new Set(allProducts.map((product) => product.category))];

// Slugify function (for clean URL based on name)
const makeSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const GYM = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();
  
  // ✅ New state for search
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Updated Filtered products
  const filteredProducts = allProducts
    .filter((item) => item.id >= 1 && item.id <= 32) // Keeps your original ID filter
    .filter((item) => {
      // 1. Search Filter
      const matchSearch =
        item.name &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category Filter
      const matchCategory =
        selectedCategory === "all" ||
        item.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();

      // 3. Price Filter
      const numericPrice = parseFloat(String(item.price).replace(/[₹,]/g, "").trim());
      const matchPrice = numericPrice <= maxPrice;

      return matchSearch && matchCategory && matchPrice;
    });

  // Add to cart handler
  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  // ✅ New Handler for Clear Filters
  const handleClearFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(2000);
    setSearchQuery("");
  };

  return (
    <div className="abdominal-page">
      {/* ✅ Updated Popup (bottom-right) */}
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

      {/* Banner */}
      <div className="banner">
        <img
          src="https://www.tynorstore.com/media/catalog/category/Gym-5ec20345.webp"
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

            {/* Price Filter */}
            <div className="filter-section mt-3">
              <label>Max Price: ₹{maxPrice}</label>
              <input
                type="range"
                className="form-range"
                min="500"
                max="5000" // Kept your 5000 max
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>
          </div>

          {/* Product Grid */}
          <div className="col-md-9">
               <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GYM;