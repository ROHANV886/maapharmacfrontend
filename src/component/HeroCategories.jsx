import React from "react";
import { Link } from "react-router-dom";
import h1 from "../assets/h7.png";
import h2 from "../assets/H2.webp";
import h3 from "../assets/h2.png";
import h4 from "../assets/h6.png";
import h5 from "../assets/h4.png";
import h6 from "../assets/H6.webp";

export default function HeroCategoriesScroll() {
  const categories = [
    { name: "Abdominal Support", count: 9, img: h1, path: "/abdominal" },
    { name: "Ankle and Foot Support", count: 27, img: h2, path: "/ankle" },
    { name: "Back Support", count: 62, img: h3, path: "/back" },
    { name: "Elbow Support", count: 18, img: h4, path: "/elbow" },
    { name: "Knee Support", count: 109, img: h5, path: "/knee" },
    { name: "Neck Support", count: 21, img: h6, path: "/neck" },
  ];

  return (
    <section className="container py-5 hero-categories text-center">
      {/* Header */}
      <div className="row mb-4 justify-content-center">
        <div className="col-auto">
          <h2 className="fw-semibold mb-0">Hero Categories</h2>
          <p className="text-muted mb-0">Find the right support for every need</p>
        </div>
      </div>

      {/* ✅ Centered Scrollable List */}
      <div
        className="d-flex gap-4 overflow-auto pb-3 px-1 justify-content-center mx-auto"
        style={{
          scrollSnapType: "x mandatory",
          scrollbarWidth: "thin",
          maxWidth: "100%",
        }}
      >
        {categories.map((cat, idx) => (
          <Link
            key={idx}
            to={cat.path}
            className="text-decoration-none text-dark flex-shrink-0 d-flex flex-column align-items-center"
            style={{
              width: "140px",
              scrollSnapAlign: "center",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <div
              className="d-flex align-items-center justify-content-center shadow-sm rounded-circle overflow-hidden"
              style={{
                width: "120px",
                height: "120px",
                backgroundColor: "#fff",
              }}
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-100 h-100"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="mt-2 text-center">
              <div className="fw-semibold">{cat.name}</div>
              <div className="text-muted small">{cat.count} items</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
