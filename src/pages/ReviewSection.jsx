import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import "./ReviewSection.css";

const ReviewSection = () => {
  // Review data
  const [reviews, setReviews] = useState([]);

  // Form states
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("");

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (rating === 0 || comment.trim() === "" || author.trim() === "") {
      alert("Please apna naam, rating aur comment teeno bharein.");
      return;
    }

    const newReview = {
      author,
      rating,
      comment,
      date: new Date().toLocaleDateString(),
    };

    setReviews([newReview, ...reviews]);
    setRating(0);
    setComment("");
    setAuthor("");
  };

  return (
    <div className="review-container">
      {/* 1️⃣ Review Form */}
      <div className="review-form">
        <h3>Your review</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              className="form-control"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Apna naam likhiye"
            />
          </div>

          <div className="form-group">
            <label>Rating:</label>
            <Rating
              style={{ maxWidth: 120 }}
              value={rating}
              onChange={setRating}
            />
          </div>

          <div className="form-group">
            <label>Comment:</label>
            <textarea
              className="form-control"
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Apna review likhiye..."
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit Review
          </button>
        </form>
      </div>

      {/* 2️⃣ Reviews List */}
      <div className="review-list mt-5">
        <h3>Customer Reviews</h3>
        {reviews.length === 0 ? (
          <p>Abhi tak koi review nahi hai.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-item card">
              <div className="card-body">
                <Rating
                  style={{ maxWidth: 120 }}
                  value={review.rating}
                  readOnly
                />
                <h5 className="card-title mt-2">{review.author}</h5>
                <p className="card-text">{review.comment}</p>
                <small className="text-muted">{review.date}</small>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
