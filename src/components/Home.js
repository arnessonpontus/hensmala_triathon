import React, { Component } from "react";
import News from "./news/News";
import { Container, Row, Col} from "reactstrap";

class Home extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalID);
  }

  render() {
    return (
      <div>
        <div className="banner-wrapper">
          <img
            className="banner"
            src="/images/ht_banner_resized.jpg"
            alt="HT_banner"
          ></img>
          <div className="center-absolute flex-column">
            <span className="banner-text title">Tack för i år!</span>
            <span className="banner-text subtitle">Vi nådde miljonen!</span>
          </div>
        </div>
        <Container className="p-4">
          <div className="card-box">
            <Row>
              <Col className="my-4" ms={4}>
                <h2>Välkommen till Hensmåla Triathlon</h2>
                <p>
                  I det fina småländska landskapet arrangeras årligen ett
                  minitriathlon till förmån för ALS-forskningen. Alla sträckor
                  är anpassade till den vackra Stora Hensjön och Hensmålas
                  landskap.
                  <br></br>
                  <br></br>
                  Sedan 2012 har vi nu samlat in över 1 000 000kr och skänkt
                  till ALS-forskningen. Vill du vara med och bidra för att bekämpa ALS, swisha din gåva till <b>1234048781</b>.
                </p>
              </Col>

              <Col className="text-center mt-4 my-auto" ms={4}>
                <img
                  width="250px"
                  src="/images/qr_swish.svg"
                  alt="hensmala_triathlon"
                ></img>
              </Col>
            </Row>
          </div>
          <Row>
            <News />
          </Row>
        </Container>
      </div>
    );
  }
}

export default Home;
