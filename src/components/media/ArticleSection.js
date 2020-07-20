import React, { Component } from "react";

import { Card, CardBody, Col, CardImg, CardTitle } from "reactstrap";

class SponsorSection extends Component {
  render() {
    return (
      <Col className="mt-4" md="6">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href={"images/articleImages/" + this.props.article.link}
        >
          <Card>
            <CardBody style={{ minHeight: 300 }}>
              <CardImg
                src={"images/articleThumbnails/reflex_nr5_2015_300.jpg"}
                style={{ objectFit: "cover", pointerEvents: "none" }}
                width="320"
                height="180"
                alt={this.props.article.title}
              ></CardImg>
              <CardTitle style={{ pointerEvents: "none" }} className="mt-2">
                {this.props.article.title}
              </CardTitle>
            </CardBody>
          </Card>
        </a>
      </Col>
    );
  }
}

export default SponsorSection;
