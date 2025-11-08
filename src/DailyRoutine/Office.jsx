import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { useCart } from "../component/cartContext";

// ✅ Single data source now
import productsdata from "../DailyRoutine/DailyRoutine.json";

const allProducts = Array.isArray(productsdata)
  ? productsdata
  : Object.values(productsdata).flat();

const allCategories = [
  ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
];

// ✅ Helper: clean slug
const makeSlug = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "";

export default function Office() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [showPopup, setShowPopup] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // ✅ Filter Logic
  const filteredProducts = allProducts
    .filter(
      (item) =>
        item.subCategory &&
        item.subCategory.toLowerCase().includes("office") // keep specific filter if needed
    )
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
    setMaxPrice(5000);
    setSearchQuery("");
  };

  return (
    <div className="abdominal-page">
      {/* ✅ Popup */}
      {showPopup && (
        <div
          className="alert alert-success position-fixed bottom-0 end-0 m-4 shadow"
          style={{ zIndex: 1050, borderRadius: "10px", padding: "10px 20px" }}
        >
          ✅ Added to Cart Successfully!
        </div>
      )}

      <div className="banner">
        <img
          src="https://www.tynorstore.com/media/catalog/category/Office_Support_1-2018af4b.webp"
          alt="Banner"
          className="banner-img"
        />
      </div>

      <div className="container mt-4">
        <div className="row">
          {/* Sidebar Filter */}
          <div className="col-md-3 filter-sidebar">
            <h5>Filter</h5>
            <hr />

            {/* Search Filter */}
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

          {/* Product Grid */}
          <div className="col-md-9">
            <div className="row">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((item, index) => (
                  <div className="col-md-4 mb-4" key={index}>
                    <div className="card product-card shadow-sm h-100">
                      <img
                        src={
                          item.img ||
                          "https://via.placeholder.com/200x200?text=No+Image"
                        }
                        className="card-img-top"
                        alt={item.name}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <div className="card-body text-center d-flex flex-column justify-content-between">
                        <div>
                          <h6 className="card-title mb-2">{item.name}</h6>
                          <p className="price mb-2">
                            ₹
                            {String(item.price || "0")
                              .replace(/[₹,]/g, "")
                              .trim()}{" "}
                            {item.oldPrice && (
                              <span className="old-price text-muted text-decoration-line-through ms-1">
                                ₹
                                {String(item.oldPrice)
                                  .replace(/[₹,]/g, "")
                                  .trim()}
                              </span>
                            )}
                          </p>
                        </div>

                        <div className="d-flex justify-content-center gap-2">
                          <Link
                            to={`/product/${encodeURIComponent(
                              makeSlug(item.name)
                            )}`}
                            className="btn btn-outline-dark btn-sm"
                          >
                            View Details
                          </Link>
                          <button
                            className="btn btn-dark btn-sm"
                            onClick={() => handleAddToCart(item)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center mt-4">No products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
