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
          <Col>
            <h2>{props.info.title}</h2>
            <b>{props.info.ingress}</b>
            <p>
              <i>{props.info.date}</i>
            </p>
            <p>{props.info.text}</p>
          </Col>
          <Col>
            <img width="100%" src={props.info.img} onClick={toggleNested}></img>
          </Col>

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
