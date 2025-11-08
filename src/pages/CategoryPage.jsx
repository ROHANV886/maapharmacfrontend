// CategoryPage.js (Simplified – No Filters)
import React from "react";
import { useParams } from "react-router-dom";
import ProductGrid from "../pages/ProductGrid";
import "bootstrap/dist/css/bootstrap.min.css";
import "../pages/BasketBal.css";

// ✅ Import all product data
import allData from "../data/All.json";
import flamingoData from "../data/Allflamingo.json";
import medicalData from "../data/FreshArrival.json";

// ✅ Merge all products into one array
const allProducts = [
  ...(Array.isArray(allData) ? allData : Object.values(allData).flat()),
  ...(Array.isArray(flamingoData) ? flamingoData : Object.values(flamingoData).flat()),
  ...(Array.isArray(medicalData) ? medicalData : Object.values(medicalData).flat())
];

export default function CategoryPage() {
  const { categorySlug } = useParams();

  // ✅ Filter only by category slug
  const filteredProducts = allProducts.filter((item) => {
    const subCategorySlug = (item.subCategory || "")
      .toLowerCase()
      .replace(/[ &]/g, "-");
    return subCategorySlug === categorySlug;
  });

  // ✅ Format title nicely (bp-monitor → BP Monitor)
  const categoryName = categorySlug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="category-page">
      {/* 🔹 Category Header */}
      <div className="text-center py-5 bg-light mb-4">
        <h1 className="fw-semibold">{categoryName}</h1>
        <p className="text-muted mb-0">Explore our range of {categoryName} products</p>
      </div>

      {/* 🔹 Product Grid */}
      <div className="container mb-5">
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-5">
            <h5>No products found in this category.</h5>
          </div>
        )}
      </div>
    </div>
  );
}
