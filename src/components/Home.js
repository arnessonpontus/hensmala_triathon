import React, { Component } from "react";
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
          <Row>
            <Col className="s">
              <Card>
                <CardBody>
                  <h3>Välkommen till Hensmåla Triathlon</h3>
                  <CardText>
                    Hensmåla Triathlon har länge Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Jumbotron className="text-center" style={{ marginBottom: 0 }}>
          <p>Hensmåla Triathlon</p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
