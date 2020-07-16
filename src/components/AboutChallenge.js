// This will be removed for when Challenge is no longer needed and get replaced by the original "Consent"

import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const AboutChallenge = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button onClick={toggle} className="ml-3" outline color="secondary">
        Vad innebär utmaningen <i className="fas fa-question"></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Om Utmaningen</ModalHeader>
        <ModalBody>
          <p>
            2020 är inget vanligt år. Detta innebär tyvärr att det heller inte
            blir ett vanligt Hensmåla Triathlon. Vi uppmanar dock alla att
            fortsätta röra på sig även i dessa tider. Vi har därför i år skapat
            något vi kallar "Utmaningen"!
          </p>

          <p>
            "Triathlonet" genomför du av valfri längd och antal grenar. Om du
            vill, lägger du upp tider för de sträckor du gjort i fritext-fältet.
            Du kan också som bild 2 lägga till en skärmdump på din runda.
          </p>

          <p>
            Man kan lägga upp hur många aktiviteter man vill men varje aktivitet
            bör vara genomförd under ett dygn.
          </p>
          <p>
            Målet är att göra ett helt triathlon, men det går fint att endast
            köra en eller två grenar också.
          </p>
          <p>
            Efter 1 augusti kommer vi att lotta ut priser bland alla som lagt in
            en aktivitet. Donera gärna en slant till vår{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://egnainsamlingar.neuro.se/fundraisers/utmaningen1"
            >
              insamling
            </a>{" "}
            till{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://neuro.se/diagnoser/amyotrofisk-lateralskleros-als/"
            >
              ALS-forskningen
            </a>{" "}
            (glöm inte markera detta genom att klicka i "Jag har
            donerat"-knappen.)
          </p>
          <b>Utmaningen slutar den 1 augusti.</b>
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
