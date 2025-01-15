import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const Rating = ({ mealId, initialRating = 0 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hover, setHover] = useState(null);

  const handleRating = (currentRating) => {
    setRating(currentRating);
    // Store rating in localStorage
    const ratings = JSON.parse(localStorage.getItem('mealRatings') || '{}');
    ratings[mealId] = currentRating;
    localStorage.setItem('mealRatings', JSON.stringify(ratings));
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => {
        const currentRating = index + 1;
        return (
          <label key={index}>
            <input
              type="radio"
              name="rating"
              value={currentRating}
              className="hidden"
              onClick={() => handleRating(currentRating)}
            />
            <FaStar
              className="cursor-pointer transition-colors duration-200"
              size={20}
              color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <span className="ml-2 text-gray-600">({rating}/5)</span>
    </div>
  );
};

export default Rating;
