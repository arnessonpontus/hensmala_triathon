import React from "react";
import YouTube from "react-youtube";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  CardText
} from "reactstrap";

class Videos extends React.Component {
  state = {
    isVideoLoading: true
  };

  render() {
    const opts = {
      height: "70%",
      width: "90%",
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    const videos = [
      {
        id: "2g811Eo7K8U",
        text:
          "Hensmåla Triathlon-arrangörerna Eva och Lennart Arnesson är nominerade till Årets Kronobergare 2018 - Peje i Hensmåla.",
        title: "Katter som är roliga"
      },
      {
        id: "Årets kronobergare 2",
        text: "Redigerad av Lennart Arnesson",
        title: "Hensmåla Triathlon 2015"
      },
      {
        id: "Neuropodden 9 september 2017",
        text: "Redigerad av Andre Arnesson",
        title: "Hensmåla Triathlon 2018"
      }
    ];

    return (
      <Container>
        <Row>
          {videos.map(video => {
            return (
              <Col className="mt-4 text-center" md="6">
                <Card>
                  <CardBody>
                    <ClipLoader
                      className="spinner"
                      sizeUnit={"px"}
                      size={100}
                      color={"black"}
                      loading={this.state.isVideoLoading}
                    />
                    <YouTube
                      videoId={video.id}
                      opts={opts}
                      onReady={() => this.setState({ isVideoLoading: false })}
                    />
                    <CardTitle className="mt-2">{video.title}</CardTitle>
                    <CardText>{video.text}</CardText>
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
