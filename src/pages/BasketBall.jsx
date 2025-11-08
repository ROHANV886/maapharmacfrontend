import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import banner from "../assets/Basketball/Banner.webp";
import Header from "../component/Header";
import productsdata from "../product.json";
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

const BasketBall = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();
  
  // ✅ New state for search
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Updated Filter logic
  const filteredProducts = allProducts
    .filter((i) => i.id >= 1 && i.id <= 33) // Keeps your original ID filter
    .filter((i) => {
      // 1. Search Filter
      const matchSearch =
        i.name && i.name.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category Filter
      const matchCat =
        selectedCategory === "all" ||
        i.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
      
      // 3. Price Filter
      const numericPrice = parseFloat(
        String(i.price || "0").replace(/[₹,]/g, "").trim()
      );
      const matchPrice = !isNaN(numericPrice) && numericPrice <= maxPrice;

      return matchSearch && matchCat && matchPrice;
    });

  const handleAddToCart = (item) => {
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

  return (
    <>
   

      <div className="abdominal-page">
        {/* Banner */}
        <div className="banner">
          <img src={banner} alt="Basketball Banner" className="banner-img" />
        </div>

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

        {/* Main Section */}
        <div className="container mt-4">
          <div className="row">
            {/* ✅ Updated Sidebar Filters */}
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

              {/* Category Filter */}
              <div className="filter-section mt-3">
                <label>Category</label>
                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {allCategories.map((cat) => (
                    <li key={cat}>
                      <input
                        type="radio"
                        name="category"
                        value={cat}
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat)}
                      />{" "}
                      {cat}
                    </li>
                  ))}
                  <li>
                    <input
                      type="radio"
                      name="category"
                      value="all"
                      checked={selectedCategory === "all"}
                      onChange={() => setSelectedCategory("all")}
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
                  max="2000"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Products Section */}
            <div className="col-md-9">
                 <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasketBall;