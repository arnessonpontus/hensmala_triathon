import React from "react";
import News from "../../news/components/News";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { SponsorHighlight } from "../../sponsor/components/SponsorHighlight";
import { BannerTime } from "../components/BannerTime";
import { PulsingButton } from "../../../components/Button/PulsingButton";

export const Home: React.FC = () => {
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="banner-wrapper">
        <img
          className="banner"
          src="/images/ht_banner_resized.jpg"
          alt="HT_banner"
        ></img>
        <div className="center-absolute w-100 text-center">
          <BannerTime />
        </div>
      </div>
      <Container className="p-4">
      <Row style={{display: "flex", justifyContent: "center", padding: 10}}>
      <Link to="/anmalan">
        <PulsingButton>Anmäl dig här <i className="fas fa-arrow-right" style={{color: "white"}}></i></PulsingButton>
      </Link>
      </Row>
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
                Sedan 2012 har vi nu samlat in över 1 200 000kr och skänkt
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
        <SponsorHighlight />
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link style={{ color: "black", marginTop: "3px" }} to="/sponsorer">Se alla sponsorer →</Link>
        </div>
        <Row>
          <News />
        </Row>
      </Container>
    </div>
  );
}
