import React from "react";
import { Collapse, Button, CardBody, Card, Container } from "reactstrap";
import Distances from "./Distances";
import GetHere from "./GetHere";
import Rules from "./Rules";
import { Link } from "react-router-dom";

class AboutHT extends React.Component {
  state = {
    isInfoOpen: false,
    isGetHereOpen: false,
    isDistancesOpen: false,
    isRulesOpen: false,
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
    return (
      <div>
        <img
          style={{ width: "100%" }}
          src="/images/about-ht.jpg"
          alt="HT_banner"
        ></img>
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
              <Card>
                <CardBody>
                  <h3>Hensmåla Triathlon är inställt för detta året!</h3>
                  <b>
                    Välkomna att kolla in här i framtiden för information om
                    nästa år.
                  </b>
                  <p>
                    <Link to="/utmaningen">
                      <Button color="info">Gå till Utmaningen istället</Button>
                    </Link>
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
              <Card>
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
              <Card>
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
              Tävlingsrelger
              <img
                src="../../images/icons/downarrow.svg"
                alt="arrow down"
              ></img>
            </Button>
            <Collapse isOpen={this.state.isRulesOpen}>
              <Card>
                <CardBody>
                  <Rules />
                </CardBody>
              </Card>
            </Collapse>
          </div>
        </Container>
      </div>
    );
  }
}

export default AboutHT;
