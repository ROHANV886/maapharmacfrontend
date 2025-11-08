import React from "react";
import {
  Truck,
  ArrowRepeat,
  ShieldCheck,
  ShieldLock,
} from "react-bootstrap-icons";

export default function AssuranceStrip() {
  const assurances = [
    { title: "Free Shipping", icon: Truck, text: "All over India" },
    { title: "Easy Return & Replacement", icon: ArrowRepeat, text: "Hassle-free policy" },
    { title: "Up to 1 Year Warranty", icon: ShieldCheck, text: "Product-specific" },
    { title: "Secure Payments", icon: ShieldLock, text: "Your data remains safe with us" },
  ];

  return (
    <section className="assurance-strip py-5">
      <div className="container">
        {/* Responsive grid: 1 col on xs, 2 on sm, 4 on md+ */}
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-4 text-center">
          {assurances.map((item, idx) => (
            <div key={idx} className="col d-flex flex-column align-items-center px-3">
              <item.icon size={40} className="mb-3 text-primary" />
              <h6 className="fw-semibold mb-1">{item.title}</h6>
              <p className="text-muted small mb-0">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
