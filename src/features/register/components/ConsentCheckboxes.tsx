import { FormGroup, Input, Label } from "reactstrap";
import { AboutPaths } from "../../about/pages/AboutHT";
import { NavLink as RRNavLink } from "react-router-dom";
import { useState } from "react";
import Consent from "../../../components/Consent";

interface ConsentCheckboxesProp {
  onAllChecked: (allChecked: boolean) => void;
}

export const ConsentCheckboxes = ({ onAllChecked }: ConsentCheckboxesProp) => {
  const [checkedStates, setCheckedStates] = useState([false, false, false]);

  const handleToggle = (index: number) => {
    const updatedStates = [...checkedStates];
    updatedStates[index] = !updatedStates[index];
    setCheckedStates(updatedStates);
    onAllChecked(updatedStates.every((state) => state));
  };

  return (
    <>
      <FormGroup check>
        <Label for="checkbox0" className="consent-checkbox">
          <Input
            id="checkbox0"
            type="checkbox"
            checked={checkedStates[0]}
            onClick={() => handleToggle(0)}
          />{" "}
          Jag accepterar att Hensmåla Triathlon sparar data om mig.
        </Label>
        <Consent
          buttonText="Vad betyder detta?"
          title="Information om sparad data"
        />
      </FormGroup>
      <FormGroup check>
        <Label for="checkbox1">
          <Input
            id="checkbox1"
            type="checkbox"
            checked={checkedStates[1]}
            onClick={() => handleToggle(1)}
          />{" "}
          Jag kommer att följa Hensmåla Triathlons{" "}
          <RRNavLink
            target="_blank"
            rel="noopener noreferrer"
            to={"/om-ht/" + AboutPaths.rules}
          >
            regler
          </RRNavLink>{" "}
          och den anmälningsinformation som finns på denna sida.
        </Label>
      </FormGroup>
      <FormGroup check>
        <Label for="checkbox2">
          <Input
            id="checkbox2"
            type="checkbox"
            checked={checkedStates[2]}
            onClick={() => handleToggle(2)}
          />{" "}
          Jag accepterar att bilder och filmer sparas och kan användas på
          internet.
        </Label>
      </FormGroup>
    </>
  )
}
