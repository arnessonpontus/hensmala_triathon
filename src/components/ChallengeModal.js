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
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);

  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };

  return (
    <div>
      <Button onClick={toggleModal}>Visa mer</Button>
      <Modal isOpen={modal} toggle={toggleModal} style={{ minWidth: "80vw" }}>
        <ModalHeader toggle={toggleModal}>{props.info.name}</ModalHeader>
        <ModalBody>
          <Row>
            <Col xs="12" md="6">
              <h2>{props.info.title}</h2>
              <p>
                <i>{props.info.date}</i>
              </p>
              <div style={{ whiteSpace: "pre-wrap" }}>{props.info.text}</div>
            </Col>
            <Col
              xs="12"
              md="6"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {props.info.imgs.length > 1 ? (
                <div>
                  <ChallengeCarousell
                    toggleNested={toggleNested}
                    userChall={props.info}
                  />
                  <i style={{ margin: "auto" }}>
                    Klicka på pilarna för att byta bild
                  </i>
                </div>
              ) : (
                <img
                  onClick={toggleNested}
                  width="100%"
                  style={{ objectFit: "contain", cursor: "pointer" }}
                  src={props.info.imgs[0]}
                />
              )}
            </Col>
          </Row>

          <br />

          <Modal
            isOpen={nestedModal}
            toggle={toggleNested}
            onClosed={closeAll ? toggleModal : undefined}
          >
            <img width="100%" src={props.info.imgs[0]}></img>
          </Modal>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ChallengeModal;
