import React from "react";
import photoAlbums from "../assets/photoAlbums";

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
    return (
      <Container>
        <Row>
          {photoAlbums.map(album => {
            return (
              <Col className="mt-4" md="6">
                <a
                  data-flickr-embed="true"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={album.src}
                  title={album.title}
                >
                  <Card>
                    <CardBody>
                      <CardImg
                        src={album.image}
                        style={{ objectFit: "cover" }}
                        width="320"
                        height="180"
                        alt={album.title}
                      ></CardImg>
                      <CardTitle className="mt-2">{album.title}</CardTitle>
                    </CardBody>
                  </Card>
                </a>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Photos;
