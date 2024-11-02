import React, { useEffect, useState } from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  ListGroup,
  ListGroupItem,
  Container,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { Distances } from "./Distances";
import { GetHere } from "./GetHere";
import { Rules } from "./Rules";
import { GenerealInfo } from "./GeneralInfo";

export const AboutPaths = {
  info: "info",
  getHere: "hitta-hit",
  rules: "regler",
  distances: "strackor",
  results: "resultat"
} as const;
type AboutPathValues = typeof AboutPaths[keyof typeof AboutPaths];

export const AboutHT: React.FC = () => {
  const [isInfoOpen, setIsInfoOpen] = useState(false);
  const [isGetHereOpen, setIsGetHereOpen] = useState(false);
  const [isDistancesOpen, setIsDistancesOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [isResultsOpen, setIsResultsOpen] = useState(false);

  const { id } = useParams();


  const toggle = (cardType: AboutPathValues) => {
    switch (cardType) {
      case AboutPaths.info:
        setIsInfoOpen(!isInfoOpen)
        break;
      case AboutPaths.getHere:
        setIsGetHereOpen(!isGetHereOpen)
        break;
      case AboutPaths.distances:
        setIsDistancesOpen(!isDistancesOpen)
        break;
      case AboutPaths.results:
        setIsResultsOpen(!isResultsOpen)
        break;
      default:
        setIsRulesOpen(!isRulesOpen)
    }
  };

  useEffect(() => {
    switch (id) {
      case AboutPaths.info:
        setTimeout(() => {
          document?.getElementById?.(AboutPaths.info)?.scrollIntoView({ behavior: "smooth" });
        }, 1500);
        setIsInfoOpen(true)
        break;
      case AboutPaths.getHere:
        setTimeout(() => {
          document?.getElementById?.(AboutPaths.getHere)?.scrollIntoView({ behavior: "smooth" });
        }, 1500);
        setIsGetHereOpen(true);
        break;
      case AboutPaths.distances:
        setTimeout(() => {
          document?.getElementById?.(AboutPaths.distances)?.scrollIntoView({ behavior: "smooth" });
        }, 1500);
        setIsDistancesOpen(true);
        break;
      case AboutPaths.rules:
        setTimeout(() => {
          document?.getElementById?.(AboutPaths.rules)?.scrollIntoView({ behavior: "smooth" });
        }, 1500);
        setIsRulesOpen(true);
        break;
      case AboutPaths.results:
        setTimeout(() => {
          document?.getElementById?.(AboutPaths.results)?.scrollIntoView({ behavior: "smooth" });
        }, 1500);
        setIsResultsOpen(true);
        break;
      default:
        window.scrollTo(0, 0);
    }

  }, []);

  const result_years = [2024, 2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];
  return (
    <div>
      <div className="banner-wrapper">
        <img
          className="banner"
          src="/images/about-ht.jpg"
          alt="about_HT_banner"
        ></img>
      </div>
      <Container className="mt-5" style={{ minHeight: "50vh" }}>
        <div id={AboutPaths.info}>
          <Button
            outline
            size="lg"
            block
            color="secondary"
            onClick={() => toggle(AboutPaths.info)}
            style={{
              marginBottom: "1rem",
            }}
          >
            <p>Generell info</p>
            <img
              src="../../images/icons/downarrow.svg"
              alt="arrow down"
            ></img>
          </Button>
          <Collapse isOpen={isInfoOpen}>
            <Card style={styles.infoBoxStyle}>
              <CardBody>
                <GenerealInfo />
              </CardBody>
            </Card>
          </Collapse>
        </div>
        <div id={AboutPaths.getHere}>
          <Button
            outline
            size="lg"
            block
            color="secondary"
            onClick={() => toggle(AboutPaths.getHere)}
            style={{
              marginBottom: "1rem",
            }}
          >
            <p>Hitta hit</p>
            <img
              src="../../images/icons/downarrow.svg"
              alt="arrow down"
            ></img>
          </Button>
          <Collapse isOpen={isGetHereOpen}>
            <Card style={styles.infoBoxStyle}>
              <CardBody>
                <GetHere />
              </CardBody>
            </Card>
          </Collapse>
        </div>
        <div id={AboutPaths.distances}>
          <Button
            outline
            size="lg"
            block
            color="secondary"
            onClick={() => toggle(AboutPaths.distances)}
            style={{
              marginBottom: "1rem",
            }}
          >
            <p>Sträckor</p>
            <img
              src="../../images/icons/downarrow.svg"
              alt="arrow down"
            ></img>
          </Button>
          <Collapse isOpen={isDistancesOpen}>
            <Card style={styles.infoBoxStyle}>
              <CardBody>
                <Distances />
              </CardBody>
            </Card>
          </Collapse>
          <Button
            id={AboutPaths.rules}
            outline
            size="lg"
            block
            color="secondary"
            onClick={() => toggle(AboutPaths.rules)}
            style={{
              marginBottom: "1rem",
            }}
          >
            <p>Regler</p>
            <img
              src="../../images/icons/downarrow.svg"
              alt="arrow down"
            ></img>
          </Button>
          <Collapse isOpen={isRulesOpen}>
            <Card style={styles.infoBoxStyle}>
              <CardBody>
                <Rules />
              </CardBody>
            </Card>
          </Collapse>
          <Button
            id={AboutPaths.results}
            outline
            size="lg"
            block
            color="secondary"
            onClick={() => toggle(AboutPaths.results)}
            style={{
              marginBottom: "1rem",
            }}
          >
            <p>Tidigare resultat</p>
            <img
              src="../../images/icons/downarrow.svg"
              alt="arrow down"
            ></img>
          </Button>
          <Collapse isOpen={isResultsOpen}>
            <Card style={styles.infoBoxStyle}>
              <CardBody>
                <ListGroup>
                  {result_years.map((year) => {
                    return (
                      <ListGroupItem
                        target="_blank"
                        rel="noopener noreferrer"
                        key={year}
                        tag="a"
                        href={
                          "/results/" +
                          year +
                          "_resultat_hensmala_triathlon.pdf"
                        }
                      >
                        {" "}
                        {year}
                      </ListGroupItem>
                    );
                  })}
                </ListGroup>
              </CardBody>
            </Card>
          </Collapse>
        </div>
      </Container>
    </div>
  );
}

const styles = {
  infoBoxStyle: {
    marginBottom: 20,
  },
};
