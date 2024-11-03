import ClipLoader from "react-spinners/ClipLoader";
import videos from "../../../assets/videos.json";

import { Container, Row, Col } from "reactstrap";

export const Videos = () => {
    return (
      <Container className="pb-4">
        <Row>
          {videos.map((video) => {
            return (
              <Col className="mt-4" md="6">
                <div className="card-box">
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <ClipLoader
                      className="spinner"
                      size={50}
                      color={"black"}
                    />
                  </div>

                  <h5 style={{height: "2.2em"}}>{video.title}</h5>
                  <div className="embed-responsive embed-responsive-16by9">
                   <iframe src={video.link} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
