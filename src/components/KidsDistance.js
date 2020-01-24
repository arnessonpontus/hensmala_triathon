import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class KidDistance extends Component {
  render() {
    return (
      <div>
        <div className="year-2018 article-seperator mb-5"></div>
        <h2>Barnsträckor</h2>
        <Row>
          <Col style={{ marginTop: "5vh" }} md={6}>
            <b>Simning - ca 60 m</b>
            <p>
              Simning kommer att ske nära land men deltagarna bottnar inte hela
              tiden.
            </p>
          </Col>
          <Col
            style={{
              marginTop: "5vh",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              src="/images/barn_simning.png"
              alt="simma"
              style={{ width: 200, height: 200 }}
            ></img>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "5vh" }} md={6}>
            <b>Löpning - ca 750 m</b>
            <p>Löpning sker på gräs, skogsstig och grusväg.</p>
          </Col>
          <Col
            style={{
              marginTop: "5vh",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              src="/images/barn_lopning.png"
              alt="kid_run"
              style={{ width: 200, height: 200 }}
            ></img>
          </Col>
        </Row>
      </div>
    );
  }
}

export default KidDistance;
