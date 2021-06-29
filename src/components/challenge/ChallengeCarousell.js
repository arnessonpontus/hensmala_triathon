import React, { Fragment, useState } from "react";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
} from "reactstrap";

const ChallengeCarousell = (props) => {
  const { animating, activeIndex, setAnimating, setActiveIndex } = props;

  const styles = {
    imgStyle: {
      height: 350,
      width: "100%",
      objectFit: "contain",
      position: "relative",
      zIndex: 1,
      boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
    },
    imgBackgroundStyle: {
      width: "100%",
      height: 350,
      position: "absolute",
      top: 0,
      backgroundImage: `url(${props.imgs[activeIndex]})`,
      filter: "blur(50px)",
    },
  };

  const next = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === props.imgs.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? props.imgs.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  };

  const slides = props.imgs.map((img) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={img}
      >
        <a
          href={img}
          target="_blank"
          rel="noopener noreferrer"
          style={{ overflow: "hidden" }}
        >
          <img style={styles.imgStyle} src={img} alt="deltagarbild"></img>
        </a>
      </CarouselItem>
    );
  });

  return (
    <Fragment>
      <div style={styles.imgBackgroundStyle}></div>

      <Carousel
        interval={false}
        activeIndex={activeIndex}
        next={next}
        previous={previous}
      >
        <CarouselIndicators
          items={props.imgs}
          activeIndex={activeIndex}
          onClickHandler={goToIndex}
        />
        {slides}
        <CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={previous}
        />
        <CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={next}
        />
      </Carousel>
    </Fragment>
  );
};

export default ChallengeCarousell;
