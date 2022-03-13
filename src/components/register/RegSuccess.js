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
        <h2>{this.props.type === "register" ? "Tack för din anmälan!" : "Tack för din beställning!"}</h2>
        <div
          className="button-style"
          style={{
            textDecoration: "none",
            backgroundColor: "#11999E",
            color: "white",
          }}
          onClick={() => {
            this.props.toggleDone();
          }}
        >
          {this.props.type === "register" ? "Registrera fler" : "Beställ mer"}
        </div>
      </Container>
    );
  }
}

export default RegSuccess;
