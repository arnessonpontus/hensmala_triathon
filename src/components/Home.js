import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import RegSuccess from "./RegSuccess";
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
  state = {
    hasRegisterd: false
  };

  constructor(props) {
    super(props);

    this.handleRegSuccess = this.handleRegSuccess.bind(this);
  }

  handleRegSuccess = e => {
    this.setState({ hasRegisterd: true });
  };

  render() {
    return (
      <div>
        <img
          style={{ width: "100%" }}
          src="/images/ht_banner.jpg"
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
          <Card className="mt-5">
            <CardBody>
              <Row>
                <Col style={{ marginTop: "5vh" }} md={6}>
                  {!this.state.hasRegisterd ? (
                    <RegisterForm handleRegSuccess={this.handleRegSuccess} />
                  ) : (
                    <RegSuccess />
                  )}
                </Col>
                <Col style={{ marginTop: "5vh" }}>
                  <h3>Om oss</h3>
                  <p>
                    Hensmåla Triathlon har länge Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                  </p>
                  <p>
                    Hensmåla Triathlon har länge Lorem ipsum dolor sit amet,
                    consectetur adipiscing elit, sed do eiusmod tempor
                    incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi
                    ut aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu
                    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
                    proident, sunt in culpa qui officia deserunt mollit anim id
                    est laborum.
                  </p>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
        <Jumbotron className="text-center" style={{ marginBottom: 0 }}>
          <p>Hensmåla Triathlon</p>
        </Jumbotron>
      </div>
    );
  }
}

export default Home;
