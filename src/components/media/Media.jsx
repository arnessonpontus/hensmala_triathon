import React from "react";
import { NavLink as RRNavLink } from "react-router-dom";

import { Container } from "reactstrap";

class Media extends React.Component {
  render() {
    return (
      <Container className="media-container">
        <RRNavLink
          to="/radio"
          style={styles.cardStyle}
          className="card-box-hoverable"
        >
          <div>
            <h3 style={styles.textStyle}>RADIO</h3>
            <img
              height="80px"
              width="80px"
              src="/images/radio.svg"
              alt="radio"
            ></img>
          </div>
        </RRNavLink>

        <RRNavLink
          to="/artiklar"
          style={styles.cardStyle}
          className="card-box-hoverable"
        >
          <h3 style={styles.textStyle}>ARTIKLAR</h3>
          <img
            height="80px"
            width="80px"
            src="/images/article.svg"
            alt="article"
          ></img>
        </RRNavLink>

        <RRNavLink
          to="/videos"
          style={styles.cardStyle}
          className="card-box-hoverable"
        >
          <h3 style={styles.textStyle}>VIDEOS</h3>
          <img
            height="80px"
            width="80px"
            src="/images/video.svg"
            alt="video"
          ></img>
        </RRNavLink>

        <RRNavLink
          to="/foton"
          style={styles.cardStyle}
          className="card-box-hoverable"
        >
          <h3 style={styles.textStyle}>FOTON</h3>
          <img
            height="80px"
            width="80px"
            src="/images/camera.svg"
            alt="camera"
          ></img>
        </RRNavLink>
      </Container>
    );
  }
}

const styles = {
  cardStyle: {
    minWidth: 250,
    minHeight: 200,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 10,
    textDecoration: "none",
  },
  textStyle: {
    color: "#414242",
    fontWeight: "bold",
  },
};

export default Media;
