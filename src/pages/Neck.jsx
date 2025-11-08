import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import productsdata from "../data/All.json";
import { useCart } from "../component/cartContext";
// ✅ Step 1: Import Link
import { Link } from "react-router-dom";
import ProductGrid from "../pages/ProductGrid";
// Ensure JSON is an array
const allProducts = Array.isArray(productsdata)
  ? productsdata
  : Object.values(productsdata).flat();

// Unique category list
const allCategories = [
  ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
];

// ✅ Step 2: Add makeSlug function
const makeSlug = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "";

const Neck = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [showPopup, setShowPopup] = useState(false);
  // ❌ Step 3: Removed modal state (setViewItem)
  const { addToCart } = useCart();
  
  // ✅ New state for search
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Updated Filter logic
  const filteredProducts = allProducts
    .filter(
      (item) =>
        item.subCategory &&
        item.subCategory.toLowerCase().includes("neck") // Your original logic
    )
    .filter((item) => {
      // 1. Search Filter
      const matchSearch =
        item.name &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Category Filter
      const matchCategory =
        selectedCategory === "all" ||
        (item.category &&
          item.category.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim());

      // 3. Price Filter
      const numericPrice = parseFloat(
        String(item.price || "0").replace(/[₹,]/g, "").trim()
      );
      const matchPrice = !isNaN(numericPrice) && numericPrice <= maxPrice;
      
      return matchSearch && matchCategory && matchPrice;
    });

  // Add to Cart Handler
  const handleAddToCart = (item) => {
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  // ✅ New Handler for Clear Filters
  const handleClearFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(5000); // Reset to this page's default max
    setSearchQuery("");
  };

  return (
    <>
      <div className="abdominal-page">
        {/* Banner */}
        <div className="banner">
          <img
            src="https://www.tynorstore.com/media/catalog/category/Shop_for_Neck_1-c89863ae.webp"
            alt="Neck Banner"
            className="banner-img"
          />
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
                {/* ✅ Renamed and updated button */}
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

            {/* Products Grid */}
            <div className="col-md-9">
                 <ProductGrid products={filteredProducts} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Neck;