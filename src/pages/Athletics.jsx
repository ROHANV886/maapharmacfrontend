import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import productsdata from "../data/Athletics.json";
import bannerImg from "../assets/Aerobic/athalics.png";
import ProductGrid from "./ProductGrid";
 // ✅ <— Added Import

const allProducts = productsdata;
const allCategories = [
  ...new Set(allProducts.map((product) => product.category)),
];

export default function Athletics() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);

  const filteredProducts = allProducts
    .filter((item) => item.id >= 1 && item.id <= 33)
    .filter((item) => {
      const matchCategory =
        selectedCategory === "all" ||
        item.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim();
      const matchPrice = Number(item.price) <= maxPrice;
      return matchCategory && matchPrice;
    });

  return (
    <div className="abdominal-page">
      {/* ✅ Banner */}
      <div className="banner">
        <img src={bannerImg} alt="Athletics Banner" className="banner-img" />
      </div>

      <div className="container mt-4">
        <div className="row">
          {/* ✅ Sidebar Filters */}
          <div className="col-md-3 filter-sidebar">
            <h5>Filter</h5>
            <hr />

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

          {/* ✅ Product Grid (New Component Used) */}
          <div className="col-md-9">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
}
