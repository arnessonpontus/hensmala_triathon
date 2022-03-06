import React, { Component } from "react";
import { Container } from "reactstrap";

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
          textAlign: "center"
        }}
      >
        <h2>Tack för din anmälan!</h2>
        <div
          className="button-style"
          style={{
            textDecoration: "none",
            backgroundColor: "#11999E",
            color: "white",
          }}
          onClick={() => {
            this.props.toggleDoneRegistration();
          }}
        >
          Registrera fler
        </div>
      </Container>
    );
  }
}

export default RegSuccess;
