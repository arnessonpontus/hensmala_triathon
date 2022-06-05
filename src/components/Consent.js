import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Consent = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="consent-button">
      <i onClick={toggle}>
        {props.buttonText}
      </i>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
        <ModalBody>
          Hensmåla Triathlon kommer spara de angivna uppgifterna för att hantera
          anmälningar till tävlingen och beställningar av t-shirts. Dessa uppgifter behövs för att
          kunna kontakta och hantera alla personer som kommer på loppet eller beställer t-shirts.
          <br></br>
          <br></br>
          Om du önskar att vi ska ta bort dina uppgifter tidigare kan du kontakta
          hensmala.triathlon@gmail.com. Dock kommer du då ej kunna vara
          med på loppet eller ta emot din t-shirt.
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
