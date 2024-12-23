import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { ElevatedButton } from "../../../components/Button/ElevatedButton";

const AboutChallenge = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  
  return (
    <>
    <ElevatedButton onClick={toggle}>
      <span>Om Corona Edition</span>
      <i className="fas fa-lightbulb icon-style"></i>
    </ElevatedButton>
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
            De 10 snabbaste damer och herrar gick sedan vidare till finalen. Finalen var mer lik ett vanligt år men då med färre deltagare och mindre publik. En video från 2021 finns att se på sidan för <Link to={"/videos"}>videos</Link>.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Stäng
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default AboutChallenge;
