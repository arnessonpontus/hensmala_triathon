import React, { Component } from "react";
import ChallengeModal from "./ChallengeModal";
import {
  Container,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardFooter,
  CardColumns,
} from "reactstrap";
import UploadModal from "./UploadModal";

class Challenge extends Component {
  state = {};

  constructor(props) {
    super(props);
  }

  render() {
    const challenges = [];
    challenges.push({
      name: "Eva Arnesson",
      title: "Hård runda runt i maklig takt",
      ingress:
        "This is a small text about what I have done and this is very nice running, cykling and swimming.",
      text:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like",
      img:
        "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Running/Galleries/Run+Faster+With+Less+Work/Carousel.jpg",
      date: "2020-10-04 14:32",
    });
    challenges.push({
      name: "Kalle Jönsson",
      title: "Hård runda runt i maklig takt",
      ingress:
        "This is a small text about what I have done and this is very nice running, cykling and swimming.",
      text:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters(injected humour and the like",
      img:
        "https://www.intrepidtravel.com/sites/intrepid/files/styles/low-quality/public/elements/product/hero/Tuscany-cycling-poppy-field.jpg",
      date: "2020-10-04 14:32",
    });
    challenges.push({
      name: "Evert Larsson",
      title: "Hård runda runt i maklig takt",
      ingress:
        "This is a small text about what I have done and this is very nice running, cykling and swimming.",
      text:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like",
      img:
        "https://www.wigglestatic.com/images/offers/commercial/2020/week22/2020-w22-cycle-slide-1-m-min.jpg",
      date: "2020-10-04 14:32",
    });
    challenges.push({
      name: "Linda Nilsson",
      title: "Hård runda runt i maklig takt",
      ingress:
        "This is a small text about what I have done and this is very nice running, cykling and swimming.",
      text:
        "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like",
      img:
        "https://image.bokus.com/images/9781101946305_200x_run-for-your-life",
      date: "2020-10-04 14:32",
    });
    challenges.push({
      name: "Linda Nilsson",
      title: "Hård runda runt i maklig takt",
      ingress: "",
      text: "",
      img:
        "https://image.bokus.com/images/9781101946305_200x_run-for-your-life",
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
        <h1 style={{ fontSize: "9vw" }} className="mt-3">
          Utmaningen
        </h1>
        <UploadModal></UploadModal>
        <CardColumns>
          {challenges.map((challenge) => {
            return (
              <Card className="mt-3">
                <CardImg top src={challenge.img} alt="bidrag" />
                <CardBody>
                  <CardTitle>{challenge.name}</CardTitle>
                  <CardSubtitle>{challenge.title}</CardSubtitle>
                  <br></br>
                  <CardText>{challenge.ingress}</CardText>
                  <ChallengeModal info={challenge}></ChallengeModal>
                </CardBody>
                <CardFooter className="text-muted">{challenge.date}</CardFooter>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    );
  }
}
export default Challenge;
