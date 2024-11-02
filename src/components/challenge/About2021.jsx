import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AboutChallenge = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div onClick={toggle} className="button-style">
      <span>Om Corona Edition</span>
      <i className="fas fa-lightbulb icon-style"></i>

      <Modal
        isOpen={modal}
        toggle={toggle}
        style={{
          minWidth: "60vw",
        }}
      >
        <ModalHeader toggle={toggle}>
          Om Hensmåla Triathlon 2021 - Corona Edition
        </ModalHeader>
        <ModalBody>
          <p>
            År 2021 gick Hensmåla triathlon som två delar. Den första delen gick ut på att alla deltagare fick ta sig till Hensmåla och genomföra den ordinarie sträckor med start i grupper om max 8. Efter detta lades inläggen på denna sida upp där det gick att ladda upp bilder, skriva en liten text och ange sin tid. Det var också möjligt att dölja sin tid om så önskades, men då utan möjligheten att gå vidare.  
          </p>
          <p>
            De 10 snabbaste damer och herrar gick sedan vidare till finalen. Finalen var mer lik ett vanligt år men då med färre deltagare och mindre publik. Både delar av första delen och finalen finns att se på sidan Media under Videos.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Stäng
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AboutChallenge;
