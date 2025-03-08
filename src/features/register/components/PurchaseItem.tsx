import { useState } from "react";
import { Input, Label } from "reactstrap";
import "react-image-gallery/styles/css/image-gallery.css";
import { useRef } from "react";
import ImageGallery from "react-image-gallery";
import { ElevatedButton } from "../../../components/Button/ElevatedButton";
import { useCart } from "../../../context/CartContext";
import styled from "styled-components";
import { oreToSek } from "../utils";
import { toast } from "react-toastify";
import SmallCartItem from "./SmallCartItem";
import { ProductWithExpandedPrice } from "../models";
import { ImageSkeleton } from "../../../components/Skeleton";

export const PurchaseItemsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;
`;

const ToastContent = styled.div`
  display: flex ;
  flex-direction: column;
`;

export const SelectButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

const PurchaseItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 20px;
  border: 2px solid #d9d9d9;
  padding: 15px;
`;

const PurchaseItemTitle = styled.h2`
  font-size: 24px;
`;

const PurchaseItemPrice = styled.h3`
  font-size: 20px;
  color: #6a6868;
`;

const PurchaseItem = ({ product }: { product: ProductWithExpandedPrice }) => {
  const [quantity, setQuantity] = useState(1)
  const [selectedType, setSelectedType] = useState("")
  const [selectedSize, setSelectedSize] = useState("")
  const [loadingImage, setLoadingImage] = useState(product.images.length > 0 ? true : false)

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const { addToCart } = useCart();

  const addItemToCart = () => {
    addToCart(product, quantity, selectedSize, selectedType);
    toast(
      <ToastContent>
        <h5>Tillagd:</h5>
        <SmallCartItem isDeletable={false} item={{ ...product, selectedSize: selectedSize, selectedType: selectedType, quantity: quantity }} />
      </ToastContent>,
      { hideProgressBar: true, position: "bottom-right", type: "success" }
    );
  }

  const sizes: string[] = product.metadata.sizes ? JSON.parse(product.metadata.sizes) : [];
  const types: string[] = product.metadata.types ? JSON.parse(product.metadata.types) : [];

  const images = product.images.map(image => ({
    original: image,
    thumbnail: image,
  }))

  const imageGalleryRef = useRef(null);

  return (
    <PurchaseItemContainer>
      {images.length > 0 &&
      <>
        <div style={{display: loadingImage ? "none" : "initial"}}>
          <ImageGallery onImageLoad={() => setLoadingImage(false)} showThumbnails={false} ref={imageGalleryRef} showPlayButton={false} showFullscreenButton={!loadingImage} items={images}  showNav={!loadingImage} onClick={() => (imageGalleryRef.current as any).toggleFullScreen()} />
        </div>
        {loadingImage && <ImageSkeleton />}
      </>
      }
      <div>
        <PurchaseItemTitle>{product.name}</PurchaseItemTitle>
        <PurchaseItemPrice>{oreToSek(product.default_price?.unit_amount ?? 0)} kr</PurchaseItemPrice>
      </div>
      {sizes.length > 0 &&
        <div>
          <Label for="size">Storlek</Label>
          <Input
            required={true}
            type="select"
            name={"size"}
            onChange={(e) => setSelectedSize(e.target.value)}
          >
            <option disabled selected={selectedSize == ""}>
              Välj storlek
            </option>
            {sizes.map((size) => {
              return (
                <option selected={selectedSize === size} value={size} key={size}>
                  {size}
                </option>
              );
            })}
          </Input>
        </div>
      }
      {types.length > 0 &&
        <div>
          <Label for="type">Typ</Label>
          <Input
            required={true}
            type="select"
            name={"type"}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option disabled selected={selectedType == ""}>
              Välj typ
            </option>
            {types.map((type) => {
              return (
                <option selected={selectedType === type} value={type} key={type}>
                  {type}
                </option>
              );
            })}
          </Input>
        </div>
      }
      <SelectButtonContainer>
        <ElevatedButton style={{ minWidth: 30 }} isSecondary small type="button"
          onClick={decrementQuantity}>-</ElevatedButton>
        <div className="d-flex justify-content-center align-items-center" style={{ minWidth: 15 }}>{quantity}</div>
        <ElevatedButton style={{ minWidth: 30 }} isSecondary small type="button"
          onClick={incrementQuantity}
        >+</ElevatedButton>
      </SelectButtonContainer>
      <ElevatedButton fullWidth isSecondary disabled={quantity < 1 || (sizes.length > 0 && selectedSize == "") || (types.length > 0 && selectedType == "")} type="button" medium onClick={addItemToCart}>
        Lägg till
      </ElevatedButton>
    </PurchaseItemContainer>
  );
}

export default PurchaseItem;
