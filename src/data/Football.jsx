import React, { useState } from "react";
import "../pages/BasketBal.css";
import "bootstrap/dist/css/bootstrap.min.css";
import banner from "../assets/Basketball/Banner.webp";
import Header from "../component/Header";
import productsdata from "../Badminton.json";

const allProducts = productsdata;

// Unique category list
const allCategories = [
  ...new Set(allProducts.map((product) => product.category)),
];

const Football = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [maxPrice, setMaxPrice] = useState(2000);

  // ✅ Filter logic: IDs 1 to 33 only, then category & price filter
  const filteredProducts = allProducts
    .filter((item) => item.id >= 1 && item.id <= 32) // IDs 1–33
    .filter((item) => {
      const matchCategory =
        selectedCategory === "all" ||
        item.category.toLowerCase().trim() ===
          selectedCategory.toLowerCase().trim();

      const matchPrice = Number(item.price) <= maxPrice;

      return matchCategory && matchPrice;
    });

  return (
    <>
      
      <div className="abdominal-page">
        {/* Banner */}
        <div className="banner">
          <img src="https://www.tynorstore.com/media/catalog/category/shop_for_badminton_w_new_img_1-6691a8f9.webp" alt="Banner" className="banner-img" />
        </div>

        {/* Main Content */}
        <div className="container mt-4">
          <div className="row">
            {/* Sidebar Filter */}
            <div className="col-md-3 filter-sidebar">
              <h5>Filter</h5>
              <hr />

              {/* Category Filter */}
              <div className="filter-section">
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

                  {/* All Option */}
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

            {/* Products Grid */}
            <div className="col-md-9">
              <div className="row">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((item) => (
                    <div className="col-md-4 mb-4" key={item.id}>
                      <div className="card product-card shadow-sm">
                        <img
                          src={item.img}
                          className="card-img-top"
                          alt={item.name}
                        />
                        <div className="card-body text-center">
                          <h6 className="card-title">{item.name}</h6>
                          <p className="price mb-1">
                            ₹{item.price}{" "}
                            {item.oldPrice && (
                              <span className="old-price text-muted">
                                ₹{item.oldPrice}
                              </span>
                            )}
                          </p>
                          <button className="btn btn-outline-dark btn-sm">
                            View Details
                          </button>
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
    </>
  );
};

export default Football;
