import React, { Component, useEffect, useState } from "react";
import ChallengeModal from "./ChallengeModal";
import {
  Container,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardFooter,
  CardColumns,
} from "reactstrap";
import UploadModal from "./UploadModal";
import * as firebase from "firebase";

const Challenge = () => {
  const [userChallenges, setUserChallenges] = useState([]);

  useEffect(() => {
    firebase
      .database()
      .ref("registrations")
      .orderByChild("time")
      .on("value", (snapshot) => {
        snapshot.forEach((child) => {
          const childWithUid = { ...child.val(), uid: child.key };
          setUserChallenges([...userChallenges, childWithUid]);
        });
      });
  }, []);

  const challenges = [];
  challenges.push({
    name: "Eva Arnesson",
    title: "Hård runda runt i maklig takt",
    donated: false,
    hasRun: true,
    hasBike: true,
    hasSwim: false,
    text:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like",
    imgs: [
      "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Running/Galleries/Run+Faster+With+Less+Work/Carousel.jpg",
      "https://betrueclothing.se/wp-content/uploads/2018/09/w27gsp212-wrangler-high-skin-out-run-front.jpg",
    ],
    date: "2020-10-04 14:32",
  });
  challenges.push({
    name: "Kalle Jönsson",
    title: "Hård runda runt i maklig takt",
    donated: true,
    hasRun: false,
    hasBike: true,
    hasSwim: false,
    text:
      "It distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters(injected humour and the like",
    imgs: [
      "https://www.intrepidtravel.com/sites/intrepid/files/styles/low-quality/public/elements/product/hero/Tuscany-cycling-poppy-field.jpg",
    ],
    date: "2020-10-04 14:32",
  });
  challenges.push({
    name: "Evert Larsson",
    title: "Hård runda runt i maklig takt",
    donated: false,
    hasRun: true,
    hasBike: true,
    hasSwim: true,
    text:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like",
    imgs: [
      "https://www.wigglestatic.com/images/offers/commercial/2020/week22/2020-w22-cycle-slide-1-m-min.jpg",
      "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Running/Galleries/Run+Faster+With+Less+Work/Carousel.jpg",
    ],
    date: "2020-10-04 14:32",
  });
  challenges.push({
    name: "Linda Nilsson",
    title: "Hård runda runt i maklig takt",
    donated: true,
    hasRun: false,
    hasBike: true,
    hasSwim: true,
    text:
      "It of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like",
    imgs: [
      "https://betrueclothing.se/wp-content/uploads/2018/09/w27gsp212-wrangler-high-skin-out-run-front.jpg",
    ],
    date: "2020-10-04 14:32",
  });
  challenges.push({
    name: "Linda Nilsson",
    title: "Hård runda runt i maklig takt",
    donated: false,
    hasRun: true,
    hasBike: true,
    hasSwim: false,
    text: "Användaren har inte skrivit någon ytterligare text om rundan.",
    imgs: [
      "https://betrueclothing.se/wp-content/uploads/2018/09/w27gsp212-wrangler-high-skin-out-run-front.jpg",
    ],
    date: "2020-10-04 14:32",
  });

  /*
    style={{
      minHeight: "70vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    }}*/
  return (
    <Container>
      <div>
        <h1 style={{ fontSize: "9vw" }} className="mt-3 mb-0">
          Utmaningen
        </h1>
        <h1 style={{ fontSize: "2vw" }} className="mb-3">
          <i>Ett komplement till det inställda Hensmåla Triathlon 2020</i>
        </h1>
      </div>
      <UploadModal></UploadModal>
      <CardColumns>
        {challenges.map((challenge) => {
          return (
            <Card className="mt-3">
              <CardImg top src={challenge.imgs[0]} alt="bidrag" />
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
                  <div>
                    <i
                      style={{ color: challenge.hasBike ? "green" : null }}
                      class="fas fa-biking fa-2x mr-2"
                    ></i>
                    <i
                      style={{ color: challenge.hasSwim ? "green" : null }}
                      class="fas fa-swimmer fa-2x mr-2"
                    ></i>
                    <i
                      style={{ color: challenge.hasRun ? "green" : null }}
                      class="fas fa-running fa-2x mr-2"
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
                {challenge.date}

                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  {challenge.donated ? <i className="mr-2">Donerat</i> : null}
                  <i
                    style={{
                      color: challenge.donated ? "green" : "white",
                      textShadow: challenge.donated ? null : "0 0 1px #000",
                    }}
                    class="fas fa-check-circle fa-2x"
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
