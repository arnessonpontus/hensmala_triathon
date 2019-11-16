import React from "react";
import {
  Container,
  Row,
  Media,
  Card,
  CardBody,
  Col,
  CardImg,
  CardText,
  CardTitle
} from "reactstrap";

class Photos extends React.Component {
  render() {
    const albumName1 = "Hensmåla Triathlon 2019";
    const albumName2 = "Hensmåla Triathlon 2015";
    return (
      <Container>
        <Row>
          <Col className="mt-4" md="6">
            <a
              data-flickr-embed="true"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.flickr.com/photos/182868759@N06/albums/72157709850305827"
              title={albumName1}
            >
              <Card>
                <CardBody>
                  <CardImg
                    src="https://live.staticflickr.com/65535/48362160101_5f3715fc24_z.jpg"
                    width="320"
                    height="180"
                    alt={albumName1}
                  ></CardImg>
                  <CardTitle className="mt-2">{albumName1}</CardTitle>
                  <CardText>awd</CardText>
                </CardBody>
              </Card>
            </a>
          </Col>
          <Col className="mt-4" md="6">
            <a
              data-flickr-embed="true"
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.flickr.com/photos/126543226@N06/albums/72157656377504728"
              title={albumName2}
            >
              <Card>
                <CardBody>
                  <CardImg
                    src="https://live.staticflickr.com/499/20262091536_ecbc7c2106_z.jpg"
                    width="320"
                    height="180"
                    alt={albumName1}
                  ></CardImg>
                  <CardTitle className="mt-2">{albumName1}</CardTitle>
                  <CardText>dddd</CardText>
                </CardBody>
              </Card>
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Photos;
