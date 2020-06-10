import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  FormText,
  Label,
} from "reactstrap";

const UploadModal = (props) => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <div>
      <Button
        color="success"
        style={{
          margin: "auto",
          display: "flex",
          alignItems: "center",
        }}
        onClick={toggle}
      >
        Lägg till ditt bidrag
        <i class="fa fa-plus" style={{ marginLeft: 5, color: "white" }}></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ladda upp bidrag</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="titel">Titel*</Label>
              <Input type="text" name="titel" id="titel" />
            </FormGroup>
            <FormGroup>
              <Label for="ingress">Ingress</Label>
              <Input type="text" name="ingress" id="ingress" />
            </FormGroup>
            <FormGroup>
              <Label for="text">Hur var din runda?</Label>
              <Input type="text" name="text" id="text" />
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">
                Bild som representerar utmaningen*
              </Label>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
                Detta kan vara på dig själv eller din omgivning.
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="exampleFile">Bild på rundan (valfri) </Label>
              <Input type="file" name="file" id="exampleFile" />
              <FormText color="muted">
                Om du har en app eller löparklocka kan du ta en skärmdump på
                rundan.
              </FormText>
            </FormGroup>
            <FormGroup>
              <FormText color="muted">* obligatoriska fält.</FormText>
            </FormGroup>
          </Form>
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

export default UploadModal;
