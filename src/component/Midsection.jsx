import React from "react";
import "./MidSection.css";
import image from "../component/ryf.jpeg";

export default function MidSection() {
  const features = [
    { icon: image, text: "Scientifically Designed Products", isImage: true },
    { icon: "📦", text: "20+ Categories 250+ Products" },
    { icon: "🏆", text: "Industry Leader For 30+ Years" },
    { icon: "⭐", text: "Trusted by millons of people" },
  ];

  return (
    <section className="container py-5 text-center mid-section">
      {/* Badge + Heading */}
      <div className="row justify-content-center mb-5">
        <div className="col-md-10 d-flex align-items-center justify-content-center gap-3 flex-wrap">
          <div className="badge-circle">#1</div>
          <div className="text-start">
            <h2 className="fw-semibold fs-3 text-dark">
              Trusted by hundreds of families in Noida
            </h2>
            <p className="text-muted mb-0">
              Acclaimed and recommended by healthcare professionals worldwide
            </p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="row g-4">
        {features.map((f, idx) => (
          <div key={idx} className="col-12 col-md-3">
            <div className="feature-card d-flex flex-column align-items-center">
              {/* ✅ Show image if it's an image, else emoji */}
              {f.isImage ? (
                <img
                  src={f.icon}
                  alt={f.text}
                  className="feature-icon mb-2"
                />
              ) : (
                <div className="fs-1 mb-2">{f.icon}</div>
              )}
              <p className="fw-medium text-dark">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
