import React, { Component } from "react";
import { Button, Container } from "reactstrap";

class RegSuccess extends Component {
  render() {
    return (
      <Container
        style={{
          minHeight: "70vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h2>Tack för din anmälan!</h2>
        <Button
          style={{ backgroundColor: "#11999E" }}
          onClick={() => {
            this.props.toggleDoneRegistration();
          }}
        >
          Registrera fler
        </Button>
      </Container>
    );
  }
}

export default RegSuccess;
