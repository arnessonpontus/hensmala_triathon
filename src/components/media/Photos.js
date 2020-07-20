import React from "react";
import photoAlbums from "../../assets/photoAlbums";

import {
  Container,
  Row,
  Card,
  CardBody,
  Col,
  CardImg,
  CardTitle,
} from "reactstrap";

class Photos extends React.Component {
  render() {
    return (
      <Container className="pb-4">
        <Row>
          {photoAlbums.map((album) => {
            return (
              <Col className="mt-4" md="6">
                <a
                  data-flickr-embed="true"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={album.src}
                  title={album.title}
                  style={{ color: "black" }}
                >
                  <Card>
                    <CardBody>
                      <CardImg
                        src={album.image}
                        style={{ objectFit: "cover", pointerEvents: "none" }}
                        width="280px"
                        height="280px"
                        alt={album.title}
                      ></CardImg>
                      <CardTitle
                        style={{ pointerEvents: "none" }}
                        className="mt-2"
                      >
                        {album.title}
                      </CardTitle>
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
