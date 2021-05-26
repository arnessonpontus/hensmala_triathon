import React, { Component } from "react";

import { Col } from "reactstrap";

class SponsorSection extends Component {
  render() {
    return (
      <Col className="mt-4" md="6">
        <a
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
          href={"images/articleImages/" + this.props.article.link}
        >
          <div className="card-box-hoverable" style={{ height: 350 }}>
            <img
              src={
                this.props.article.thumbnail
                  ? "images/articleImages/" + this.props.article.thumbnail
                  : "images/articleImages/default_reflex_nr5_2015_300.jpg"
              }
              style={{ objectFit: "cover" }}
              width="100%"
              height="80%"
              alt={this.props.article.title}
            ></img>
            <div style={styles.titleContainer}>
              <h5
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
                className="mt-2"
              >
                {this.props.article.title}
              </h5>
            </div>
          </div>
        </a>
      </Col>
    );
  }
}

const styles = {
  titleContainer: {
    maxHeight: 100,
    wordWrap: "break-word",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
};

export default SponsorSection;
