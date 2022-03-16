import React, { useState } from "react";
import { Input } from "reactstrap";
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css'; // This only needs to be imported once in your app

const ShirtSelect = (props) => {
  const [shirts, setShirts] = useState([{size: null, amount: null}]);
  const [isOpen, setIsOpen] = useState(false);

  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "XXXL"];
  const amounts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  function addShirt() {
    const newShirts = [...shirts, {size: null, amount: null}]
    setShirts(newShirts);
  }

  const deleteShirt = (idx) =>  {
    const newShirts = [...shirts];
      if (idx === 0) {
        newShirts[0] = {size: null, amount: null};
      } else {
        newShirts.splice(idx, 1);
      }
  
      setShirts(newShirts);
      props.updateShirtSelection(newShirts);
  };

  // Set the size or amount value of the shirt
  function updateShirtValues(field, idx, value) {
    const newShirts = [...shirts];
    newShirts[idx][field] = value;
    setShirts(newShirts);
    props.updateShirtSelection(newShirts);
  }

  return (
    <div className="shirt-component" id="shirt-select">
      <img width="100%" class="thumbnail-shirt" src="/images/tshirt_2022_mockup_small.png" onClick={() => setIsOpen(true)}></img>
      {isOpen && (
          <Lightbox
            wrapperClassName="lightbox"
            mainSrc="/images/tshirt_2022_mockup_large.png"
            onCloseRequest={() => setIsOpen(false)}
          />
        )}
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
                name={"amount"}
                onChange={(e) => updateShirtValues("amount", i, Number(e.target.value))}
              >
                <option disabled selected={shirt.amount === null} value>
                  Antal
                </option>
                  {amounts.map((amount) => {
                    return (
                      <option selected={shirt.amount === amount} value={amount} key={amount}>
                        {amount}
                      </option>
                    );
                  })}
              </Input>
              <div className="delete-icon" onClick={() => deleteShirt(i)}>
              {(i !== 0 || (shirts[0].size !== null || shirts[0].amount !== null)) ? <i className="fas fa-trash "></i> : null}
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
