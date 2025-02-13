import styled from "styled-components";
import { useCart } from "../../../context/CartContext";
import { CartItem } from "../models";
import { BaseButton } from "../../../components/Button/BaseButton";

export const Container = styled.div`
  padding: 10px;
  background-color: cornflowerblue;
`;

const ProductThumbnail = styled.div`
  display: flex;
  max-width: 300px;
  align-items: center;
  gap: 12px;
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 64px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
`;

const ProductThumbnailText = styled.div`
  flex: 1;
  min-width: 0;
`;

const ProductName = styled.p`
  font-size: 14px;
  margin: 0;
  font-weight: 600;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ProductDetails = styled.p`
  font-size: 12px;
  color: #666;
`;

export const ThumbnailImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const SmallCartItem = ({ item, isDeletable }: { item: CartItem, isDeletable?: boolean }) => {
  const { removeFromCart } = useCart()
  return (
    <ProductThumbnail>
      <ImageWrapper>
        <ThumbnailImage src={item.images[0] || "/images/placeholder-image.webp"} alt={item.name} />
      </ImageWrapper>
      <ProductThumbnailText>
        <ProductName>{item.name}</ProductName>
        <ProductDetails>
          {[item.selectedSize, item.selectedType].filter(Boolean).join(" | ")} {item.selectedSize || item.selectedType ? "|" : ""} Antal: {item.quantity}
        </ProductDetails>
      </ProductThumbnailText>
      {isDeletable &&
        <BaseButton small type="button" onClick={() => removeFromCart(item.id)}>
          <i className="fas fa-trash "></i>
        </BaseButton>
      }
    </ProductThumbnail>
  );
}

export default SmallCartItem;
