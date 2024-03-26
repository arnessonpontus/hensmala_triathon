import React, { useState } from "react";
import { Input } from "reactstrap";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const ShirtSelect = (props) => {
  const [shirts, setShirts] = useState([{size: null, type: null}]);

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  function addShirt() {
    const newShirts = [...shirts, {size: null, type: null}]
    setShirts(newShirts);
  }

  const deleteShirt = (idx) =>  {
    const newShirts = [...shirts];
      if (idx === 0) {
        newShirts[0] = {size: null, type: null};
      } else {
        newShirts.splice(idx, 1);
      }
  
      setShirts(newShirts);
      props.updateShirtSelection(newShirts);
  };

  // Set the size or type of the shirt
  function updateShirtValues(field, idx, value) {
    const newShirts = [...shirts];
    newShirts[idx][field] = value;
    setShirts(newShirts);
    props.updateShirtSelection(newShirts);
  }

  return (
    <div className="shirt-component" id="shirt-select">
      <Zoom>
        <img alt="t-shirt" width="100%" className="thumbnail-shirt" src="/images/ht_shirt_2022_large.png"></img>
      </Zoom>
      <div className="shirt-inputs">
        {shirts.map((shirt, i) => {
          
          return (
            <div className="shirt-row" key={i}>
              <Input
                className="ml-2 mr-2"
                required={true}
                type="select"
                name={"size"}
                onChange={(e) => updateShirtValues("size", i, e.target.value)}
              >
                <option disabled selected={shirt.size === null} value>
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
                onChange={(e) => updateShirtValues("type", i, e.target.value)}
              >
                <option disabled selected={shirt.type === null} value>
                  Typ
                </option>
                <option selected={shirt.type === "dam"} value={"dam"} key={"dam"}>
                  Dam
                </option>
                <option selected={shirt.type === "herr"} value={"herr"} key={"herr"}>
                  Herr
                </option>
              </Input>
              <div className="delete-icon" onClick={() => deleteShirt(i)}>
              {(i !== 0 || (shirts[0].size !== null || shirts[0].type !== null)) ? <i className="fas fa-trash "></i> : null}
              </div>
            </div>
          )
        })}
        <div
          className="button-style add-shirt-button"
          onClick={addShirt}
        >
          + Lägg till fler
        </div>
      </div>
    </div>
  );

}

export default ShirtSelect;
