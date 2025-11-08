import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import productsData from "../product.json";

const ProductList = () => {
  const dispatch = useDispatch();

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">🛍️ Products</h2>
      <div className="row">
        {productsData.map((product) => (
          <div key={product.id} className="col-md-3 mb-4">
            <div className="card shadow-sm p-3 text-center">
              <img
                src={product.img}
                alt={product.name}
                className="img-fluid mb-2"
              />
              <h5>{product.name}</h5>
              <p>₹{product.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => dispatch(addToCart(product))}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
