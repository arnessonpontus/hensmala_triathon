import React from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  ListGroup,
  ListGroupItem,
  Container,
} from "reactstrap";
import Distances from "./Distances";
import GetHere from "./GetHere";
import Rules from "./Rules";

class AboutHT extends React.Component {
  state = {
    isInfoOpen: false,
    isGetHereOpen: false,
    isDistancesOpen: false,
    isRulesOpen: false,
    isResultsOpen: false,
  };

  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle = (cardType) => {
    switch (cardType) {
      case "Info":
        this.setState({ isInfoOpen: !this.state.isInfoOpen });

        break;
      case "GetHere":
        this.setState({ isGetHereOpen: !this.state.isGetHereOpen });

        break;
      case "Distances":
        this.setState({ isDistancesOpen: !this.state.isDistancesOpen });

        break;
      case "results":
        this.setState({ isResultsOpen: !this.state.isResultsOpen });

        break;
      default:
        this.setState({ isRulesOpen: !this.state.isRulesOpen });
    }
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    switch (id) {
      case "info":
        setTimeout(() => {
          document
            .getElementById("info")
            .scrollIntoView({ behavior: "smooth" });
        }, 1500);
        this.setState({ isInfoOpen: true });
        break;
      case "hitta-hit":
        setTimeout(() => {
          document
            .getElementById("info")
            .scrollIntoView({ behavior: "smooth" });
        }, 1500);
        this.setState({ isGetHereOpen: true });
        break;
      case "strackor":
        setTimeout(() => {
          document
            .getElementById("hitta-hit")
            .scrollIntoView({ behavior: "smooth" });
        }, 1500);
        this.setState({ isDistancesOpen: true });
        break;
      case "regler":
        setTimeout(() => {
          document
            .getElementById("strackor")
            .scrollIntoView({ behavior: "smooth" });
        }, 1500);
        this.setState({ isRulesOpen: true });
        break;
      default:
        break;
    }
  }

  render() {
    const result_years = [2022, 2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];
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
          <div id="info">
            <Button
              outline
              size="lg"
              block
              color="secondary"
              onClick={() => this.toggle("Info")}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Generell info
              <img
                src="../../images/icons/downarrow.svg"
                alt="arrow down"
              ></img>
            </Button>
            <Collapse isOpen={this.state.isInfoOpen}>
              <Card style={styles.infoBoxStyle}>
                <CardBody>
                  <h3>Hensmåla Triathlon går i år som vanligt!</h3>
                  <p>
                    I det fina småländska landskapet arrangeras årligen ett
                    minitriathlon till förmån för ALS-forskningen. Alla sträckor
                    är anpassade till den vackra Stora Hensjön och Hensmålas
                    landskap.
                  </p>
                  <p>
                  Sedan 2012 har vi nu samlat in över 1 000 000kr och skänkt
                  till ALS-forskningen. De tre senaste åren har gåvan riktats
                    mot Stoppa ALS och ALS Treatment Center Karolinska.
                  </p>
                  <p>Första start sker i år 23 juli 15.00.</p>
                  <b>Vad finns att göra på hensmåla Triathlon?</b>
                  <p>
                    Under normala forhållanden är Hensmåla Triathlon en folkfest där publiken är grunden till den goda stämningen. Det kommer finnas bland annat mat i form av grillad korv, fika, lotteri, massage och musik på plats. Kom gärna och heja på!
                  </p>
                </CardBody>
              </Card>
            </Collapse>
          </div>
          <div id="hitta-hit">
            <Button
              outline
              size="lg"
              block
              color="secondary"
              onClick={() => this.toggle("GetHere")}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Hitta hit
              <img
                src="../../images/icons/downarrow.svg"
                alt="arrow down"
              ></img>
            </Button>
            <Collapse isOpen={this.state.isGetHereOpen}>
              <Card style={styles.infoBoxStyle}>
                <CardBody>
                  <GetHere />
                </CardBody>
              </Card>
            </Collapse>
          </div>
          <div id="strackor">
            <Button
              outline
              size="lg"
              block
              color="secondary"
              onClick={() => this.toggle("Distances")}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Sträckor
              <img
                src="../../images/icons/downarrow.svg"
                alt="arrow down"
              ></img>
            </Button>
            <Collapse isOpen={this.state.isDistancesOpen}>
              <Card style={styles.infoBoxStyle}>
                <CardBody>
                  <Distances />
                </CardBody>
              </Card>
            </Collapse>
            <Button
              id="regler"
              outline
              size="lg"
              block
              color="secondary"
              onClick={() => this.toggle("Rules")}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Regler
              <img
                src="../../images/icons/downarrow.svg"
                alt="arrow down"
              ></img>
            </Button>
            <Collapse isOpen={this.state.isRulesOpen}>
              <Card style={styles.infoBoxStyle}>
                <CardBody>
                  <Rules />
                </CardBody>
              </Card>
            </Collapse>
            <Button
              id="results"
              outline
              size="lg"
              block
              color="secondary"
              onClick={() => this.toggle("results")}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Tidigare resultat
              <img
                src="../../images/icons/downarrow.svg"
                alt="arrow down"
              ></img>
            </Button>
            <Collapse isOpen={this.state.isResultsOpen}>
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
}

const styles = {
  infoBoxStyle: {
    marginBottom: 20,
  },
};

export default AboutHT;
