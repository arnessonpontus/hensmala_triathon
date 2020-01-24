import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Consent = props => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <i style={{ color: "#909090", cursor: "pointer" }} onClick={toggle}>
        Vad betyder detta?
      </i>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Information om sparad data</ModalHeader>
        <ModalBody>
          Hensmåla Triathlon kommer spara uppgifter för att hantera anmälningar
          till tävlingen. Dessa uppgifter behövs för att kunna hantera alla
          deltagare och se till att tävlingen blir så bra som möjligt.
          <br></br>
          <br></br>
          Om du önskar att vi ska ta bort dina uppgifter kan du kontakta
          hensmala.triathlon@gmail.com. Dock kommer du ej kunna vara med på
          loppet om detta genomförs innan den 1:e augusti 15.00.
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

export default Consent;
