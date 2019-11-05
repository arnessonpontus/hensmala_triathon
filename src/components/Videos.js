import React from "react";
import YouTube from "react-youtube";
import ClipLoader from "react-spinners/ClipLoader";

class Videos extends React.Component {
  state = {
    isVideoLoading: true
  };

  render() {
    const opts = {
      height: "290",
      width: "540",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    return (
      <div className="videos">
        <h1>VIDEOS</h1>
        <ClipLoader
          className="spinner"
          sizeUnit={"px"}
          size={100}
          color={"white"}
          loading={this.state.isVideoLoading}
        />
        <div className="video-grid">
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
        </div>
      </div>
    );
  }

  _onReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  }
}

export default Videos;
