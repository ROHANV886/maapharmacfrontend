import React from 'react';
import { Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux'; // 1. Jab Redux setup karein toh inhein uncomment karein
// import { removeFromWishlist } from '../store/wishlistSlice'; // (Aapko yeh slice banana hoga)

export default function Wishlist() {
  // 2. Yahaan apne Redux store se wishlist items laayein
  // const wishlistItems = useSelector((state) => state.wishlist.items); // (Example)
  // const dispatch = useDispatch();

  // --- ABHI KE LIYE KHAALI ARRAY ---
  // Jab aap Redux set up kar lein, toh iss line ko upar waali Redux waali line se badal dein
  const wishlistItems = [];
  // ---

  // const handleRemoveItem = (itemId) => {
  //   dispatch(removeFromWishlist(itemId)); // (Example)
  // };

  return (
    <div className="container py-5" style={{ minHeight: '70vh' }}>
      <h2 className="text-center text-primary mb-4 fw-bold">My Wishlist</h2>

      {/* 3. Check karein agar wishlist khaali hai */}
      {wishlistItems.length === 0 ? (
        <div className="text-center p-4 p-md-5 bg-light rounded-3 shadow-sm">
          <i className="bi bi-heart fs-1 text-muted mb-3"></i>
          <h4 className="fw-bold">Your Wishlist is Empty</h4>
          <p className="text-muted fs-5">
            Looks like you haven't added anything to your wishlist yet.
          </p>
          <Link to="/" className="btn btn-primary btn-lg mt-3">
            <i className="bi bi-arrow-left me-2"></i>
            Continue Shopping
          </Link>
        </div>
      ) : (
        /* 4. Agar wishlist mein items hain, toh unhein yahaan map karein (Maine code comment kar diya hai) */
        <div className="row g-4">
          {/*
          {wishlistItems.map((item) => (
            <div className="col-md-4 col-lg-3" key={item.id}>
              <div className="card h-100 shadow-sm border-0">
                <img
                  src={item.image} // Make sure item has 'image'
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold">{item.name}</h5> // Make sure item has 'name'
                  <p className="card-text fs-5 text-dark fw-bold mt-auto">
                    ₹{item.price} // Make sure item has 'price'
                  </p>
                </div>
                <div className="card-footer bg-white border-0 p-3">
                  <button 
                    className="btn btn-outline-danger w-100"
                    // onClick={() => handleRemoveItem(item.id)}
                  >
                    <i className="bi bi-trash me-2"></i>
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          */}
        </div>
      )}
    </div>
  );
}
