import React from "react";
import "./ShopForDailySupport.css";
import { Link } from "react-router-dom";

import d1 from "../assets/d1.jpg";
import d2 from "../assets/d2.jpg";
import d3 from "../assets/d3.jpg";
import d4 from "../assets/d4.jpg";
import d5 from "../assets/d5.png";
import d6 from "../assets/d6.png";

export default function ShopForDailySupport() {
  const supports = [
    { name: "Office", items: 5, img: d1, href: "/office" },
    { name: "Posture", items: 2, img: d2, href: "/posture" },
    { name: "Pregnancy", items: 3, img: d3, href: "/pregnancy" },
    { name: "Sleep", items: 11, img: d4, href: "/sleep" },
    { name: "Travel", items: 4, img: d5, href: "/travel" },
    { name: "Kids", items: 11, img: d6, href: "/kids" },
  ];

  return (
    <section className="daily-support-section fade-in py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-semibold">Shop for Daily Support</h2>
          <p className="text-muted">
            Find your daily essentials to feel good every day and night
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {supports.map((support, idx) => (
            <div key={idx} className="col-6 col-md-4 col-lg-2">
              <Link to={support.href} className="text-decoration-none d-block h-100">
                <div className="support-card rounded overflow-hidden shadow-sm">
                  <img
                    src={support.img}
                    alt={support.name}
                    className="w-100 support-img"
                  />
                  <div className="overlay d-flex align-items-center justify-content-center">
                    <span className="btn btn-light btn-sm">Explore</span>
                  </div>
                </div>
                <div className="mt-3 text-center">
                  <div className="fw-semibold text-dark">{support.name}</div>
                  <div className="text-muted small">{support.items} items</div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
