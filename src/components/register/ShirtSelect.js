import React, { useState } from "react";
import { Input, FormGroup, Label } from "reactstrap";
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

const getDefaultShirt = () => {
  return { size: null, type: null, material: "funktion" }
}

const ShirtSelect = (props) => {
  const [shirts, setShirts] = useState([getDefaultShirt()]);

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];

  function addShirt() {
    const newShirts = [...shirts, getDefaultShirt()]
    setShirts(newShirts);
  }

  const deleteShirt = (idx) =>  {
    const newShirts = [...shirts];
      if (idx === 0) {
        newShirts[0] = getDefaultShirt();
      } else {
        newShirts.splice(idx, 1);
      }
  
      setShirts(newShirts);
      props.updateShirtSelection(newShirts);
  };

  // Set the size, type or material of the shirt
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
            <div key={i}>
              <hr></hr>
              <div className="shirt-row" >
                <div className="select-buttons">
                  <div className="d-flex">     
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
                  </div>
                  <div className="d-flex mt-1">
                    <FormGroup className="ml-2 mr-2" check>
                      <Label>
                        <Input
                          required={true}
                          type="radio"
                          value="funktion"
                          checked={shirt.material === 'funktion'}
                          onChange={(e) => updateShirtValues("material", i, e.target.value)}
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
                          onChange={(e) => updateShirtValues("material", i, e.target.value)}
                        />
                        Bomull
                      </Label>
                    </FormGroup>
                  </div>
                </div>
                <div className="delete-icon" onClick={() => deleteShirt(i)}>
                {(i !== 0 || (shirts[0].size !== null || shirts[0].type !== null)) ? <i className="fas fa-trash "></i> : null}
                </div>
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
