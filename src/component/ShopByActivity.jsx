import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./ShopByActivity.css";

import s1 from "../assets/s1.webp";
import s2 from "../assets/s2.png";
import s3 from "../assets/s3.png";
import s4 from "../assets/s4.jpg";
import s5 from "../assets/s5.png";
import s6 from "../assets/s6.webp";
import s7 from "../assets/s7.jpg";
import s8 from "../assets/s8.jpg";
import s9 from "../assets/s9.jpg";
import s10 from "../assets/s9..webp"; // ✅ fixed
import s11 from "../assets/s10.jpg";
import s12 from "../assets/s11.webp";
import s13 from "../assets/s14.jpg";

export default function ShopByActivity() {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: dir === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const activities = [
    { name: "Aerobatics", img: s1, path: "/activity/aerobatics" },
    { name: "Athletics", img: s2, path: "/activity/athletics" },
    { name: "Badminton", img: s3, path: "/activity/badminton" },
    { name: "Basketball", img: s4, path: "/activity/basketball" },
    { name: "Cricket", img: s5, path: "/activity/cricket" },
    { name: "Cycling", img: s6, path: "/activity/cycling" },
    { name: "Football", img: s7, path: "/activity/football" },
    { name: "Golf", img: s8, path: "/activity/golf" },
    { name: "Gym", img: s9, path: "/activity/gym" },
    { name: "Running", img: s10, path: "/activity/running" },
    { name: "Tennis", img: s11, path: "/activity/tennis" },
    { name: "Volleyball", img: s12, path: "/activity/volleyball" },
    { name: "Walking", img: s13, path: "/activity/walking" },
    { name: "Yoga", img: s13, path: "/activity/yoga" },
  ];

  return (
    <section className="container py-5 fade-in position-relative">
      <div className="text-center mb-4">
        <h2 className="fw-semibold">Shop By Activity</h2>
        <p className="text-muted">Choose your sport to find the right support</p>
      </div>

      {/* Left Arrow */}
      <button
        className="scroll-btn left-btn"
        onClick={() => scroll("left")}
      >
        ‹
      </button>

      <div ref={scrollRef} className="activity-scroll-container">
        {activities.map((act, idx) => (
          <Link
            key={idx}
            to={act.path}
            className="activity-card text-decoration-none"
          >
            <div className="position-relative rounded overflow-hidden shadow-sm activity-box">
              <img
                src={act.img}
                alt={act.name}
                className="w-100 h-100 activity-img"
              />
              <div className="position-absolute bottom-0 start-50 translate-middle-x mb-2">
                <button className="btn btn-light btn-sm px-3 activity-btn">
                  {act.name}
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <button
        className="scroll-btn right-btn"
        onClick={() => scroll("right")}
      >
        ›
      </button>
    </section>
  );
}
