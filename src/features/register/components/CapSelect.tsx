import { useState } from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import { useRef } from "react";

import ImageGallery from "react-image-gallery";
import { ElevatedButton } from "../../../components/Button/ElevatedButton";
import styled from "styled-components";

const images = [
  {
    original: "/images/clothes/cap_no_image.png",
    thumbnail: "/images/clothes/cap_no_image.png",
  }
];

export const SelectButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
`;


const CapSelect = ({ updateCapSelection }: { updateCapSelection: (numCaps: number) => void }) => {
  const [numCaps, setNumCaps] = useState(0);

  function addCap() {
    const caps = numCaps + 1;
    setNumCaps(caps)

    updateCapSelection(caps);
  }

  function removeCap() {
    if (numCaps > 0) {
      const caps = numCaps - 1;
      setNumCaps(caps)
      updateCapSelection(caps);
    }
  }

  const imageGalleryRef = useRef(null);

  return (
    <div className="d-flex flex-column align-items-center">
      <p className="w-100 d-flex justify-content-center">Färg är ännu inte bestämd. Bild kommer snart.</p>
      <ImageGallery ref={imageGalleryRef} showThumbnails={false} showPlayButton={false} showFullscreenButton={true} items={images} onClick={() => (imageGalleryRef.current as any).toggleFullScreen()} />
      <SelectButtonContainer>
        <ElevatedButton style={{ minWidth: 30 }} isSecondary small type="button"
          onClick={removeCap}>-</ElevatedButton>
        <div className="d-flex justify-content-center align-items-center" style={{ minWidth: 15 }}>{numCaps}</div>
        <ElevatedButton style={{ minWidth: 30 }} isSecondary small type="button"
          onClick={addCap}
        >+</ElevatedButton>
      </SelectButtonContainer>
      <div className="mt-2 no-clothed-chosen" style={{ minHeight: 25 }}>{numCaps <= 0 ? <span>Ingen keps vald</span> : null}</div>
    </div>
  );

}

export default CapSelect;
