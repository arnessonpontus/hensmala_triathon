import React, { Component } from "react";
import News from "./News";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Button
} from "reactstrap";

class Home extends Component {
  render() {
    return (
      <div>
        <img
          style={{ width: "100%" }}
          src="/images/ht_banner_smaller.jpg"
          alt="HT_banner"
        ></img>
        <Container className="p-5">
          <Card>
            <CardBody>
              <Row>
                <Col className="my-4" ms={4}>
                  <h2>Välkommen till Hensmåla Triathlon</h2>
                  <CardText>
                    I det fina småländska landskapet arrangeras årligen ett
                    minitriathlon till förmån för ALS-forskningen. Alla sträckor
                    är anpassade till den vackra Stora Hensjön och Hensmålas
                    landskap.
                    <br></br>
                    <br></br>
                    På de första sju åren har strax över <b>700 000 kr</b>{" "}
                    samlats in och skänks till ALS-forskningen denom NEURO. De
                    två sista åren har gåvan riktats mot Stoppa ALS och ALS
                    Treatment Center Karolinska.
                    <br></br>
                    <br></br>
                    2019 skänktes <b>161 891kr</b>.
                  </CardText>
                </Col>

                <Col className="text-center mt-4 my-auto" ms={4}>
                  <img
                    width="250px"
                    src="/images/hona_1500.jpg"
                    alt="hensmala_triathlon"
                  ></img>
                </Col>
              </Row>
            </CardBody>
          </Card>
          <Row className="donate-home">
            <Col className=" mt-5">
              <Card className="align-items-center">
                <CardBody>
                  <a
                    className="donate-home"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://egnainsamlingar.neuro.se/projects/neuro-10"
                  >
                    <Button style={{ backgroundColor: "#11999E" }}>
                      DONERA TILL ALS
                    </Button>
                  </a>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <Row>
            <News />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
