import React from "react";
import photoAlbums from "../../assets/photoAlbums";

import { Container, Row, Col } from "reactstrap";

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
                  style={{
                    color: "black",
                    textDecoration: "none",
                  }}
                >
                  <div className="card-box-hoverable" style={{ height: 350 }}>
                    <img
                      src={album.image}
                      style={{ objectFit: "cover" }}
                      width="100%"
                      height="80%"
                      alt={album.title}
                    ></img>
                    <h5 className="mt-2" style={{ fontWeight: "bold" }}>
                      {album.title}
                    </h5>
                  </div>
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
