import React from "react";
import { Collapse, Button, CardBody, Card, Container } from "reactstrap";
import Distances from "./Distances";
import GetHere from "./GetHere";

class AboutHT extends React.Component {
  state = {
    isInfoOpen: false,
    isGetHereOpen: false,
    isDistancesOpen: false
  };

  constructor(props) {
    super(props);

    this.toggleInfo = this.toggleInfo.bind(this);
    this.toggleGetHEre = this.toggleGetHere.bind(this);
    this.toggleDistances = this.toggleDistances.bind(this);
  }

  toggleInfo = () => {
    this.setState({ isInfoOpen: !this.state.isInfoOpen });
  };

  toggleGetHere = () => {
    this.setState({ isGetHereOpen: !this.state.isGetHereOpen });
  };

  toggleDistances = () => {
    this.setState({ isDistancesOpen: !this.state.isDistancesOpen });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
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
          <div>
            <Button
              outline
              size="lg"
              block
              color="secondary"
              onClick={this.toggleInfo}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
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
                  <p>
                    Hensmåla Triathlon gå av stapeln för åttonde året i rad och
                    i år kommer det bli bättre än någonsin!
                  </p>
                </CardBody>
              </Card>
            </Collapse>
          </div>
          <div>
            <Button
              outline
              size="lg"
              block
              color="secondary"
              onClick={this.toggleGetHere}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
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
          <div>
            <Button
              outline
              size="lg"
              block
              color="secondary"
              onClick={this.toggleDistances}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
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
          </div>
        </Container>
      </div>
    );
  }
}

export default AboutHT;
