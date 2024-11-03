import React, { useEffect, useState } from "react";
import newsArc from "../../../assets/news.json";
import ImageGallery from "react-image-gallery";
import YouTube from "react-youtube";
import { Container } from "reactstrap";
import ExternalInternalButtonLink from "../../../components/ExternalInternalButtonLink";
import { NewsType } from "../components/OneNews";
import { useParams } from "react-router-dom";
import { spaceToDash } from "../../../utils";

export const NewsDetail = () => {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState<NewsType | undefined>(undefined);

  useEffect(() => {
    window.scrollTo(0, 0);
    const newsDetail = newsArc.find((news, i) => spaceToDash(news.title) === id)
    setNewsDetail(newsDetail);
  }, [])

  const opts = {
    playerVars: {
      height: "100%",
      width: "100%",
      autoplay: 0,
    },
  };

  if (!newsDetail) {
    return <p>Laddar...</p>
  }

  return (
    <Container>
      <div className="card-box d-block">
        <h1 className="m-4 minimize-title-small">{newsDetail.title}</h1>
        <p><i>{newsDetail.date}</i></p>
        <p><strong>{newsDetail.ingress}</strong></p>
        {newsDetail.text ? <p dangerouslySetInnerHTML={{ __html: newsDetail.text }}></p> : null}
        <ImageGallery showPlayButton={false} showFullscreenButton={true} items={newsDetail?.images} />
        {newsDetail.video ? (
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
              videoId={newsDetail.video}
              opts={opts}
            />
          </div>
        ) : null}
        {newsDetail.link && newsDetail.linkName ? (
          <div className="mt-4 d-flex justify-content-center">
            <ExternalInternalButtonLink link={newsDetail.link} linkName={newsDetail.linkName} />
          </div>
        ) : null}
      </div>
    </Container>
  );
}
