import React, { useState, useRef } from "react";
import { Input } from "reactstrap";
import { ElevatedButton } from "../../../components/Button/ElevatedButton";
import styled from "styled-components";

export const ExtraDonationButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ExtraDonation = (props: { setDonation: (val: number) => void }) => {
  const [selectedItem, setSelectedItem] = useState(-1);

  const lastFreeDonation = useRef(0);
  const suggestedAmount = [50, 100, 200, 500, 1000];

  function onFreeDonationChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = Number(e.target.value);
    if (value < 0) {
      value = 0;
    }
    lastFreeDonation.current = value
    props.setDonation(value)
  }

  function onDonationItemClicked(i: number, amount: number) {
    setSelectedItem(i);
    if (amount !== null) {
      props.setDonation(amount);
    }
  }

  return (
    <ExtraDonationButtons>
      <ElevatedButton type="button" medium onClick={() => onDonationItemClicked(-1, 0)} selected={selectedItem === -1}>Nej tack</ElevatedButton>
      {suggestedAmount.map((amount, i) => {
        return (
          <ElevatedButton medium type="button" key={amount} onClick={() => onDonationItemClicked(i, amount)} selected={i === selectedItem}>{amount}kr</ElevatedButton>
        )
      })}
      <ElevatedButton medium type="button" onClick={() => onDonationItemClicked(Infinity, lastFreeDonation.current)} selected={Infinity === selectedItem}>
        Annat
        <Input onChange={(e) => onFreeDonationChange(e)} type="number" min="0" />
        </ElevatedButton>
    </ExtraDonationButtons>
  );
}

export default ExtraDonation;
