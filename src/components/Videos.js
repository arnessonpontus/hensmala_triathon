import React from "react";
import YouTube from "react-youtube";
import ClipLoader from "react-spinners/ClipLoader";
import { Container, Row } from "reactstrap";

class Videos extends React.Component {
  state = {
    isVideoLoading: true
  };

  render() {
    const opts = {
      height: "250",
      width: "480",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    return (
      <Container className="p-5">
        <Row>
          <ClipLoader
            className="spinner"
            sizeUnit={"px"}
            size={100}
            color={"black"}
            loading={this.state.isVideoLoading}
          />

          <YouTube
            videoId="2g811Eo7K8U"
            opts={opts}
            onReady={() => this.setState({ isVideoLoading: false })}
            className="video"
          />
          <YouTube
            videoId="4_8Tvd9LpHU"
            opts={opts}
            onReady={() => this.setState({ isVideoLoading: false })}
            className="video"
          />
          <YouTube
            videoId="4_8Tvd9LpHU"
            opts={opts}
            onReady={() => this.setState({ isVideoLoading: false })}
            className="video"
          />
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
