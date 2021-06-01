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
          <h4>Allmänt</h4>
          <p>
            Även 2021 är ett annorlunda år. Detta innebär tyvärr att det heller
            inte kan bli ett helt vanligt Hensmåla Triathlon. Vi anordnar dock i
            år en variant som är mer lik den version ni är vana vid! Loppet
            genomförs i år enskilt eller i grupper på plats, men mestadels utan
            publik och funktionärer.
          </p>
          <h4>Viktigt att Tänka på</h4>
          <p>
            Eftersom loppet genomförs mestadels helt utan funktionärer är det
            extra viktigt att vara uppmärksam både i trafiken när vägen ska
            korsas och vid simningen. Tänk på att bilar kan komma i hög fart, så
            rusa inte över utan att noggrant se er för innan. Vid simningen
            rekommenderar vi att ni har någon som kan vara med i följebåt (båt
            med livboj finns att låna vid stranden). Skriv i informationsfältet
            vid anmälan om ni vill ha förklaring av sträckor, har andra frågor,
            eller om ni behöver någon som ror så kan vi försöka hjälpa till. Den
            3:e och 4:e juli kommer några funktionärer finnas på plats som kan
            hjälpa till.
          </p>

          <h4>Innan Loppet</h4>
          <p>
            Man kan anmäla och tillsammans genomföra loppet med som mest 8
            personer åt gången. Triathlonet genomför du vid valfri tid mellan
            datumen 2/7 - 16/7, som du specificerar vid anmälan. Efter att tiden
            blivit godkänd och startavgiften betald är du välkommen att
            genomföra loppet på plats. För att hitta hit kan du kolla{" "}
            <RRNavLink
              target="_blank"
              rel="noopener noreferrer"
              to="/om-ht/hitta-hit"
            >
              här
            </RRNavLink>
            .
          </p>
          <h4>Under Loppet</h4>
          <p>
            Starten sker som vanligt från vattnet vid stranden, sedan är det
            nästan exakt de vanliga sträckorna som gäller. För att se ordinarie
            sträckor kan man titta{" "}
            <RRNavLink
              target="_blank"
              rel="noopener noreferrer"
              to="/om-ht/strackor"
            >
              här
            </RRNavLink>
            .
          </p>
          <p>Deltagarna registrerar sin egen tid, tidtagarur finns att låna.</p>
          <h4>Efter Loppet</h4>
          <p>
            Alla som har genomfört loppet laddar sedan upp sitt resultat,
            tillsammans med bild och text om man vill, på denna sidan. Om man
            inte vill visa sin tid eller placering kan man välja att dölja
            detta.
          </p>

          <p>
            Efter den 16:e juli samlas alla tider in och 18 juli planerar vi en
            final för de snabbaste damerna och herrarna. Den som sedan vinner
            finalen blir vinnare av Hensmåla Triathlon 2021 - Corona Edition!
          </p>
          <i>Startavgift: 250kr</i>
          <p>
            Hela startavgiften och övriga donationer går till ALS-forskningen.
          </p>
          <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
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
