import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // ✅ useNavigate hata diya
import { useCart } from "../component/cartContext";
import "bootstrap/dist/css/bootstrap.min.css";

// (Saare JSON imports waise hi rahenge)
import aerobics from "../data/Aerobics.json";
import all from "../data/All.json";
import allflamingo from "../data/Allflamingo.json";
import athletics from "../data/Athletics.json";
import badminton from "../data/Badminton.json";
import cycling from "../data/cycling.json";
import football from "../data/Football.json";
import golf from "../data/Golf.json";
import gym from "../data/GYM.json";
import running from "../data/running.json";
import tennis from "../data/Tennis.json";
import volleyball from "../data/Volleyball.json";
import walking from "../data/Walking.json";
import yoga from "../data/yoga.json";
import DailyRoutine from "../DailyRoutine/DailyRoutine.json"
// ✅ Step 1: Data ko merge aur unique karein (Aapka duplicate wala fix rakha hai)
const allDataRaw = [
  ...aerobics,
  ...all,
  ...allflamingo,
  ...athletics,
  ...badminton,
  ...cycling,
  ...football,
  ...golf,
  ...gym,
  ...running,
  ...tennis,
  ...volleyball,
  ...walking,
  ...yoga,
  ...DailyRoutine
];

const uniqueDataMap = new Map();
allDataRaw.forEach(item => {
  if (item && item.name) { 
    const uniqueKey = item.name.toLowerCase().trim();
    if (!uniqueDataMap.has(uniqueKey)) {
      uniqueDataMap.set(uniqueKey, item);
    }
  }
});
const allData = Array.from(uniqueDataMap.values());


// (makeSlug function waise hi rahega)
const makeSlug = (str) =>
  str
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "";

const SearchPage = () => {
  const { addToCart } = useCart();
  const location = useLocation();

  // ✅ Step 2: location.state ki jagah URL query se search term padhein
  const query = new URLSearchParams(location.search).get("q") || "";
  
  const [searchTerm, setSearchTerm] = useState(query);
  const [filteredData, setFilteredData] = useState([]);
  // ❌ Autosuggestions hata diye
  // const [suggestions, setSuggestions] = useState([]); 
  const [showPopup, setShowPopup] = useState(false);

  // ✅ Step 3: location.state ki jagah 'query' par depend karein
  useEffect(() => {
    setSearchTerm(query);
  }, [query]); // Jab bhi URL query badle, state update ho

  // ✅ Step 4: Filter logic (ab 'searchTerm' par chalega)
  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (term === "") {
      setFilteredData([]);
      return;
    }
    // 'allData' (unique data) se filter karein
    const results = allData.filter(
      (item) =>
        item.name?.toLowerCase().includes(term) ||
        item.category?.toLowerCase().includes(term) ||
        item.subCategory?.toLowerCase().includes(term)
    );
    setFilteredData(results);
  }, [searchTerm]); // Jab bhi searchTerm badle, filter karo

  // (handleAddToCart logic waise hi rahega)
  const handleAddToCart = (item) => {
    addToCart(item);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 1500);
  };

  // ❌ handleSearchSubmit aur handleSuggestionClick hata diye
  
  return (
    <div className="container my-5" style={{ minHeight: "70vh" }}>
      {/* (Popup logic waise hi rahega) */}
      {showPopup && (
        <div
          className="alert alert-success position-fixed bottom-0 end-0 m-4 shadow"
          style={{ zIndex: 1050, borderRadius: "10px", padding: "10px 20px" }}
        >
          ✅ Added to Cart Successfully!
        </div>
      )}

      <h2 className="text-center mb-4 fw-bold">Search Products</h2>

      {/* ✅ Step 5: Simple search box (bina autosuggestion) */}
      <div className="d-flex justify-content-center mb-4">
        <div className="w-50" style={{ position: "relative" }}>
          <input
            type="text"
            placeholder="Search by name, category, or sub-category..."
            className="form-control w-100 shadow-sm"
            value={searchTerm}
            // Page ke andar search karne ke liye state update karo
            onChange={(e) => setSearchTerm(e.target.value)}
            autoComplete="off"
          />
          {/* ❌ Suggestion list hata di */}
        </div>
      </div>

      {/* (Results Grid logic waise hi rahega) */}
      <div className="row">
        {filteredData.length > 0 ? (
          filteredData.map((item, index) => (
            <div
              key={`${item.id}-${index}`} 
              className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex"
            >
              <div className="card flex-fill shadow-sm h-100">
                <img
                  src={item.img || "https://via.placeholder.com/200"}
                  className="card-img-top p-3"
                  alt={item.name}
                  style={{ height: "180px", objectFit: "contain" }}
                />
                <div className="card-body text-center d-flex flex-column justify-content-between">
                  <div>
                    <h6 className="fw-bold">{item.name}</h6>
                    <p className="text-muted small mb-1">
                      {item.category}{" "}
                      {item.subCategory ? `| ${item.subCategory}` : ""}
                    </p>
                    <p className="mb-2">
                      <span className="text-success fw-bold">
                        ₹
                        {String(item.price || "0")
                          .replace(/[₹,]/g, "")
                          .trim()}
                      </span>{" "}
                      {item.oldPrice && (
                        <span className="text-decoration-line-through text-secondary small">
                          ₹
                          {String(item.oldPrice || "0")
                            .replace(/[₹,]/g, "")
                            .trim()}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="d-flex justify-content-center gap-2 mt-auto">
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
          <div className="text-center mt-5 text-muted">
            {searchTerm // 'confirmedQuery' ki jagah 'searchTerm'
              ? "No products found 😕"
              : "Start typing to search 🔍"}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;