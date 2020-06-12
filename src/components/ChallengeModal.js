import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import ChallengeCarousell from "./ChallengeCarousell";

const ChallengeModal = (props) => {
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  return (
    <div>
      <Button onClick={toggle}>Visa mer</Button>
      <Modal isOpen={modal} toggle={toggle} style={{ minWidth: "80vw" }}>
        <ModalHeader toggle={toggle}>{props.info.name}</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12" md="6">
              <h2>{props.info.title}</h2>
              <p>
                <i>{props.info.date}</i>
              </p>
              <p>{props.info.text}</p>
            </Col>
            <Col
              xs="12"
              md="6"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {props.info.imgs.length > 1 ? (
                <div>
                  <ChallengeCarousell
                    userChall={props.info}
                  ></ChallengeCarousell>
                  <i style={{ margin: "auto" }}>
                    Klicka på pilarna för att byta bild
                  </i>
                </div>
              ) : (
                <img
                  width="100%"
                  style={{ objectFit: "contain" }}
                  src={props.info.imgs[0]}
                />
              )}
            </Col>
          </Row>

          <br />

          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggle : undefined}
          >
            <img width="100%" src={props.info.img}></img>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ChallengeModal;
