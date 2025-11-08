import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import productsdata from "../data/Badminton.json";
import ProductGrid from "../pages/ProductGrid";

const allProducts = productsdata;
const allCategories = [
  ...new Set(allProducts.map((product) => product.category)),
];

const Badminton = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);
  const [searchQuery, setSearchQuery] = useState("");

  const handleClearFilters = () => {
    setSelectedCategory("all");
    setMaxPrice(2000);
    setSearchQuery("");
  };

  const filteredProducts = allProducts
    .filter((item) => item.id >= 1 && item.id <= 32)
    .filter((item) => {
      const matchSearch =
        item.name &&
        item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory =
        selectedCategory === "all" ||
        item.category.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim();
      const numericPrice = parseFloat(item.price);
      const matchPrice = !isNaN(numericPrice) && numericPrice <= maxPrice;
      return matchSearch && matchCategory && matchPrice;
    });

  return (
    <div className="abdominal-page">
      {/* ✅ Banner */}
      <div className="banner">
        <img
          src="https://www.tynorstore.com/media/catalog/category/shop_for_badminton_w_new_img_1-6691a8f9.webp"
          alt="Badminton Banner"
          className="banner-img"
        />
      </div>

      <div className="container mt-4">
        <div className="row">
          {/* ✅ Sidebar */}
          <div className="col-md-3 filter-sidebar">
            <h5>Filter</h5>
            <hr />

            {/* ✅ Search */}
            <label>Search by Name</label>
            <input
              type="text"
              className="form-control mb-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* ✅ Category */}
            <label>Category</label>
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {allCategories.map((cat) => (
                <li key={cat}>
                  <input
                    type="radio"
                    name="category"
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
                  checked={selectedCategory === "all"}
                  onChange={() => setSelectedCategory("all")}
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

            {/* ✅ Price */}
            <label className="mt-3">Max Price: ₹{maxPrice}</label>
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

          {/* ✅ Product Grid Section */}
          <div className="col-md-9">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badminton;
