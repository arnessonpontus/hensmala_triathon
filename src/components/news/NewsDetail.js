import React from "react";
import newsArc from "../../assets/news";
import ImageGallery from "react-image-gallery";
import YouTube from "react-youtube";
import { Container } from "reactstrap";
import ExternalInternalButtonLink from "../ExternalInternalButtonLink";

class NewsDetail extends React.Component {
  state = {
    newsDetail: null,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const { id } = this.props.match.params;
    const newsDetail = newsArc.find((news, i) => news.title === id)
    this.setState({ newsDetail: newsDetail});
  }

  opts = {
    playerVars: {
      height: "100%",
      width: "100%",
      autoplay: 0,
    },
  };

  render() {
    if (!this.state.newsDetail) {
      return <p>Laddar...</p>
    }
    const images = this.state.newsDetail.images;
    console.log(this.state.newsDetail.images)
    return (
      <Container>
        <div className="card-box d-block">
          <h1 className="m-4 minimize-title-small">{this.state.newsDetail.title}</h1>
          <p><i>{this.state.newsDetail.date}</i></p>
          <p><strong>{this.state.newsDetail.ingress}</strong></p>
          {this.state.newsDetail.text ? <p dangerouslySetInnerHTML={{ __html: this.state.newsDetail.text }}></p> : null}
            <ImageGallery showPlayButton={false} showFullscreenButton={true} items={images}/>
            {this.state.newsDetail.video ? (
              <div
                className="embed-responsive embed-responsive-16by9"
                style={{
                  minWidth: 200,
                  margin: "1em auto",
                  objectFit: "contain",
                }}
              >
                <YouTube
                  className="embed-responsive-item"
                  videoId={this.state.newsDetail.video}
                  opts={this.opts}
                />
              </div>
            ) : null}
            {this.state.newsDetail.link && this.state.newsDetail.linkName ? (
              <div className="mt-4 d-flex justify-content-center">
              <ExternalInternalButtonLink link={this.state.newsDetail.link} linkName={this.state.newsDetail.linkName}/>
              </div>
            ) : null}
        </div>
      </Container>
    );
  }
}

export default NewsDetail;
