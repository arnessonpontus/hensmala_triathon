import React, { useState, useRef } from "react";
import { Input } from "reactstrap";

const ExtraDonation = (props) => {
  const [selectedItem, setSelectedItem] = useState(-1);

  const lastFreeDonation = useRef(0);
  const suggestedAmount = [50, 100, 200, 500, 1000];

  function onFreeDonationChange(e) {
    let value = Number(e.target.value);
    if (value < 0) {
      value = 0;
    }
    lastFreeDonation.current = value
    props.setDonation(value)
  }

  function onDonationItemClicked(i, amount) {
    setSelectedItem(i);
    if (amount !== null) {
      props.setDonation(amount);
    }
  }

  return (
    <div id="extra-donation" className="extra-donation">
      <div onClick={() => onDonationItemClicked(-1, 0)} className={`button-style donation-item ${selectedItem === -1 ? "selected" : null}`}>Nej tack</div>
      {suggestedAmount.map((amount, i) => {
        return(
          <div onClick={() => onDonationItemClicked(i, amount)} className={`button-style donation-item ${i === selectedItem ? "selected" : null}`}>{amount}kr</div>
        )
      })}
      <div onClick={() => onDonationItemClicked(Infinity, lastFreeDonation.current)} className={`button-style donation-item optional-donation-button ${Infinity === selectedItem ? "selected" : null}`}>
        Annat
        <Input onChange={(e) => onFreeDonationChange(e)} className="optional-donation-input" bsSize="sm" id="open-donation" type="number" min="0"/></div>
    </div>
  );

}

export default ExtraDonation;
