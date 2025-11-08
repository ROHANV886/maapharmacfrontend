import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import productsdata from "../data/All.json";
import flamingoData from "../data/Allflamingo.json";
import { useCart } from "../component/cartContext";
import ProductGrid from "../pages/ProductGrid"; // ✅ Import ProductGrid

// ✅ Merge All Data & Generate Slug
const allProducts = [
  ...(Array.isArray(productsdata)
    ? productsdata
    : Object.values(productsdata).flat()),
  ...(Array.isArray(flamingoData)
    ? flamingoData
    : Object.values(flamingoData).flat()),
].map((item) => ({
  ...item,
  slug: item.name
    ? item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")
    : "",
}));

// ✅ Category List
const allCategories = [
  ...new Set(allProducts.map((p) => p.category).filter(Boolean)),
];

const Backsupport = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);

  // ✅ Apply Filters
  const filteredProducts = allProducts
    .filter(
      (item) =>
        item.subCategory &&
        item.subCategory.toLowerCase().includes("back")
    )
    .filter((item) => {
      const matchCategory =
        selectedCategory === "all" ||
        (item.category &&
          item.category.toLowerCase().trim() ===
            selectedCategory.toLowerCase().trim());

      const numericPrice = parseFloat(
        String(item.price || "0").replace(/[₹,]/g, "")
      );
      return !isNaN(numericPrice) && numericPrice <= maxPrice;
    });

  return (
    <div className="abdominal-page">
      {/* ✅ Banner */}
      <div className="banner">
        <img
          src="https://www.tynorstore.com/media/catalog/category/Golf-0c84106e.webp"
          alt="Back Support Banner"
          className="banner-img"
        />
      </div>

      <div className="container mt-4">
        <div className="row">
          {/* ✅ Filters Sidebar */}
          <div className="col-md-3 filter-sidebar">
            <h5>Filter</h5>
            <hr />

            {/* Category Filter */}
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

            {/* Price Filter */}
            <label className="mt-3">
              Max Price: ₹{maxPrice}
            </label>
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

          {/* ✅ Product Grid Use */}
          <div className="col-md-9">
            <ProductGrid products={filteredProducts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Backsupport;
