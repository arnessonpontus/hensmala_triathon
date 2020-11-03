import React from "react";
import { Col } from "reactstrap";
import YouTube from "react-youtube";

const OneNews = (props) => {
  const opts = {
    playerVars: {
      height: "100%",
      width: "100%",
      autoplay: 0,
    },
  };
  return (
    <div
      key={props.news.date}
      style={{
        padding: 20,
        minHeight: 200,
        marginTop: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#d9d7d7",
        borderStyle: "solid",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        boxShadow: "0px 2px 2px 2px #e3e3e3",
      }}
    >
      <Col style={{ pointerEvents: "none" }}>
        <h3>{props.news.title}</h3>
        <p>{props.news.text}</p>

        <i style={{ justifySelf: "flex-end" }}>{props.news.date}</i>
      </Col>
      <Col
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {props.news.video ? (
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
              videoId={props.news.video}
              opts={opts}
              //onReady={() => this.setState({ isVideoLoading: false })}
            />
          </div>
        ) : (
          <img
            style={{
              minWidth: 200,
              margin: "1em auto",
              maxHeight: 200,
              objectFit: "contain",
            }}
            width="100%"
            src={props.news.image}
            alt={props.news.image}
          ></img>
        )}
      </Col>
    </div>
  );
};

export default OneNews;
