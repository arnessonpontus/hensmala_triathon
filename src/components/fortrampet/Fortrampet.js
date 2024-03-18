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
                <h2 style={{ fontSize: "50px" }}>Hentrampet</h2>
                <h3>
                  <Badge color="info" className="text-white">Gick 2023</Badge>
                </h3>
              </div>
              <b>
                Stöd ALS-forskningen, men i egen takt och med fikastopp på
                vägen.
              </b>
              <br></br>
              <br></br>
              <p>
                Hentrampet (tidigare Förtrampet) gick av stapeln 2023 även om Hensmåla Triathlon inte gjorde det.
              </p>
              <h4>
                Vad innebär Hentrampet?
              </h4>
              <p className="indent">
                Hentrampet innebär att på sin egen cykel ta sig runt Stora
                Hensjön i den takt man vill, med valfri fika på vägen. I år kommer även en tipsrunda med fina priser vara utsatt.
              </p>
              <h4>
                När är Förtrampet?
              </h4>
              <p className="indent">
                Inget datum är spikat för år 2024.
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
                bankgiro 386-6563 eller swisha till 1234048781.
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
      <Row>
        <Col style={{ marginBottom: "10px" }}>
        <Card
            style={{
              width: "100%",
              height: "100%",
              boxShadow: "0px 1px 1px 1px #e3e3e3",
            }}
          >
            <CardBody 
              style={{marginLeft: "10px"}}>
              <h2>Svar tipsrunda 2023</h2>
              <ul style={{listStyleType: "none"}}>
                <li>Fråga 1: Hur djup är Stora Hensjön? <p>Svar: <b>10,5 meter</b></p></li>
                <li>Fråga 2: Vilket var det första året man kunde delta med lag i Hensmåla Triathlon? <p>Svar: <b>2017</b></p></li>
                <li>Fråga 3: När gick sista persontåget från Hensmåla <p>Svar: <b>1965</b></p></li>
                <li>Fråga 4: Vilken är den snabbaste tiden någon har gjort på Hensmåla Triathlon? <p>Svar: <b>45m 27s</b></p></li>
                <li>Fråga 5: Hur mycket har Hensmåla Triathlon bidraget till ALS forskningen? <p>Svar: <b>1 042 917 kr</b></p></li>
                <li>Fråga 6: Hur många funktionärer hjälpte till på Hensmåla Triathlon 2022 <p>Svar: <b>82 st</b></p></li>
                <li>Fråga 7: Hur hög är högsta punkten på ”triathlonrundan”? <p>Svar: <b>169 m.ö.h</b></p></li>
                <li>Fråga 8: Under vika träd värmer vi upp på Hensmåla Triathlon? <p>Svar: <b>Ask</b></p></li>
                <li>Fråga 9: Vilket år togs Vattenverket i drift? <p>Svar: <b>1970   </b></p></li>
                <li>Fråga 10: Vilka år gjordes kolmilan i Dackemåla? <p>Svar: <b>1992</b></p></li>
                <li>Utslagsfråga (vikt på skor, hjälm, badmössa mm): <b>983 gram</b></li>
              </ul>

                <p>Grattis Sven som hade alla rätt och vann!</p>
                <p>Tack till Länsförsäkringar Kronoberg, BJS Radio och TV, Hallabro El samt Konga Cykel och motor som skänkt de fina priserna! </p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Fortrampet;
