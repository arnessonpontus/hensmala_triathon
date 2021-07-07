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
import * as firebase from "firebase";
import imageCompression from "browser-image-compression";
import { TimePicker } from "../TimeUtils";
import Consent from "../Consent";

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

  const handleUpload = () => {
    props.hasUploaded();
    toggle();
    setEmail("");
    setName("");
    setphone("");
    setText("");
    setImgs([null]);
    setHour(-1);
    setMin(-1);
    setSec(-1);
  };
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
      maxSizeMB: 0.3,
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
    } else if (!hideResults && (hour === -1 || min === -1 || sec === -1)) {
      setError("Du måste ange genomförandets tid!");
      return false;
    } else {
      return true;
    }
  };

  const storage = firebase.storage();

  const storeAndUpload = () => {
    const sessionId = new Date().getTime();

    const validImgs = imgs.filter((img) => img != null);

    Promise.all(
      validImgs.map((img) => {
        return new Promise((resolve, reject) => {
          const uploadTask = firebase
            .storage()
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
                  resolve(url);
                })
                .catch((e) => {
                  console.log(e);
                  reject();
                });
            }
          );
        });
      })
    )
      .then((urls) => {
        uploadChallenge(urls);
      })
      .catch((e) => {
        console.log(`Some failed `, e);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!checkValidation()) return;
    setLoading(true);

    window.grecaptcha.ready(() => {
      window.grecaptcha
        .execute("6LcKIqQZAAAAAK88TdJkAsZAOZ4YLSf7VFqtXMNz", {
          action: "submit",
        })
        .then((token) => {
          fetch(`/.netlify/functions/handleRecaptcha/`, {
            method: "POST",
            body: JSON.stringify(token),
          })
            .then((res) => {
              if (res.status === 200) {
                res.json().then((res) => {
                  if (res.data.score > 0.5) {
                    storeAndUpload();
                  } else {
                    alert("Är du en robot? Testa igen.");
                    setLoading(false);
                  }
                });
              } else {
                alert("Något gick fel.");
                setLoading(false);
              }
            })
            .catch((err) => {
              setLoading(false);
              console.log(err);
            });
        });
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
    console.log(JSON.stringify(urls));
    console.log(urls.length);
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
            handleUpload();
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
        <Form onSubmit={(e) => handleSubmit(e)}>
          <ModalHeader toggle={toggle}>Ladda upp bidrag</ModalHeader>
          <ModalBody>
            {error ? <Alert color="danger">{error}</Alert> : null}

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
                        <div style={{ position: "relative" }}>
                          <div
                            style={{
                              position: "absolute",
                              top: -4,
                              right: -4,
                              cursor: "pointer",
                            }}
                            onClick={() => removeImg(i)}
                          >
                            <i
                              style={{
                                color: "tomato",
                                backgroundColor: "white",
                                borderRadius: "50%",
                              }}
                              className="fas fa-times-circle"
                            ></i>
                          </div>
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
                        type="file"
                        accept="image/*"
                        name="img"
                        id={"img" + i}
                        onChange={(e) => handleImgChange(e, i)}
                        style={{ display: "none" }}
                      />
                    </div>
                    {imgs.length - 1 === i && imgs.length < 8 ? (
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
                required
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

            {error ? <Alert color="danger">{error}</Alert> : null}
          </ModalBody>
          <ModalFooter
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <FormGroup check inline>
                <Label check>
                  <Input
                    value={consentAccept}
                    type="checkbox"
                    onClick={() => setConsentAccept(!consentAccept)}
                  />{" "}
                  Jag accepterar villkoren
                </Label>
              </FormGroup>
              <Consent
                buttonText="Läs vilkoren här"
                title="Information om sparad data"
              >
                Hensmåla Triathlon kommer spara namn, text och bilder för att
                visa här på hemsidan och möjligtvis andra plattformar. Ditt
                telefonnummer och email visas ej, men sparas för att kunna
                kontakta dig i framtiden om du vinner ett pris, dock som längst
                till 1 augusti 2022.
                <br></br>
                <br></br>
                Om du önskar att vi ska ta bort, eller redigera dina uppgifter
                kan du kontakta hensmala.triathlon@gmail.com.
              </Consent>
            </div>

            <Button
              type="submit"
              disabled={!consentAccept}
              color="success"
              size="lg"
              style={{ display: "flex", alignItems: "center" }}
            >
              {loading ? <Spinner size="sm" color="light" /> : "Lägg upp"}
            </Button>
            <small>
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="https://policies.google.com/privacy">Privacy Policy</a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
              apply.
            </small>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default UploadModal;
