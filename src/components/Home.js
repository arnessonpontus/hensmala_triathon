import React, { Component } from "react";
import News from "./news/News";
import moment from 'moment-timezone';
import { Container, Row, Col} from "reactstrap";

export function getDaysFromNow(day) {
  return Math.ceil(moment(day).tz("Europe/Stockholm").diff(moment().tz("Europe/Stockholm"))/86400000)
}

class Home extends Component {
  state = {
    daysLeft: getDaysFromNow("2022-07-23"),
    intervalID: null,
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);

    const intervalID = setInterval(() => {
      this.setState({daysLeft: Math.max(0, getDaysFromNow("2022-07-23"))})
    }, 1000)
    this.setState({intervalID})
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
          <div className="center-absolute">
            <span className="countdown">{this.state.daysLeft} dagar kvar</span>
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
                  Sedan 2012 har vi samlat in strax över 890 000kr och skänkt
                  till ALS forskningen. Hjälp oss att nå miljonen! Vill du inte vara med och tävla? Swisha din gåva till <b>1234048781</b>.
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
