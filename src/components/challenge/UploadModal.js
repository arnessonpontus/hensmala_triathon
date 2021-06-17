import React, { Fragment, useState } from "react";
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
import { TimePicker } from "../TimeUtils";

const UploadModal = (props) => {
  const [modal, setModal] = useState(false);
  const [consentAccept, setConsentAccept] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phone, setphone] = useState("");
  const [text, setText] = useState("");
  const [imgs, setImgs] = useState([null]);
  const [imgLoading, setImgLoading] = useState([false]);
  const [hour, setHour] = useState(-1);
  const [min, setMin] = useState(-1);
  const [sec, setSec] = useState(-1);
  const [hideResults, setHideResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggle = () => {
    setError("");
    setConsentAccept(false);
    setHideResults(false);
    setModal(!modal);
  };

  const addImage = () => {
    setImgs([...imgs, null]);
    setImgLoading([...imgLoading, false]);
  };

  const handleImgChange = (e, imgNumber) => {
    if (e.target.files[0]) {
      compressImage(e.target.files[0], imgNumber);
    }
  };

  const compressImage = (image, imgNumber) => {
    let newLoadingArr = [...imgLoading];
    newLoadingArr[imgNumber] = true;
    setImgLoading(newLoadingArr);

    const options = {
      maxSizeMB: 0.2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    // Compresses the image before adding it to state
    imageCompression(image, options)
      .then(function (compressedFile) {
        let newImgs = [...imgs];
        newImgs[imgNumber] = compressedFile;
        setImgs(newImgs);

        let newLoadingArr = [...imgLoading];
        newLoadingArr[imgNumber] = false;
        setImgLoading(newLoadingArr);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };

  const checkValidation = () => {
    if (!imgs[0]) {
      setError("Du måste ladda upp minst en bild!");
      return false;
    } else if (!name) {
      setError("Du måste ange ett namn!");
      return false;
    } else if (hour === -1 || min === -1 || sec === -1) {
      setError("Du måste ange genomförandets tid!");
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

    const sessionId = new Date().getTime();

    const urls = [];
    const validImgs = imgs.filter((img) => img != null);
    const uploadImgs = new Promise((resolve, reject) => {
      validImgs.forEach((img, i) => {
        const uploadTask = storage
          .ref(`images_2021/${sessionId + img.name}`)
          .put(img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Can set progress/loading here
          },
          (error) => {
            console.log(error);
          },
          () => {
            storage
              .ref("images_2021")
              .child(sessionId + img.name)
              .getDownloadURL()
              .then((url) => {
                urls.push(url);
                if (i === validImgs.length - 1) resolve();
              });
          }
        );
      });
    });
    uploadImgs.then(() => {
      uploadChallenge(urls);
    });
  };

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
      .ref("/entries")
      .push({
        name: name,
        raceTime: hour * 60 * 60 + min * 60 + sec,
        uploadTime: dateTime,
        imgs: urls,
        text: text,
        hideResults: hideResults,
      })
      .then((snapshot) => {
        // To prevent reads for phone numbers by firebase rules
        firebase
          .database()
          .ref("/contactInfo")
          .push({
            challengeID: snapshot.key,
            name: name,
            email: email,
            phone: phone,
          })
          .then(() => {
            setLoading(false);
            props.setHasUpdated(true);
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

  const removeImg = (idx) => {
    const newImgs = [...imgs];
    if (idx === 0) {
      newImgs[0] = null;
    } else {
      newImgs.splice(idx, 1);
    }

    setImgs(newImgs);
  };

  return (
    <div>
      <div onClick={toggle} className="button-style upload-button">
        <span>Ladda upp bidrag</span>
        <i className="fas fa-upload icon-style"></i>
      </div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Ladda upp bidrag</ModalHeader>
        <ModalBody>
          {error ? <Alert color="danger">{error}</Alert> : null}
          <Form>
            <FormGroup>
              <Label for="name">Namn *</Label>
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
              <Label for="text">Frivillig text om rundan</Label>
              <Input
                type="textarea"
                name="text"
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Tid det tog att genomföra *</Label>
              <div style={{ display: "flex" }}>
                <TimePicker
                  handleChange={(e) => setHour(parseInt(e.target.value))}
                  elemName="Timmar"
                />
                <TimePicker
                  handleChange={(e) => setMin(parseInt(e.target.value))}
                  elemName="Minuter"
                />
                <TimePicker
                  handleChange={(e) => setSec(parseInt(e.target.value))}
                  elemName="Sekunder"
                />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for={"img0"}>Bild *</Label>
              {imgs.map((img, i) => {
                return (
                  <div key={i}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {imgLoading[i] ? (
                        <Spinner type="grow" color="primary" />
                      ) : null}
                      {img ? (
                        <div onClick={() => removeImg(i)}>
                          <img
                            style={{ marginTop: 5, marginBottom: 20 }}
                            alt="förhansvisning"
                            width={100}
                            src={URL.createObjectURL(img)}
                          ></img>
                        </div>
                      ) : null}

                      <label
                        htmlFor={"img" + i}
                        className="button-style"
                        style={{ marginLeft: 0 }}
                      >
                        {!img ? (
                          <Fragment>
                            <span>Välj bild</span>
                            <i className="fas fa-image icon-style"></i>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <span>Ändra bild</span>
                            <i className="fas fa-pen icon-style"></i>
                          </Fragment>
                        )}
                      </label>
                      <Input
                        required={i === 0 ? true : false}
                        type="file"
                        accept="image/*"
                        name="img"
                        id={"img" + i}
                        onChange={(e) => handleImgChange(e, i)}
                        style={{ display: "none" }}
                      />
                    </div>
                    {imgs.length - 1 === i ? (
                      <p>
                        <div
                          className="button-style"
                          style={{
                            width: 120,
                            height: 30,
                            textDecoration: "none",
                            backgroundColor: "#11999E",
                            color: "white",
                            marginLeft: 0,
                          }}
                          onClick={addImage}
                        >
                          + Lägg till fler
                        </div>
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </FormGroup>

            <FormGroup>
              <Label for="titel">Email</Label>
              <Input
                placeholder="din.email@mail.com"
                value={email}
                maxLength="60"
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
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
                Dessa är så vi kan kontakta dig om du vinner. Kommer ej att
                visas.
              </FormText>
            </FormGroup>
            <FormGroup>
              <FormText color="bold">* obligatoriska fält.</FormText>
            </FormGroup>
            <FormGroup check inline>
              <Label check>
                <Input
                  type="checkbox"
                  value={hideResults}
                  onClick={() => setHideResults(!hideResults)}
                />{" "}
                Dölj min placering och tid från hemsidan
              </Label>
            </FormGroup>
            <FormText color="muted">
              Om du döljer detta kommer du ej kunna vara med i finalen.
            </FormText>
          </Form>
          {error ? <Alert color="danger">{error}</Alert> : null}
        </ModalBody>
        <ModalFooter
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <FormGroup check>
            <div>
              <Label for="checkbox1">
                <Input
                  className="checkbox1"
                  type="checkbox"
                  onClick={() => setConsentAccept(!consentAccept)}
                />{" "}
                <span>Jag accepterar villkoren.</span>
                <ConsentChallenge />
              </Label>
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
