import React, { useState, useEffect } from 'react';
import Rating from '../Rating/Rating';

const Reviews = ({ mealId }) => {
  const [review, setReview] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Load reviews from localStorage
    const savedReviews = JSON.parse(localStorage.getItem(`reviews_${mealId}`) || '[]');
    setReviews(savedReviews);
  }, [mealId]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!review.trim()) return;

    const newReview = {
      id: Date.now(),
      text: review,
      date: new Date().toLocaleDateString(),
    };

    const updatedReviews = [...reviews, newReview];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${mealId}`, JSON.stringify(updatedReviews));
    setReview('');
  };

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold mb-4">Reviews & Ratings</h3>
      
      <div className="mb-6">
        <Rating mealId={mealId} />
      </div>

      <form onSubmit={handleSubmitReview} className="mb-6">
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          className="w-full p-2 border rounded-lg mb-2"
          placeholder="Write your review..."
          rows="3"
        />
        <button
          type="submit"
          className="bg-[#5E72E4] text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Submit Review
        </button>
      </form>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">{review.date}</span>
            </div>
            <p className="text-gray-800">{review.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
