import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
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
  { id: 1, src: "images/img1.jpg" },
  { id: 2, src: "images/img2.jpg" },
  { id: 3, src: "images/img3.jpg" },
];

const SliderComponent = () => {
  return (
    <div className="slider-wrapper">
      <Slider {...settings}>
        {images.map((image) => (
          <div key={image.id}>
            <img
              src={image.src}
              alt={``}
              className="slider-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SliderComponent;
