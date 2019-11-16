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

class Register extends Component {
  state = {
    hasRegisterd: false
  };

  constructor(props) {
    super(props);

    this.handleRegistration = this.handleRegistration.bind(this);
  }

  handleRegistration = e => {
    this.setState({ hasRegisterd: !this.state.hasRegisterd });
  };

  render() {
    return (
      <Container>
        <Card className="mt-5">
          <CardBody>
            {!this.state.hasRegisterd ? (
              <Row>
                <Col style={{ marginTop: "5vh" }} md={6}>
                  <RegisterForm handleRegistration={this.handleRegistration} />
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
            ) : (
              <RegSuccess handleRegistration={this.handleRegistration} />
            )}
          </CardBody>
        </Card>
      </Container>
    );
  }
}

export default Register;
