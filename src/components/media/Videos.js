import React from "react";
import YouTube from "react-youtube";
import ClipLoader from "react-spinners/ClipLoader";
import videos from "../../assets/videos";

import { Container, Row, Col, Card, CardBody } from "reactstrap";

class Videos extends React.Component {
  state = {
    isVideoLoading: true,
  };

  render() {
    const opts = {
      playerVars: {
        height: "100%",
        width: "100%",
        autoplay: 0,
      },
    };

    return (
      <Container className="pb-4">
        <Row>
          {videos.map((video) => {
            return (
              <Col className="mt-4" md="6">
                <Card>
                  <CardBody>
                    <ClipLoader
                      className="spinner"
                      sizeUnit={"px"}
                      size={50}
                      color={"black"}
                      loading={this.state.isVideoLoading}
                    />
                    <div className="embed-responsive embed-responsive-16by9">
                      <YouTube
                        className="embed-responsive-item"
                        videoId={video.id}
                        opts={opts}
                        onReady={() => this.setState({ isVideoLoading: false })}
                      />
                    </div>

                    <h4 className="mt-2">{video.title}</h4>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Videos;