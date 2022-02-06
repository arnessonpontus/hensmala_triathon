import React, { Component } from "react";
import News from "./news/News";

import { Container, Row, Col, Card, CardBody, Button } from "reactstrap";

class Home extends Component {
  render() {
    return (
      <div>
        <div className="banner-wrapper">
          <img
            className="banner"
            src="/images/ht_banner_resized.jpg"
            alt="HT_banner"
          ></img>
        </div>
        <Container className="p-4">
          <div className="card-box">
            <Row>
              <Col className="my-4" ms={4}>
                <h2>Välkommen till Hensmåla Triathlon</h2>
                <p>
                  I det fina småländska landskapet arrangeras årligen ett
                  minitriathlon till förmån för ALS-forskningen. Alla sträckor
                  är anpassade till den vackra Stora Hensjön och Hensmålas
                  landskap.
                  <br></br>
                  <br></br>
                  Sedan 2012 har vi samlat in strax över 890 000kr och skänkt
                  till ALS forskningen. De tre sista åren har gåvan riktats mot
                  Stoppa ALS och ALS Treatment Center Karolinska.
                </p>
              </Col>

              <Col className="text-center mt-4 my-auto" ms={4}>
                <img
                  width="250px"
                  src="/images/corona_hen.png"
                  alt="hensmala_triathlon"
                ></img>
              </Col>
            </Row>
          </div>
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
