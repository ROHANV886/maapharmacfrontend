import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useCart } from "../component/cartContext";
import productsdata from "../data/Tennis.json";
import ProductGrid from "../pages/ProductGrid";
const allProducts = Array.isArray(productsdata)
  ? productsdata
  : Object.values(productsdata).flat();

const allCategories = [
  ...new Set(allProducts.map((product) => product.category).filter(Boolean)),
];

const makeSlug = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "";

const Tennis = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [showPopup, setShowPopup] = useState(false);
  const { addToCart } = useCart();
  
  // ✅ New state for search
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Updated Filter logic
  const filteredProducts = allProducts
    .filter(
      (item) =>
        item.subCategory &&
        item.subCategory.toLowerCase().includes("tennis") // Your original logic
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

  // Add to Cart with Popup
  const handleAddToCart = (item) => {
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  // ✅ Updated Clear filters
  const handleClearFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(2000);
    setSearchQuery(""); // Clear search
  };

  return (
    <div className="abdominal-page">
      {/* Success Popup (No change) */}
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

      {/* Banner (No change) */}
      <div className="banner">
        <img
          src="https://www.tynorstore.com/media/catalog/category/Tennis_2-ead7f0f2.webp"
          alt="Tennis Banner"
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

          {/* Product Grid (No change) */}
          <div className="col-md-9">
               <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tennis;