import './dashboard.css'

import React from 'react';
const StarRating = ({ averageRating }) => {
  // Function to generate star representation
  const renderStars = (averageRating) => {
    const starCount = 5; // Maximum number of stars
    const filledStars = Math.round(averageRating);
    const emptyStars = starCount - filledStars;
    
    const stars = [];
    
    for (let i = 0; i < filledStars; i++) {
      stars.push(<span key={i} className="star filled-star">★</span>);
    }
    
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={i + filledStars} className="star empty-star">☆</span>);
    }
    
    return stars;
  };

  return (
    <div>
      {renderStars(averageRating)}
    </div>
  );
};

export default StarRating;
