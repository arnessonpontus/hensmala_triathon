import { useEffect } from "react";
import { Link } from "react-router-dom";

import { Container, Row, Col, Badge, Card, CardBody } from "reactstrap";
import { AboutPaths } from "../../about/pages/AboutHT";

export const Fortrampet = () => {
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
                vägen. Även i år kommer tipsrunda med finfina priser vara uppsatt.
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
                Hur funkar tipsrundan?
              </h4>
              <p className="indent">
                Tipsrundan kommer vara utsatt längs vägen där man svarar i egen takt och sedan lämnar in. Priser kommer att ges ut efteråt. Svaren kommer även upp här på hemsidan efter Hentrampet har varit.
              </p>
              <h4>
                Hur tar jag mig dit?
              </h4>
              <p className="indent">
                Starten går från garaget hos Arnessons i Hensmåla. På den{" "}
                <Link to={"/om-ht/" + AboutPaths.getHere}>
                  här
                </Link>{" "}
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
              <h2>Svar tipsrunda 2024</h2>
              <ul style={{listStyleType: "none"}}>
                <li>Fråga 1: Ovanför Hensmåla Skola finns en fornlämning. Från vilken tid uppskattas den vara? <p>Svar: <b>1200 f kr</b></p></li>
                <li>Fråga 2: För inte så länge sedan fanns det en växeltelefonstation i Hensmåla, som hanterade
                    Hensmålaborna med omnejds telefoner. Riktnumret om man ville ringa till någon som
                    bodde i Hensmåla var samma som till Tingsryd 0477. Med vilka siffror började sedan
                    varje Hensmåla abonnents telefonnummer? <p>Svar: <b>14</b></p></li>
                <li>Fråga 3: Deltagarna i årets Hensmåla Triathlon fick simma i Hensjöns klara vatten. Vad fick
                    deltagarna i årets OS Triathlon simma i? <p>Svar: <b>Seinefloden</b></p></li>
                <li>Fråga 4: Cyklister talar gärna om KADENS. Vad är det de pratar om då? <p>Svar: <b>Hur många pedalvarv som en cyklist gör per minut</b></p></li>
                <li>Fråga 5: Det finns en roman som handlar om det dramatiska orgelbygget i Södra Sandsjö
                    kyrka. Vem har skrivit den? <p>Svar: <b>Martin Sjöstrand</b></p></li>
                <li>Fråga 6: Hensjön är i genomsnitt 2 km bred, 1,2 mil lång och dess medeldjup är 1,2 m. Hur
                    mycket vatten i liter finns i sjön? <p>Svar: <b>28.000.000.000 l</b></p></li>
                <li>Fråga 7: Simsträckan i Hensmåla Triathlon är 360 m lång. - Borttagen</li>
                <li>Fråga 8: När du cyklar runt Hensjön råkar du ut för en olycka, faller av cykeln och slår ut en
                    framtand i överkäken. När tandläkaren som du sedan uppsöker noterar din skada i
                    sin journaler, hur noterar han då vilken tand du skadat? <p>Svar: <b>Att du skadat en incesivsk</b></p></li>
                <li>Fråga 9: Tandläkaren som är en uppmärksam person och som vill att du skall må bra tror
                    också att du har en skada på radius och rekommenderar dig att gå till en annan
                    läkare. Till vilken typ av läkare tycker han att du skall gå? <p>Svar: <b>Ortoped   </b></p></li>
                <li>Fråga 10: När man cyklar vill man ju att det skall gå så lätt som möjligt. Om man då har en cykel
                    med väl utbyggt växelsystem med många kransar vid bakhjulet och flera klingor vid
                    pedalerna. Hur skall då kedjan stå för att det skall vara så lätt som möjligt att ta sig
                    upp för en backe? <p>Svar: <b>På liten kling vid pedalerna och stor krans vid bakhjulet.</b></p></li>
                <li>Fråga 11: Namn på växten? <p>Svar: <b>Stensöta</b></p></li>
                <li>Fråga 12: Vilket av bladen kommer från Oxel? <p>Svar: <b>Blad nr 1</b></p></li>
              </ul>

                <p>Grattis till Malin H-C som vann!</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
