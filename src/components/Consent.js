import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Consent = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <i className="consent-button" onClick={toggle}>
        {props.buttonText}
      </i>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{props.title}</ModalHeader>
        <ModalBody>
          Hensmåla Triathlon kommer spara uppgifter för att hantera
          anmälningar till tävlingen. Dessa uppgifter behövs för att
          kunna hantera alla deltagare och se till att evemanget blir så
          bra som möjligt.
          <br></br>
          <br></br>
          Om du önskar att vi ska ta bort dina uppgifter kan du kontakta
          hensmala.triathlon@gmail.com. Dock kommer du då ej kunna vara
          med på loppet.
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
