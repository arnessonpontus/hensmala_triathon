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
              Simningen sker runt lillön. Starten går i vattnet vid stranden.
              Därefter är det medurs varv runt ön som gäller.
            </p>
            <p>
              Det kommer finnas livbåtar och dykare i vattnet. Vi startar 40 st i varje startgrupp. Se till att ha badmössan på dig under hela simningen och missa inte att slängda den i de utplacerade baljorna så vi ser att alla kommit upp helskinade.
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
              justifyContent: "center",
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
              Cyklingen sker runt Hensjön. Cyklingen får först börja när
              deltagaren är utanför växlingsområdet, alltså på grusvägen,
              därefter går turen medurs runt sjön. Det är ca 2 kilometer{" "}
              <b>grusväg</b> under cykelsträckan. Det kan även förekomma lösgrus
              på vissa ställen.
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
              justifyContent: "center",
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
              Löpningen sker i skogen på andra sidan väg 120. Var{" "}
              <b>väldigt uppmärksam</b> på fordon när vägen behöver korsas vid
              två tillfällen.
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
              marginBottom: "5vh",
            }}
          >
            <img
              src="/images/lopning.jpg"
              alt="simma"
              style={{ width: 200, height: 200 }}
            ></img>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Distances;
