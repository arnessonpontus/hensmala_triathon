import React, { Component } from "react";
import sponsors from "../assets/sponsors";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardImg,
  CardText
} from "reactstrap";

class Sponsors extends Component {
  render() {
    return (
      <Container>
        <Row>
          {sponsors.map(sponsor => {
            return (
              <Col className="mt-4" md="4">
                <Card>
                  <CardBody>
                    <CardImg
                      height="100px"
                      src={"../../images/sponsorImages/" + sponsor.image}
                    ></CardImg>
                    <CardTitle className="mt-2">{sponsor.title}</CardTitle>
                    <CardText>{sponsor.text}</CardText>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={sponsor.link}
                      style={{ display: "flex" }}
                    >
                      <img
                        src="../../images/icons/website.svg"
                        alt="website"
                      ></img>
                      <CardText style={{ marginLeft: 15, fontSize: 14 }}>
                        {sponsor.link}
                      </CardText>
                    </a>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Sponsors;
