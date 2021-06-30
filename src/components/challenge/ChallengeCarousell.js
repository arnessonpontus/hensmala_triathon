import React from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ChallengeCarousell = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const styles = {
    imgStyle: {
      height: 350,
      width: "100%",
      objectFit: "contain",
      position: "relative",
      zIndex: 1,
    },
  };

  const slides = props.imgs.map((img) => {
    return (
      <div className="entry-modal-background">
        <a href={img} target="_blank" rel="noopener noreferrer">
          <img style={styles.imgStyle} src={img} alt="deltagarbild"></img>
        </a>
      </div>
    );
  });

  return <Slider {...settings}>{slides}</Slider>;
};

export default ChallengeCarousell;
