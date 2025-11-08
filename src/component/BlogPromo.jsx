import React from "react";
import "./BlogPromo.css";

export default function BlogPromo() {
  return (
    <section className="blog-promo-banner d-flex align-items-center text-white fade-in">
      <div className="container text-center px-3">
        <h2 className="fw-bold mb-3 display-6 display-md-4">
          Check out our Blog!
        </h2>
        <p className="lead mb-4">
          For the orthopedic insights you won’t find anywhere else
        </p>
        <a href="/blog" className="btn btn-dark-pink px-4 py-2 fw-semibold">
          Explore More →
        </a>
      </div>
    </section>
  );
}
