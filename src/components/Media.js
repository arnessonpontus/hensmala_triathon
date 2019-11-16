import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardBody, Col, Row } from "reactstrap";

class Media extends React.Component {
  render() {
    return (
      <Container className="pt-3">
        <Row className="justify-content-center">
          <Col md="4">
            <Link to="/radio">
              <Card className="text-center">
                <CardBody>
                  <h3 className="logo">RADIO</h3>
                  <img
                    style={{ width: "80%" }}
                    src="/images/radio.svg"
                    alt="radio"
                  ></img>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col md="4">
            <Link to="/articles">
              <Card className="text-center ">
                <CardBody>
                  <h3 className="logo">ARTIKLAR</h3>
                  <img
                    style={{ width: "80%" }}
                    src="/images/article.svg"
                    alt="article"
                  ></img>
                </CardBody>
              </Card>
            </Link>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col className="mt-4" md="4">
            <Link to="/videos">
              <Card className="text-center">
                <CardBody>
                  <h3 className="logo">VIDEOS</h3>
                  <img
                    style={{ width: "80%" }}
                    src="/images/video.svg"
                    alt="video"
                  ></img>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col className="mt-4" md="4">
            <Link to="/photos">
              <Card className="text-center">
                <CardBody>
                  <h3 className="logo">FOTON</h3>
                  <img
                    style={{ width: "80%" }}
                    src="/images/camera.svg"
                    alt="camera"
                  ></img>
                </CardBody>
              </Card>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Media;
