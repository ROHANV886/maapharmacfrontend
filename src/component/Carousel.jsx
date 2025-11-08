import React from "react";
import image1 from "../assets/1.png";
import image2 from "../assets/6.png";
import image3 from "../assets/7.png";
import image4 from "../assets/4.png";
import image5 from "../assets/carosel5.png";
import './Carousel.css' // <-- Yeh CSS file ab height ko control karegi

function Carousel() {
  return (
    <section className="carousel-wrapper"> {/* ⬅️ Humne CSS mein is class ko target kiya hai */}
      <div
        id="carouselExample"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner"> {/* ⬅️ Iski height set ki hai */}
          {[image5, image2, image3, image4, image1].map((img, idx) => (
            <div
              key={idx}
              className={`carousel-item ${idx === 0 ? "active" : ""}`}
            >
              <img
                src={img}
                className="d-block w-100 img-fluid" // img-fluid ab hamari CSS se override ho jayega
                alt={`Slide ${idx + 1}`}
              />
            </div>
          ))}
        </div>

        {/* Controls */}
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExample"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>

        {/* Indicators */}
        <div className="carousel-indicators">
          {[0, 1, 2, 3, 4].map((i) => (
            <button
              key={i}
              type="button"
              data-bs-target="#carouselExample"
              data-bs-slide-to={i}
              className={i === 0 ? "active" : ""}
              aria-current={i === 0 ? "true" : undefined}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Carousel;
