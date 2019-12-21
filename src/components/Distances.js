import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class Distances extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col style={{ marginTop: "5vh" }} md={6}>
            <b>Simning - 350 m</b>
            <p>
              Simningen sker runt lillön. Starten sker i vattnet och deltagarna
              väntar bakom startsnöret till startskottet går. Därefter är det
              medurs varv runt ön som gäller.
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
              src="/images/simning.jpg"
              alt="simma"
              style={{ width: 200 }}
            ></img>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "5vh" }} md={6}>
            <b>Cykling - 9.2 km</b>
            <p>
              Cyklingen sker runt hensjön. Cyklingen får först börja när
              deltagaren är utanför växlingsområdet, därefter sker turen medurs
              runt sjön.
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
              src="/images/cykling.jpg"
              alt="simma"
              style={{ width: 200 }}
            ></img>
          </Col>
        </Row>
        <Row>
          <Col style={{ marginTop: "5vh" }} md={6}>
            <b>Löpning - 6.5 km</b>
            <p>
              Löpningen sker i de djupa småländska skogarna. I början av
              löpningen är mördarbacken. Efter den är det en lek.
            </p>
          </Col>
          <Col
            style={{
              marginTop: "5vh",
              display: "flex",
              justifyContent: "center",
              marginBottom: "5vh"
            }}
          >
            <img
              src="/images/lopning.jpg"
              alt="simma"
              style={{ width: 200 }}
            ></img>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Distances;
