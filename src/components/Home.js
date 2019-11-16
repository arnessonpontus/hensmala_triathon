import React, { Component } from "react";
import News from "./News";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Jumbotron
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
                    Hensmåla Triathlon har länge Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor
                    in.
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

          <Row>
            <News />
          </Row>
        </Container>

        <Jumbotron
          className="text-center "
          style={{ marginBottom: 0, height: 100 }}
        >
          <p>Hensmåla Triathlon</p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
