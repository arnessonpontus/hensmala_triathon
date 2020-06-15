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
  Spinner,
  Alert,
} from "reactstrap";
import ConsentChallenge from "./ConsentChallenge";
import * as firebase from "firebase";
import imageCompression from "browser-image-compression";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";

const UploadModal = (props) => {
  const [modal, setModal] = useState(false);
  const [consentAccept, setConsentAccept] = useState(false);
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [text, setText] = useState("");
  const [img1, setImg1] = useState(null);
  const [img1Url, setImg1Url] = useState("");
  const [img2, setImg2] = useState(null);
  const [img2Url, setImg2Url] = useState("");
  const [hasDonated, setHasDonated] = useState(false);
  const [hasRun, setHasRun] = useState(false);
  const [hasSwim, setHasSwim] = useState(false);
  const [hasBike, setHasBike] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggle = () => {
    setError("");
    setConsentAccept(false);
    setModal(!modal);
  };

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

  const handleImg1Change = (e) => {
    if (e.target.files[0]) {
      compressImage(e.target.files[0], 1);
    }
  };

  const handleImg2Change = (e) => {
    if (e.target.files[0]) {
      compressImage(e.target.files[0], 2);
    }
  };

  const compressImage = (image, imgNumber) => {
    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    // Compresses the image before adding it to state
    imageCompression(image, options)
      .then(function (compressedFile) {
        if (imgNumber == 1) {
          setImg1(compressedFile);
        } else {
          setImg2(compressedFile);
        }
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const checkValidation = () => {
    if (!title) {
      setError("Du måste ange en titel!");
      return false;
    } else if (!img1) {
      setError("Du måste ladda upp minst en bild!");
      return false;
    } else if (!name) {
      setError("Du måste ange ett namn!");
      return false;
    } else {
      return true;
    }
  };

  const storage = firebase.storage();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkValidation()) return;
    setLoading(true);

    if (!img1) return;

    const sessionId = new Date().getTime();

    const uploadTask1 = storage
      .ref(`images/${sessionId + img1.name}`)
      .put(img1);
    uploadTask1.on(
      "state_changed",
      (snapshot) => {
        // Can set progress/loading here
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(sessionId + img1.name)
          .getDownloadURL()
          .then((url1) => {
            setImg1Url(url1);
            // Can reduce to one function
            if (img2) {
              const uploadTask2 = storage
                .ref(`images/${sessionId + img2.name}`)
                .put(img2);
              uploadTask2.on(
                "state_changed",
                (snapshot) => {
                  // Can set progress/loading here
                },
                (error) => {
                  console.log(error);
                },
                () => {
                  storage
                    .ref("images")
                    .child(sessionId + img2.name)
                    .getDownloadURL()
                    .then((url2) => {
                      uploadChallenge([url1, url2]);
                      setImg1Url(url2);
                    });
                }
              );
            } else {
              uploadChallenge([url1]);
            }
          });
      }
    );
  };

  // TODO: security and error checking
  const uploadChallenge = (urls) => {
    var now = new Date();
    var date =
      now.getFullYear() +
      "-" +
      ("0" + (now.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + now.getDate()).slice(-2);
    var time =
      ("0" + now.getHours()).slice(-2) +
      ":" +
      ("0" + now.getMinutes()).slice(-2);
    var dateTime = date + " " + time;

    firebase
      .database()
      .ref("/challenges")
      .push({
        name: name,
        title: title,
        time: dateTime,
        imgs: urls,
        text: text,
        hasDonated: hasDonated,
        hasRun: hasRun,
        hasSwim: hasSwim,
        hasBike: hasBike,
      })
      .then((snapshot) => {
        // To prevent reads for phone numbers by firebase rules
        firebase
          .database()
          .ref("/phoneNumbers")
          .push({
            challengeID: snapshot.key,
            phone: phone,
          })
          .then(() => {
            setLoading(false);
            props.setHasUpdated(!props.hasUpdated);
            toggle();
          })
          .catch((err) => {
            setLoading(false);
            setError("Något gick fel.");
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        setError("Något gick fel");
        console.log(err);
      });
  };

  const onRecaptcha = (value) => {
    console.log("value: " + value);
    const body = { value };
    axios
      .post(
        "https://us-central1-hensmala-triathlon.cloudfunctions.net/helloWorld",
        body
      )
      .then((res) => {
        console.log(res);
        alert(res.data);
      })
      .catch((err) => alert(err));
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
        <i className="fa fa-plus" style={{ marginLeft: 5, color: "white" }}></i>
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ladda upp bidrag</ModalHeader>
        <ModalBody>
          {error ? <Alert color="danger">{error}</Alert> : null}
          <Form>
            <FormGroup>
              <Label for="titel">Titel*</Label>
              <Input
                placeholder="En härlig runda för ALS"
                value={title}
                maxLength="40"
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
                placeholder="Förnamn Efternamn"
                required
                maxLength="40"
                type="text"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Telefon</Label>
              <Input
                type="tel"
                placeholder="0705773442"
                maxLength="12"
                name="phone"
                id="phone"
                value={phone}
                onChange={(e) => setphone(e.target.value)}
              />
              <FormText color="muted">
                Detta är så vi kan kontakta dig om du vinner.
              </FormText>
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
              <Input
                required
                type="file"
                accept="image/*"
                name="img1"
                id="img1"
                onChange={handleImg1Change}
              />
              <FormText color="muted">
                Detta kan vara på dig själv eller din omgivning.
              </FormText>
            </FormGroup>
            <FormGroup>
              <Label for="img2">Bild på rundan (valfritt) </Label>
              <Input
                type="file"
                name="img2"
                id="img2"
                onChange={handleImg2Change}
              />
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
          {error ? <Alert color="danger">{error}</Alert> : null}
          <ReCAPTCHA
            sitekey=">site-key>" // Change
            onChange={onRecaptcha}
          />
        </ModalBody>
        <ModalFooter
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <FormGroup check>
            <div style={{ display: "flex" }}>
              <Label for="checkbox1" className="mr-1">
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
            size="lg"
            style={{ display: "flex", alignItems: "center" }}
          >
            {loading ? <Spinner size="sm" color="light" /> : "Lägg upp"}
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default UploadModal;
