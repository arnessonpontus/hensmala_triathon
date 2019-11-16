import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody, CardText } from "reactstrap";

class News extends Component {
  render() {
    return (
      <Col className="s mt-5">
        <Card>
          <CardBody>
            <h2>Nyheter</h2>
            <CardText>
              Snart öppnar anmälan till Hensmåla Triathlon 2020!
            </CardText>
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default News;
