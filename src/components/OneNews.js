import React from "react";
import { Col, Row, Button } from "reactstrap";
import YouTube from "react-youtube";
import { NavLink as RRNavLink } from "react-router-dom";

const OneNews = (props) => {
  const opts = {
    playerVars: {
      height: "100%",
      width: "100%",
      autoplay: 0,
    },
  };
  return (
    <div key={props.news.date} className="card-box">
      <Col>
        <Row>
          <h3>{props.news.title}</h3>
        </Row>
        <Row>
          <p>{props.news.text}</p>
        </Row>
        <Row>
          <i style={{ justifySelf: "flex-end" }}>{props.news.date}</i>
        </Row>
        <Row>
          {props.news.link ? (
            <RRNavLink
              style={{ textDecoration: "none" }}
              target="_blank"
              rel="noopener noreferrer"
              tag={RRNavLink}
              to={props.news.link}
            >
              <Button style={{ marginTop: 4 }}>Läs mer</Button>
            </RRNavLink>
          ) : null}
        </Row>
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
