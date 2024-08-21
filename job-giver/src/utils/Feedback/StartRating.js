import React from "react";

const StarRating = ({ value, onClick }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex">
      {stars.map((star, index) => (
        <svg
          key={index}
          onClick={() => onClick(star)}
          className={`h-6 w-6 fill-current ${value >= star ? "text-yellow-500" : "text-gray-300"} cursor-pointer`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 1a.75.75 0 01.713.52l1.933 7.429h7.504a.75.75 0 01.694 1.068l-6.085 4.616 2.287 7.468a.75.75 0 01-1.156.837L10 16.341l-6.284 4.097a.75.75 0 01-1.156-.837l2.287-7.468L.15 9.017a.75.75 0 01.694-1.068H8.35L10 1.52A.75.75 0 0110 1zm0 2.445L8.703 8.334a.75.75 0 01-.573.447l-5.327.774 3.864 3.336a.75.75 0 01.22.664l-1.14 4.739 4.524-2.927a.75.75 0 01.704 0l4.524 2.927-1.14-4.739a.75.75 0 01.22-.664l3.864-3.336-5.327-.774a.75.75 0 01-.573-.447L10 3.445v.001z"
            clipRule="evenodd"
          />
        </svg>
      ))}
    </div>
  );
};

export default StarRating;
