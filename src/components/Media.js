import React from "react";
import { Link } from "react-router-dom";
import { Container, Card, Col } from "reactstrap";

class Media extends React.Component {
  render() {
    return (
      <Container className="media">
        <Col>
          <Link to="/videos">
            <Card>
              <h3 className="logo">VIDEOS</h3>
            </Card>
          </Link>
        </Col>
        <Col>
          <Link to="/photos">
            <Card>
              <h3 className="logo">FOTON</h3>
            </Card>
          </Link>
        </Col>
      </Container>
    );
  }
}

export default Media;
