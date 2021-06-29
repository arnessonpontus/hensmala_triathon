// This will be removed for when Challenge is no longer needed and get replaced by the original "Consent"

import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Consent = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <i style={{ color: "#909090", cursor: "pointer" }} onClick={toggle}>
        Läs vilkoren här.
      </i>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Information om sparad data</ModalHeader>
        <ModalBody>
          Hensmåla Triathlon kommer spara namn, text och bilder för att visa för
          användare av hensmalatriathlon.se. Ditt telefonnummer och email visas
          ej, men sparas för att kunna kontakta dig i framtiden om du vinner ett
          pris, dock som längst till 1 augusti 2022.
          <br></br>
          <br></br>
          Om du önskar att vi ska ta bort, eller redigera dina uppgifter kan du
          kontakta hensmala.triathlon@gmail.com.
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
