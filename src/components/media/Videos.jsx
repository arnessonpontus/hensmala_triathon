import React from "react";
import ClipLoader from "react-spinners/ClipLoader";
import videos from "../../assets/videos";

import { Container, Row, Col } from "reactstrap";

class Videos extends React.Component {
  state = {
    isVideoLoading: true,
  };

  render() {
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
                      sizeUnit={"px"}
                      size={50}
                      color={"black"}
                      loading={this.state.isVideoLoading}
                    />
                  </div>

                  <h5 style={{height: "2.2em"}}>{video.title}</h5>
                  <div className="embed-responsive embed-responsive-16by9">
                   <iframe src={video.link} width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }

}

export default Videos;
