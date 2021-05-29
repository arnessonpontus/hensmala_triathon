import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

const AboutChallenge = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div onClick={toggle} className="button-style">
      <span>Om årets lopp</span>
      <i className="fas fa-lightbulb icon-style"></i>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Om Hensmåla Triathlon 2021 - Corona Edition
        </ModalHeader>
        <ModalBody>
          <p>
            2021 är tyvär inte heller något vanligt år. Detta innebär tyvärr att
            det heller inte kan bli ett helt vanligt Hensmåla Triathlon. Vi
            annordnar dock i år en variant som är mer lik den version ni är vana
            vid.
          </p>

          <p>
            Triathlonet genomför du vid valfri tid mellan datumen 2/7 - 16/7,
            som du specificerar vid anmälan. Efter att anmälan och tiden blivit
            godkänd är du välkommen att komma till platsen där den vanliga
            starten för Hensmåla Triathlon brukar gå. För att hitta hit kan du
            kolla{" "}
            <RRNavLink
              target="_blank"
              rel="noopener noreferrer"
              to="/om-ht/hitta-hit"
            >
              här
            </RRNavLink>
            .{" "}
          </p>
          <p>
            Loppet utförs utan funktionärer så därför är det extra viktigt att
            vara uppmärksam i trafiken när vägen ska korsas. Deltagarna
            registrerar därför sin egen tid, där tidtagarur finns att låna.
          </p>
          <p>
            Eftersom inga funktionärer kommer vara på plats vid simningen
            rekommenderar vi att ni har någon som kan vara med i följebåt (båt
            med livboj finns att låna vid stranden).
          </p>

          <p>
            Man kan anmäla, och tillsammans genomföra loppet med, som mest 8
            personer åt gången.
          </p>

          <p>
            Alla som genomför laddar sedan upp sitt resultat, tillsammans med
            bild och text om man vill, på denna sidan. Om man inte vill visa sin
            tid eller placering kan man välja att dölja detta.
          </p>

          <p>
            Efter den 16:e juli samlas alla tider in och 18 juli planerar vi en
            final för de snabbaste damerna och herrarna. Den som sedan vinner
            finalen blir vinnare av Hensmåla Triathlon 2021 - Corona Edition!
          </p>
          <p>
            Donera gärna en slant till vår{" "}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://egnainsamlingar.neuro.se/projects/neuro-10"
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
          </p>
          <b>Loppet är öppet mellan 2:e juli och 16:e juli.</b>
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
