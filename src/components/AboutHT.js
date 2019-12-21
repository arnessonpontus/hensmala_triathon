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
        <Container className="mt-5">
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
                    Sed placerat egestas ullamcorper. Orci varius natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. In faucibus tellus quis enim bibendum, sed
                    hendrerit nulla lacinia. Morbi pharetra neque et metus
                    tristique, vel consequat augue condimentum. In mattis porta
                    nisl, in bibendum dolor sodales sit amet. Nunc elit quam,
                    consequat id nulla at, blandit viverra eros. Donec urna
                    nisl, ultrices eu elementum non, lobortis sed felis.
                    Praesent tristique, nisi mollis posuere ullamcorper, quam
                    orci ultrices turpis, sed semper neque ante et risus.
                    Vestibulum molestie leo id dolor lacinia, id commodo quam
                    ultricies. Ut semper vel quam ac tincidunt. Aliquam sagittis
                    nulla et posuere porta. Pellentesque eleifend consequat
                    nisi, quis consequat nisi pellentesque vitae. Pellentesque
                    rhoncus suscipit nunc ut iaculis. Ut rutrum venenatis elit,
                    ut volutpat enim commodo vitae.
                  </p>
                  <p>
                    Sed placerat egestas ullamcorper. Orci varius natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. In faucibus tellus quis enim bibendum, sed
                    hendrerit nulla lacinia. Morbi pharetra neque et metus
                    tristique, vel consequat augue condimentum. In mattis porta
                    nisl, in bibendum dolor sodales sit amet. Nunc elit quam,
                    consequat id nulla at, blandit viverra eros. Donec urna
                    nisl, ultrices eu elementum non, lobortis sed felis.
                    Praesent tristique, nisi mollis posuere ullamcorper, quam
                    orci ultrices turpis, sed semper neque ante et risus.
                    Vestibulum molestie leo id dolor lacinia, id commodo quam
                    ultricies. Ut semper vel quam ac tincidunt. Aliquam sagittis
                    nulla et posuere porta. Pellentesque eleifend consequat
                    nisi, quis consequat nisi pellentesque vitae. Pellentesque
                    rhoncus suscipit nunc ut iaculis. Ut rutrum venenatis elit,
                    ut volutpat enim commodo vitae.
                  </p>
                  <p>
                    Sed placerat egestas ullamcorper. Orci varius natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. In faucibus tellus quis enim bibendum, sed
                    hendrerit nulla lacinia. Morbi pharetra neque et metus
                    tristique, vel consequat augue condimentum. In mattis porta
                    nisl, in bibendum dolor sodales sit amet. Nunc elit quam,
                    consequat id nulla at, blandit viverra eros. Donec urna
                    nisl, ultrices eu elementum non, lobortis sed felis.
                    Praesent tristique, nisi mollis posuere ullamcorper, quam
                    orci ultrices turpis, sed semper neque ante et risus.
                    Vestibulum molestie leo id dolor lacinia, id commodo quam
                    ultricies. Ut semper vel quam ac tincidunt. Aliquam sagittis
                    nulla et posuere porta. Pellentesque eleifend consequat
                    nisi, quis consequat nisi pellentesque vitae. Pellentesque
                    rhoncus suscipit nunc ut iaculis. Ut rutrum venenatis elit,
                    ut volutpat enim commodo vitae.
                  </p>
                  <p>
                    Sed placerat egestas ullamcorper. Orci varius natoque
                    penatibus et magnis dis parturient montes, nascetur
                    ridiculus mus. In faucibus tellus quis enim bibendum, sed
                    hendrerit nulla lacinia. Morbi pharetra neque et metus
                    tristique, vel consequat augue condimentum. In mattis porta
                    nisl, in bibendum dolor sodales sit amet. Nunc elit quam,
                    consequat id nulla at, blandit viverra eros. Donec urna
                    nisl, ultrices eu elementum non, lobortis sed felis.
                    Praesent tristique, nisi mollis posuere ullamcorper, quam
                    orci ultrices turpis, sed semper neque ante et risus.
                    Vestibulum molestie leo id dolor lacinia, id commodo quam
                    ultricies. Ut semper vel quam ac tincidunt. Aliquam sagittis
                    nulla et posuere porta. Pellentesque eleifend consequat
                    nisi, quis consequat nisi pellentesque vitae. Pellentesque
                    rhoncus suscipit nunc ut iaculis. Ut rutrum venenatis elit,
                    ut volutpat enim commodo vitae.
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
