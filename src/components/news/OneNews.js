import React from "react";
import { Col, Row, Button } from "reactstrap";
import YouTube from "react-youtube";
import { NavLink as RRNavLink } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import ExternalInternalButtonLink from "../ExternalInternalButtonLink";

const OneNews = (props) => {
  const opts = {
    playerVars: {
      height: "100%",
      width: "100%",
      autoplay: 0,
    },
  };
  return (
    <Fade left>
      <div key={props.news.date} className="card-box">
        <Col>
          <Row>
            <h3>{props.news.title}</h3>
          </Row>
          <Row>
            <p>{props.news.ingress}</p>
          </Row>
          <Row>
            <RRNavLink className="nostyle-link mb-2" to={'/news/' + props.news.title}> <Button outline>Läs mer</Button></RRNavLink>
          </Row>
          <Row>
            <i>{props.news.date}</i>
          </Row>
          <Row>
            {props.news.link && props.news.linkName ? (
              <ExternalInternalButtonLink link={props.news.link} linkName={props.news.linkName}/>
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
              src={props.news.images[0]?.thumbnail}
              alt={props.news.images[0]?.thumbnail}
            ></img>
          )}
        </Col>
      </div>
    </Fade>
  );
};

export default OneNews;
