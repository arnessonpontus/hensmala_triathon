import { useMemo, useState } from "react";
import { Input, FormGroup, Label } from "reactstrap";
import "react-image-gallery/styles/css/image-gallery.css";
import { useRef } from "react";
import classnames from "classnames";
import ImageGallery from "react-image-gallery";
import { Shirt, ShirtMaterial, ShirtType, Size } from "../models";
import { ElevatedButton } from "../../../components/Button/ElevatedButton";
import { BaseButton } from "../../../components/Button/BaseButton";

const images = [
  {
    original: "/images/clothes/funktion_2025_fram.png",
    thumbnail: "/images/clothes/funktion_2025_fram_thumb.png",
  },
  {
    original: "/images/clothes/funktion_2025_bak.png",
    thumbnail: "/images/clothes/funktion_2025_bak_thumb.png",
  },
  {
    original: "/images/clothes/bomull_2025.png",
    thumbnail: "/images/clothes/bomull_2025.png",
  }
];

const getDefaultShirt = (): Shirt => {
  return { size: null, type: null, material: "funktion" }
}

const ShirtSelect = (props: { updateShirtSelection: (shirts: Shirt[]) => void }) => {
  const [shirts, setShirts] = useState<Shirt[]>([getDefaultShirt()]);

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  function addShirt() {
    const newShirts = [...shirts, getDefaultShirt()]
    setShirts(newShirts);
  }

  const deleteShirt = (idx: number) => {
    const newShirts = [...shirts];
    if (idx === 0) {
      newShirts[0] = getDefaultShirt();
    } else {
      newShirts.splice(idx, 1);
    }

    setShirts(newShirts);
    props.updateShirtSelection(newShirts.filter(s => s.size && s.type));
  };

  // Set the size, type or material of the shirt
  function updateShirtValues<K extends keyof Shirt>(field: K, idx: number, value: Shirt[K]) {
    const newShirts = [...shirts];
    newShirts[idx][field] = value;
    setShirts(newShirts);
    props.updateShirtSelection(newShirts.filter(s => s.size && s.type));
  }

  const imageGalleryRef = useRef(null);

  const numShirtsSelected = useMemo(() => shirts.reduce((c, s) => s.size != null && s.type != null ? c + 1 : c, 0), [shirts])

  return (
    <div id="shirt-select">
      <ImageGallery showThumbnails={true} ref={imageGalleryRef} showPlayButton={false} showFullscreenButton={true} items={images} onClick={() => (imageGalleryRef.current as any).toggleFullScreen()} />
      <div className="shirt-inputs">
        {shirts.map((shirt, i) => {
          return (
            <div key={i}>
              <hr></hr>
              <div className="shirt-row" >
                <div style={{ flex: 1 }}>
                  <div className="d-flex">
                    <Input
                      className="ml-2 mr-2"
                      required={true}
                      type="select"
                      name={"size"}
                      onChange={(e) => updateShirtValues("size", i, e.target.value as Size)}
                    >
                      <option disabled selected={shirt.size === null}>
                        Storlek
                      </option>
                      {sizes.map((size) => {
                        return (
                          <option selected={shirt.size === size} value={size} key={size}>
                            {size}
                          </option>
                        );
                      })}
                    </Input>
                    <Input
                      className="ml-2 mr-2"
                      required={true}
                      type="select"
                      name={"type"}
                      onChange={(e) => updateShirtValues("type", i, e.target.value as ShirtType)}
                    >
                      <option disabled selected={shirt.type === null}>
                        Typ
                      </option>
                      <option selected={shirt.type === "Dam"} value={"Dam"} key={"Dam"}>
                        Dam
                      </option>
                      <option selected={shirt.type === "Herr"} value={"Herr"} key={"Herr"}>
                        Herr
                      </option>
                    </Input>
                  </div>
                  <div className="d-flex mt-1">
                    <FormGroup className="ml-2 mr-2" check>
                      <Label>
                        <Input
                          required={true}
                          type="radio"
                          value="funktion"
                          checked={shirt.material === 'funktion'}
                          onChange={(e) => updateShirtValues("material", i, e.target.value as ShirtMaterial)}
                        />
                        Funktion
                      </Label>
                    </FormGroup>
                    <FormGroup className="ml-4 mr-2" check>
                      <Label>
                        <Input
                          required={true}
                          type="radio"
                          value="bomull"
                          checked={shirt.material === 'bomull'}
                          onChange={(e) => updateShirtValues("material", i, e.target.value as ShirtMaterial)}
                        />
                        Bomull
                      </Label>
                    </FormGroup>
                  </div>
                </div>
                {(i !== 0 || (shirts[0].size !== null || shirts[0].type !== null)) ?
                  <BaseButton small type="button" onClick={() => deleteShirt(i)}>
                    <i className="fas fa-trash "></i>
                  </BaseButton>
                  : null}
              </div>
            </div>
          )
        })}
        <ElevatedButton isSecondary disabled={numShirtsSelected <= shirts.length - 1} type="button" medium onClick={addShirt}>
          + Lägg till fler
        </ElevatedButton>
        <div className={classnames("mt-2 d-flex justify-content-center", { "no-clothed-chosen": numShirtsSelected < 1 })} style={{ minHeight: 25 }}>{numShirtsSelected < 1 ? <span>Ingen tröja vald</span> : <span>Antal tröjor valda: {numShirtsSelected}</span>}</div>
      </div>
    </div>
  );

}

export default ShirtSelect;
