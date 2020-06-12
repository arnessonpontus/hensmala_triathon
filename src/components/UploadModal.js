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
import ConsentChallenge from "./ConsentChallenge";
import * as firebase from "firebase";

const UploadModal = (props) => {
  const [modal, setModal] = useState(false);
  const [consentAccept, setConsentAccept] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");
  const [img1, setImg1] = useState("");
  const [img2, setImg2] = useState("");
  const [hasDonated, setHasDonated] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [hasSwim, setHasSwim] = useState(false);
  const [hasBike, setHasBike] = useState(false);

  const toggle = () => setModal(!modal);

  const toggleConsent = () => {
    setConsentAccept(!consentAccept);
  };

  const toggleCheckboxes = (type) => {
    switch (type) {
      case "hasDonated":
        setHasDonated(!hasDonated);
        break;
      case "hasRun":
        setHasRun(!hasRun);
        break;
      case "hasBike":
        setHasBike(!hasBike);
        break;
      case "hasSwim":
        setHasSwim(!hasSwim);
        break;

      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    console.log("in submit yo");
    e.preventDefault();

    var now = new Date();
    var date =
      now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    var dateTime = date + " " + time;

    firebase
      .database()
      .ref("/registrations")
      .push({
        name: name,
        email: email,
        title: title,
        time: dateTime,
        text: text,
        hasDonated: hasDonated,
        hasRun: hasRun,
        hasSwim: hasSwim,
        hasBike: hasBike,
      })
      .then(toggle())
      .catch((err) => console.log(err));
  };

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
              <Input
                value={title}
                maxlength="40"
                required
                type="text"
                name="titel"
                id="titel"
                onChange={(e) => setTitle(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Namn*</Label>
              <Input
                required
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Epost*</Label>
              <Input
                required
                type="text"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="text">Hur var din runda?</Label>
              <Input
                type="textarea"
                name="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="img1">Bild som representerar utmaningen*</Label>
              <Input required type="file" name="img1" id="img1" />
              <FormText color="muted">
                Detta kan vara på dig själv eller din omgivning.
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="img2">Bild på rundan (valfritt) </Label>
              <Input type="file" name="img2" id="img2" />
              <FormText color="muted">
                Om du har en app eller löparklocka kan du ta en skärmdump på
                rundan.
              </FormText>
            </FormGroup>
            <FormGroup>
              <FormText color="muted">* obligatoriska fält.</FormText>
            </FormGroup>

            <FormGroup check>
              <Label check>
                <Input
                  type="checkbox"
                  name="hasDonated"
                  value={hasDonated}
                  onClick={() => toggleCheckboxes("hasDonated")}
                />{" "}
                Jag har donerat till
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://egnainsamlingar.neuro.se/projects/neuro-10"
                >
                  {" "}
                  ALS-forskningen
                </a>{" "}
                (valfritt)
              </Label>
            </FormGroup>
            <FormGroup tag="fieldset">
              <legend>Min runda innehåller:</legend>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    value={hasRun}
                    onClick={() => toggleCheckboxes("hasRun")}
                  />{" "}
                  Löpning
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    value={hasBike}
                    onClick={() => toggleCheckboxes("hasBike")}
                  />{" "}
                  Cykling
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Label check>
                  <Input
                    type="checkbox"
                    value={hasSwim}
                    onClick={() => toggleCheckboxes("hasSwim")}
                  />
                  Simmning
                </Label>
              </FormGroup>
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <FormGroup check>
            <div style={{ display: "flex" }}>
              <Label for="checkbox1">
                <Input
                  className="checkbox1"
                  type="checkbox"
                  onClick={() => toggleConsent()}
                />{" "}
                <span>Jag accepterar </span>
              </Label>
              <ConsentChallenge />
            </div>
          </FormGroup>

          <Button
            onClick={handleSubmit}
            disabled={!consentAccept}
            color="success"
          >
            Lägg upp
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UploadModal;
