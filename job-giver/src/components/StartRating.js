import React from "react";

const StarRating = ({ value, onClick }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <span
        key={i}
        onClick={() => onClick(i)}
        style={{ color: i <= value ? "#ffc107" : "#e4e5e9", cursor: "pointer" }}
      >
        &#9733;
      </span>
    );
  }
  return <div>{stars}</div>;
};

export default StarRating;
