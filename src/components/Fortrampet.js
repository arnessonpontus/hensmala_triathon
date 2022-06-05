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
                  <Badge color="info">Går även 2022</Badge>
                </h3>
              </div>
              <b>
                Stöd ALS-forskningen, men i egen takt och med fikastopp på
                vägen.
              </b>
              <br></br>
              <br></br>
              <p>
                Förtrampet går av stapeln som vanligt i år, dock med utökat
                intervall för start för att göra det glesare mellan deltagarna.
              </p>
              <h4>
                <Badge color="secondary">Vad innebär Förtrampet?</Badge>
              </h4>
              <p className="indent">
                <b>
                  Förtrampet innebär att på sin egen cykel ta sig runt Stora
                  Hensjön i den takt man vill, med valfri fika på vägen.
                </b>
              </p>
              <h4>
                <Badge color="secondary">När är Förtrampet?</Badge>
              </h4>
              <p className="indent">
                <b>
                  Det är fri start från 09:00 till 12:00 den 17:e juli 2022.
                </b>
              </p>
              <h4>
                <Badge color="secondary">Behöver jag ta med fika?</Badge>
              </h4>
              <p className="indent">
                <b>
                  Man behöver inte ha med egen fika. Fikat står uppdukat i
                  Grönvik på halva vägen och ingår i startavgiften.
                </b>
              </p>
              <h4>
                <Badge color="secondary">Behövs anmälan?</Badge>
              </h4>
              <p className="indent">
                <b>
                  Nej ingen anmälan krävs. Det är bara att dyka upp den 17:e
                  juli.
                </b>
              </p>
              <h4>
                <Badge color="secondary">Hur tar jag mig dit?</Badge>
              </h4>
              <p className="indent">
                <b>
                  Starten går från garaget hos Arnessons i Hensmåla. På den{" "}
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
                <b>
                  Startavgiften är 100kr (eller valfri summa därutöver{" "}
                  <span aria-label="party" role="img">
                    🎉
                  </span>
                  ) som går oavkortat till "Stoppa ALS" genom NEURO. Betala till
                  bankgiro 386-6563 eller swisha till 1234048781.
                </b>
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
            alt="fortrampet"
          ></img>
        </Col>
      </Row>
    </Container>
  );
};

export default Fortrampet;
