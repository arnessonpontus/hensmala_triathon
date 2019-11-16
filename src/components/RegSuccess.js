import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardText,
  Jumbotron,
  Button
} from "reactstrap";

class RegSuccess extends Component {
  render() {
    return (
      <Col className="text-center">
        <h2>Tack för din anmälan!</h2>
        <Button
          onClick={() => {
            this.props.handleRegistration();
            console.log("hejhej");
          }}
        >
          Registrera fler
        </Button>
      </Col>
    );
  }
}

export default RegSuccess;
