import { ProductWithExpandedPrice } from "../models";
import { BaseButton } from "../../../components/Button/BaseButton";
import { ImageList } from "./RegisterFormSolo";
import { ImageWrapper, ThumbnailImage } from "./SmallCartItem";

const SelectableProductListToggle = ({ items, isProductsOpen, setIsProductsOpen }: { items: ProductWithExpandedPrice[], isProductsOpen: boolean, setIsProductsOpen: (a: boolean) => void }) => {
  if (isProductsOpen) {
    return (
      <BaseButton small type="button" onClick={() => setIsProductsOpen(!isProductsOpen)}>
        Döjl kläder
        <i className="fas fa-chevron-up"></i>
      </BaseButton>
    )
  }

  return (
    <>
      <BaseButton small type="button" onClick={() => setIsProductsOpen(!isProductsOpen)}>
        Visa kläder attt beställa
        <i className="fas fa-chevron-down"></i>
      </BaseButton>
      <ImageList>
        {items.filter(p => p.metadata.selectable).map(item => <ImageWrapper>
          <ThumbnailImage src={item.images[0] || "/images/placeholder-image.webp"} alt={item.name} />
        </ImageWrapper>)}
      </ImageList>
    </>
  );
}

export default SelectableProductListToggle;
