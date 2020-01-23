import React, { Component } from "react";
import { Row, Col } from "reactstrap";

class Distances extends Component {
  render() {
    return (
      <div>
        <h2>Ordinarie tävlingssträckor</h2>
        <Row>
          <Col style={{ marginTop: "5vh" }} md={6}>
            <b>Simning - 340 m</b>
            <p>
              Simningen sker runt lillön. Starten sker i vattnet och deltagarna
              väntar bakom startsnöret till startskottet går. Därefter är det
              medurs varv runt ön som gäller.
            </p>
            <p>
              En film på simningen kan du se{" "}
              <a href="https://www.youtube.com/watch?time_continue=2&amp;v=JT6NvRHYMqw&amp;feature=emb_logo">
                här
              </a>
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
              style={{ width: 200, height: 200 }}
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
            <p>
              En film på cykelrundan kan du se{" "}
              <a href="https://www.youtube.com/watch?v=ce22jo1_FzA&amp;feature=emb_logo">
                här
              </a>
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
              style={{ width: 200, height: 200 }}
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
            <p>
              En film på löprundan kan du se{" "}
              <a href="https://www.youtube.com/watch?v=cnDqY2JtKUk&amp;feature=emb_logo">
                här
              </a>
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
              style={{ width: 200, height: 200 }}
            ></img>
          </Col>
        </Row>
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

export default Distances;
