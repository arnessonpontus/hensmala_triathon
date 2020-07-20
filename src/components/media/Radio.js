import React from "react";
import radioShows from "../../assets/radioShows";

import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg,
} from "reactstrap";

class Radio extends React.Component {
  render() {
    return (
      <Container className="pb-4">
        <Row>
          {radioShows.map((radioShow) => {
            return (
              <Col className="mt-4" md="6">
                <Card style={{ minHeight: 500 }}>
                  <CardBody>
                    <CardImg
                      style={{ maxHeight: 200, objectFit: "cover" }}
                      src={radioShow.image}
                    ></CardImg>
                    <CardTitle className="mt-4">{radioShow.title}</CardTitle>
                    <CardText>{radioShow.text}</CardText>

                    <audio controls src={radioShow.radioSrc}>
                      Din webläsare stödjer ej ljudelementet
                    </audio>
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

export default Radio;
