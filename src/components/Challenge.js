import React, { useEffect, useState } from "react";
import ChallengeModal from "./ChallengeModal";
import AboutChallenge from "./AboutChallenge";
import {
  Container,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardFooter,
  CardColumns,
  Spinner,
} from "reactstrap";
import UploadModal from "./UploadModal";
import * as firebase from "firebase";

const Challenge = () => {
  const [userChallenges, setUserChallenges] = useState([]);
  const [loadingChallenges, setLoadingChallenges] = useState(false);

  const [hasUpdated, setHasUpdated] = useState(false);

  useEffect(() => {
    setUserChallenges([]);
    setLoadingChallenges(true);
    firebase
      .database()
      .ref("challenges")
      .orderByChild("time")
      .once("value", (snapshot) => {
        snapshot.forEach((child) => {
          const childWithUid = { ...child.val(), uid: child.key };
          setUserChallenges((userChallenges) => [
            ...userChallenges,
            childWithUid,
          ]);
        });
      })
      .then(() => setLoadingChallenges(false));
  }, [hasUpdated]);

  return (
    <Container
      style={{
        minHeight: "70vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ fontSize: "calc(2em + 7vw)" }} className="mt-3 mb-0">
          Utmaningen
        </h1>
        <h1 style={{ fontSize: "calc(1em + 1vw)" }} className="mb-3">
          <i>Ett alternativ till det inställda Hensmåla Triathlon 2020</i>
        </h1>
        <div style={{ display: "flex" }}>
          <UploadModal
            setHasUpdated={setHasUpdated}
            hasUpdated={hasUpdated}
          ></UploadModal>
          <AboutChallenge />
        </div>
        {loadingChallenges ? (
          <Spinner
            style={{ width: "3rem", height: "3rem", marginTop: 10 }}
            type="grow"
          />
        ) : null}
      </div>

      <CardColumns>
        {userChallenges
          .slice(0)
          .reverse()
          .map((challenge, i) => {
            return (
              <Card key={i} className="mt-3">
                <CardImg top src={challenge.imgs[0]} alt="bild-bidrag" />
                <CardBody>
                  <CardTitle>{challenge.name}</CardTitle>
                  <CardSubtitle>{challenge.title}</CardSubtitle>
                  <br></br>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <ChallengeModal info={challenge}></ChallengeModal>
                    <div
                      style={{
                        marginLeft: 10,
                      }}
                    >
                      <i
                        style={{ color: challenge.hasBike ? "green" : null }}
                        className="fas fa-biking fa-2x mr-2"
                      ></i>
                      <i
                        style={{ color: challenge.hasSwim ? "green" : null }}
                        className="fas fa-swimmer fa-2x mr-2"
                      ></i>
                      <i
                        style={{ color: challenge.hasRun ? "green" : null }}
                        className="fas fa-running fa-2x mr-2"
                      ></i>
                      <i
                        style={{
                          color: challenge.hasWheelchair ? "green" : null,
                        }}
                        className="fas fa-wheelchair fa-2x mr-2"
                      ></i>
                    </div>
                  </div>
                </CardBody>
                <CardFooter
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="text-muted"
                >
                  {challenge.time}

                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {challenge.hasDonated ? (
                      <i className="mr-2">Donerat</i>
                    ) : null}
                    <i
                      style={{
                        color: challenge.hasDonated ? "green" : "white",
                        textShadow: challenge.hasDonated
                          ? null
                          : "0 0 1px #000",
                      }}
                      className="fas fa-check-circle fa-2x"
                    ></i>
                  </span>
                </CardFooter>
              </Card>
            );
          })}
      </CardColumns>
    </Container>
  );
};

// Change in storage rules
/*
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
     allow read, write: if true; // Chage this to allow read, write: if request.auth != null
    }
  }
}
*/

export default Challenge;
