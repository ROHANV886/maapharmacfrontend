// FreshArrivals.js
import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./ShopByActivity.css";

export default function FreshArrivals() { // Aap iska naam CategoryCarousel bhi rakh sakte hain
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

  // ✅ FIX: Yahaan products ki jagah categories daalein
  const activities = [
 
  {
    "name": "BP Monitor",
    "slug": "bp-monitor",
    "img": "https://avatars.mds.yandex.net/i?id=a593b421ebc302abc8abcaca4651d728ea9e49c8cf8f9c60-5141542-images-thumbs&n=13",
    "path": "/category/bp-monitor"
  },
  {
    "name": "Glucometer",
    "slug": "glucometer",
    "img": "https://avatars.mds.yandex.net/i?id=a593b421ebc302abc8abcaca4651d728ea9e49c8cf8f9c60-5141542-images-thumbs&n=13",
    "path": "/category/glucometer"
  },
  {
    "name": "Glucometer",
    "slug": "glucometer",
    "img": "https://avatars.mds.yandex.net/i?id=5fdc864e576851efaabf6cbc1238cbc25a8bbdf3-5360371-images-thumbs&n=13",
    "path": "/category/glucometer"
  },
  {
    "name": "Glucometer",
    "slug": "glucometer",
    "img": "https://avatars.mds.yandex.net/i?id=f5ca9984cd75cc892954a2679f6dadc926ded434-9233306-images-thumbs&n=13",
    "path": "/category/glucometer"
  },
  {
    "name": "Nebulizer",
    "slug": "nebulizer",
    "img": "https://avatars.mds.yandex.net/i?id=97ad2a08b04f4bd43a89ba84bf7d909d61f9977c-10355051-images-thumbs&n=13",
    "path": "/category/nebulizer"
  },
  {
    "name": "Thermometer",
    "slug": "thermometer",
    "img": "https://avatars.mds.yandex.net/i?id=2feec3052a29da033a4862ca9889cd7348473f1f-5233531-images-thumbs&n=13",
    "path": "/category/thermometer"
  },
  {
    "name": "Thermometer",
    "slug": "thermometer",
    "img": "https://avatars.mds.yandex.net/i?id=f10a7612b9ccb89e8a9f2a649cfa97c0add9febda063cae9-5227398-images-thumbs&n=13",
    "path": "/category/thermometer"
  },
  {
    "name": "Adult Diapers",
    "slug": "Adult Diapers",
    "img": "https://avatars.mds.yandex.net/i?id=e4687152b90639743c9619e606ce133df6095b5a-5287653-images-thumbs&n=13",
    "path": "/category/thermometer"
  },
  {
    "name": "Adult Diapers",
    "slug": "adult-diapers",
    "img": "https://avatars.mds.yandex.net/i?id=7d327cf8e431abec188b8e504d02eee355a3e60b-9181873-images-thumbs&n=13",
    "path": "/category/adult-diapers"
  },
  {
    "name": "Adult Diapers",
    "slug": "adult-diapers",
    "img": "https://avatars.mds.yandex.net/i?id=f27406eaf7dc9058bb523f5783db8038b8136a93-5112030-images-thumbs&n=13",
    "path": "/category/adult-diapers"
  }

    // ...Aap aur categories add kar sakte hain
  ];


  return (
    <section className="container py-5 fade-in position-relative">
      <div className="text-center mb-4">
        {/* Title bhi update kar diya hai */}
        <h2 className="fw-semibold">Shop By Category</h2>
        <p className="text-muted">Choose your category to find the right support</p>
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
            to={act.path} // ✅ Path ab /category/bp-monitor jaisa hai
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