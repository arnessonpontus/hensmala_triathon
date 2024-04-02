import React, { useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { useRef } from "react";

import ImageGallery from "react-image-gallery";

const images = [
  {
    original: "/images/clothes/cap_black.jpeg",
    thumbnail:"/images/clothes/cap_black_small.jpeg",
  }
];

const CapSelect = (props) => {
  const [numCaps, setNumCaps] = useState(0);

  function addCap() {
    const caps = numCaps + 1;
    setNumCaps(caps)

    props.updateCapSelection(caps);
  }

  function removeCap() { 
    if (numCaps > 0) {
      const caps = numCaps - 1;
      setNumCaps(caps)
      props.updateCapSelection(caps);
    }
  }

  const imageGalleryRef = useRef(null);

  return (
    <div className="d-flex flex-column align-items-center">
      <p>Keps på bild är inte den slutgiltiga</p>
      <ImageGallery ref={imageGalleryRef} showPlayButton={false} showFullscreenButton={false} items={images} onClick={() => imageGalleryRef.current.toggleFullScreen()}/>
        <div className="d-flex align-items-center mt-3">
          <div
            className="button-style small add-shirt-button" 
            onClick={removeCap}>-</div>
            <div className="d-flex justify-content-center align-items-center" style={{minWidth: 15}}>{numCaps}</div>
            <div
            className="button-style small add-shirt-button"
            onClick={addCap}
            >+</div>
            </div>
          <div className="mt-2 no-clothed-chosen" style={{minHeight: 25}}>{numCaps <= 0 ? <span>Ingen keps vald</span> : null}</div>
    </div>
  );

}

export default CapSelect;
