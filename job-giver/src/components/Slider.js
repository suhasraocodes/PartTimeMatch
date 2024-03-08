import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "tailwindcss/tailwind.css"; // Ensure you have Tailwind CSS included
import './Slider.css'

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  autoplay: true,
  autoplaySpeed: 3000,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerMode: true,
  centerPadding: "25%",
  responsive: [
    {
      breakpoint: 768,
      settings: {
        centerMode: false,
        slidesToShow: 1,
        slidesToScroll: 1,
        centerPadding: "0",
      },
    },
  ],
};

const images = [
  { id: 1, src: "images/img6.jpg" },
  { id: 2, src: "images/img4.jpg" },
  { id: 3, src: "images/img5.jpg" },
  { id: 3, src: "images/img7.jpg" }
];

const SliderComponent = () => {
  return (
    <div className="slider-wrapper w-half mx-auto px-4 lg:px-20 pt-4">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.src}
              alt={``}
              className="slider-image w-full h-48 lg:h-72 object-cover mx-2 lg:mx-0"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
