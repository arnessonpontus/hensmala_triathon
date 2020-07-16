import React from "react";
import { Link } from "react-router-dom";
import { Container, Card } from "reactstrap";

class Media extends React.Component {
  render() {
    return (
      <Container
        className="media-container"
        style={{
          paddingTop: 40,
          minHeight: "70vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <Link to="/radio">
          <Card style={styles.cardStyle} className="text-center m-2">
            <h3 style={styles.textStyle}>RADIO</h3>
            <img
              height="80px"
              width="80px"
              src="/images/radio.svg"
              alt="radio"
            ></img>
          </Card>
        </Link>

        <Link to="/artiklar">
          <Card style={styles.cardStyle} className="text-center m-2">
            <h3 style={styles.textStyle}>ARTIKLAR</h3>
            <img
              height="80px"
              width="80px"
              src="/images/article.svg"
              alt="article"
            ></img>
          </Card>
        </Link>

        <Link to="/videos">
          <Card style={styles.cardStyle} className="text-center m-2">
            <h3 style={styles.textStyle}>VIDEOS</h3>
            <img
              height="80px"
              width="80px"
              src="/images/video.svg"
              alt="video"
            ></img>
          </Card>
        </Link>

        <Link to="/foton">
          <Card style={styles.cardStyle} className="text-center m-2">
            <h3 style={styles.textStyle}>FOTON</h3>
            <img
              height="80px"
              width="80px"
              src="/images/camera.svg"
              alt="camera"
            ></img>
          </Card>
        </Link>
      </Container>
    );
  }
}

const styles = {
  cardStyle: {
    minWidth: 250,
    minHeight: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#11999E",
    borderWidth: 5,
    pointerEvents: "none",
  },
  textStyle: {
    color: "white",
  },
};

export default Media;
