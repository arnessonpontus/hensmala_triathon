import { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

interface ConsentProps {
  buttonText: string,
  title: string
}

const ConsentModal = ({ buttonText, title }: ConsentProps) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div className="consent-button">
      <i onClick={toggle}>
        {buttonText}
      </i>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>{title}</ModalHeader>
        <ModalBody>
          Hensmåla Triathlon kommer spara de angivna uppgifterna för att hantera
          anmälningar till tävlingen och beställningar av kläder. Dessa uppgifter behövs för att
          kunna kontakta och hantera alla personer som kommer på loppet eller beställer kläder.
          <br></br>
          <br></br>
          Om du önskar att vi ska ta bort dina uppgifter tidigare kan du kontakta
          hensmala.triathlon@gmail.com. Dock kommer du då ej kunna vara
          med på loppet eller ta emot dina kläder.
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

export default ConsentModal;
