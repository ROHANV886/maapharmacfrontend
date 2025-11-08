import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import productsdata from "../product.json";
import image from "../assets/cricket/Cricket_1.png";
import { useCart } from "../component/cartContext";
// ✅ Step 1: Import Link
import { Link } from "react-router-dom";
import ProductGrid from "../pages/ProductGrid";
const allProducts = Array.isArray(productsdata)
  ? productsdata
  : Object.values(productsdata).flat();

const allCategories = [
  ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
];

// ✅ Step 2: Add makeSlug function
const makeSlug = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "";

const Cricket = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [showPopup, setShowPopup] = useState(false);
  // ❌ Step 3: Removed modal state (setViewItem)
  const { addToCart } = useCart();
  
  // ✅ New state for search
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Updated Filtering logic
  const filteredProducts = allProducts
    .filter((i) => i.id >= 34 && i.id <= 70) // Keeps your original ID filter
    .filter((i) => {
      // 1. Search Filter
      const matchSearch =
        i.name && i.name.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category Filter
      const matchCat =
        selectedCategory === "all" ||
        (i.category &&
          i.category.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim());
      
      // 3. Price Filter
      const matchPrice =
        parseFloat(String(i.price || "0").replace(/[₹,]/g, "")) <= maxPrice;
      
      return matchSearch && matchCat && matchPrice;
    });

  // Add to Cart + Popup
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
    <div className="abdominal-page">
      {/* Banner */}
      <div className="banner">
        <img src={image} alt="Cricket Banner" className="banner-img" />
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

      {/* ❌ Step 3: Removed View Details Popup HTML */}

      {/* Main Content */}
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
                max="5000" // Kept your 5000 max price
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

export default Cricket;