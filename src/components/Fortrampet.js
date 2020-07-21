import React, { useEffect } from "react";
import { NavLink as RRNavLink } from "react-router-dom";

import { Container, Row, Col, Badge, Card, CardBody } from "reactstrap";

const Fortrampet = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col style={{ marginBottom: "10px" }}>
          <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 1px 1px 1px #e3e3e3",
            }}
          >
            <CardBody>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <h2 style={{ fontSize: "50px" }}>Förtrampet</h2>
                <h3>
                  <Badge color="info">Går även 2020</Badge>
                </h3>
              </div>
              <b>
                Stöd ALS-forskningen, men i egen takt och ett fikabröd i handen.
              </b>
              <br></br>
              <br></br>
              <p>
                Förtrampet går av stapeln som vanligt i år, dock med utökat
                intervall för start för att göra det glesare mellan deltagarna.
              </p>
              <h4>
                <Badge color="secondary">När är förtrampet?</Badge>
              </h4>
              <p className="indent">
                <b>
                  Det är fri start från 09:00 till 12:00 den 1:e augusti 2020.
                </b>
              </p>
              <h4>
                <Badge color="secondary">Behövs anmälan?</Badge>
              </h4>
              <p className="indent">
                <b>
                  Nej ingen anmälan krävs. Det är bara att dyka upp den 1:e
                  augusti.
                </b>
              </p>
              <h4>
                <Badge color="secondary">Hur tar jag mig dit?</Badge>
              </h4>
              <p className="indent">
                <b>
                  Starten går från garaget hos Arnessons i hensmåla. På den{" "}
                  <RRNavLink tag={RRNavLink} to="/om-ht/hitta-hit">
                    här
                  </RRNavLink>{" "}
                  länken kan du hitta mer information om hur du tar dig till
                  starten.
                </b>
              </p>

              <h4>
                <Badge color="secondary">Vad kostar det?</Badge>
              </h4>
              <p className="indent">
                <b>Startavgiften är 100 kr.</b>
              </p>
            </CardBody>
          </Card>
        </Col>
        <Col
          style={{
            marginBottom: "10px",
            minWidth: "45vh",
          }}
        >
          <img
            style={{ width: "100%", height: "auto" }}
            src="/images/fortrampet_bike.jpg"
            alt="HT_banner"
          ></img>
        </Col>
      </Row>
    </Container>
  );
};

export default Fortrampet;
