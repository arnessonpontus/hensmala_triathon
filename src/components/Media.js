import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardBody, Col, Row } from "reactstrap";

class Media extends React.Component {
  render() {
    return (
      <Container>
        <Row
          style={{
            minHeight: "90vh",
            alignItems: "center",
            justifyContent: "space-around"
          }}
        >
          <Col md="4">
            <Link to="/videos">
              <Card className="text-center">
                <CardBody>
                  <h3 className="logo">VIDEOS</h3>
                  <img
                    style={{ width: "30vh" }}
                    src="/images/video.svg"
                    alt="video"
                  ></img>
                </CardBody>
              </Card>
            </Link>
          </Col>
          <Col md="4">
            <Link to="/photos">
              <Card className="text-center">
                <CardBody>
                  <h3 className="logo">FOTON</h3>
                  <img
                    style={{ width: "30vh" }}
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
