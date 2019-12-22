import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, CardBody, Row } from "reactstrap";

class Media extends React.Component {
  render() {
    return (
      <Container>
        <Row className="justify-content-center ">
          <Link to="/radio">
            <Card
              style={{ minWidth: 200, borderColor: "#b6dcdf", borderWidth: 5 }}
              className="text-center m-2 "
            >
              <CardBody>
                <h3 className="logo">RADIO</h3>
                <img src="/images/radio.svg" alt="radio"></img>
              </CardBody>
            </Card>
          </Link>

          <Link to="/articles">
            <Card
              style={{ minWidth: 200, borderColor: "#b6dcdf", borderWidth: 5 }}
              className="text-center m-2"
            >
              <CardBody>
                <h3 className="logo">ARTIKLAR</h3>
                <img src="/images/article.svg" alt="article"></img>
              </CardBody>
            </Card>
          </Link>

          <Link to="/videos">
            <Card
              style={{ minWidth: 200, borderColor: "#b6dcdf", borderWidth: 5 }}
              className="text-center m-2"
            >
              <CardBody>
                <h3 className="logo">VIDEOS</h3>
                <img src="/images/video.svg" alt="video"></img>
              </CardBody>
            </Card>
          </Link>

          <Link to="/photos">
            <Card
              style={{ minWidth: 200, borderColor: "#b6dcdf", borderWidth: 5 }}
              className="text-center m-2"
            >
              <CardBody>
                <h3 className="logo">FOTON</h3>
                <img src="/images/camera.svg" alt="camera"></img>
              </CardBody>
            </Card>
          </Link>
        </Row>
      </Container>
    );
  }
}

export default Media;
