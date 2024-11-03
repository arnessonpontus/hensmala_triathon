import { Link} from "react-router-dom";

import { Container } from "reactstrap";

export const Media = () => {
    return (
      <Container className="media-container">
        <Link
          to="/radio"
          style={styles.cardStyle as any}
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
        </Link>

        <Link
          to="/artiklar"
          style={styles.cardStyle as any}
          className="card-box-hoverable"
        >
          <h3 style={styles.textStyle}>ARTIKLAR</h3>
          <img
            height="80px"
            width="80px"
            src="/images/article.svg"
            alt="article"
          ></img>
        </Link>

        <Link
          to="/videos"
          style={styles.cardStyle as any}
          className="card-box-hoverable"
        >
          <h3 style={styles.textStyle}>VIDEOS</h3>
          <img
            height="80px"
            width="80px"
            src="/images/video.svg"
            alt="video"
          ></img>
        </Link>

        <Link
          to="/foton"
          style={styles.cardStyle as any}
          className="card-box-hoverable"
        >
          <h3 style={styles.textStyle}>FOTON</h3>
          <img
            height="80px"
            width="80px"
            src="/images/camera.svg"
            alt="camera"
          ></img>
        </Link>
      </Container>
    );
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
