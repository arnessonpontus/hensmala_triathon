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
                <h2 style={{ fontSize: "46px" }}>Hentrampet</h2>
                <h3>
                  <Badge color="info" className="text-white">1 sep 2024</Badge>
                </h3>
              </div>
              <b>
                Stöd ALS-forskningen, men i egen takt och med fikastopp på
                vägen.
              </b>
              <br></br>
              <br></br>
              <p>
                Hentrampet (tidigare Förtrampet) kommer gå av stapeln 1 september 2024.
              </p>
              <h4>
                Vad innebär Hentrampet?
              </h4>
              <p className="indent">
                Hentrampet innebär att på sin egen cykel ta sig runt Stora
                Hensjön i den takt man vill, med valfri fika på vägen. Likt förra året kommer även en tipsrunda med fina priser vara utsatt.
              </p>
              <h4>
                När är Hentrampet?
              </h4>
              <p className="indent">
                Söndag 1 september 2024. Start sker valfri tid mellan 14.00-17.00.
              </p>
              <h4>
                Behöver jag ta med fika?
              </h4>
              <p className="indent">
                Man behöver inte ha med egen fika. Fikat står uppdukat i
                Grönvik på halva vägen och ingår i startavgiften.
              </p>
              <h4>
                Behövs anmälan?
              </h4>
              <p className="indent">
                Nej ingen anmälan krävs, det är bara att dyka upp.
              </p>
              <h4>
                Hur tar jag mig dit?
              </h4>
              <p className="indent">
                Starten går från garaget hos Arnessons i Hensmåla. På den{" "}
                <RRNavLink tag={RRNavLink} to="/om-ht/hitta-hit">
                  här
                </RRNavLink>{" "}
                länken kan du hitta mer information om hur du tar dig till
                starten.
              </p>

              <h4>
                Vad kostar det?
              </h4>
              <p className="indent">
                Startavgiften är 100kr (eller valfri summa därutöver{" "}
                <span aria-label="party" role="img">
                  🎉
                </span>
                ) som går oavkortat till "Stoppa ALS" genom NEURO. Betala till
                bankgiro 386-6563 eller swisha till 1234048781, alternativt kan man även betala på plats.
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
