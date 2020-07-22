import React, { Component } from "react";
import { NavLink as RRNavLink } from "react-router-dom";

import { Col, Card, CardBody } from "reactstrap";
import newsArc from "../assets/news";
import OneNews from "./OneNews";

class News extends Component {
  render() {
    return (
      <Col className="s mt-5">
        <Card style={{ boxShadow: "0px 1px 1px 1px #e3e3e3" }}>
          <CardBody>
            <h2>Nyheter</h2>
            {newsArc.map((news) => {
              return news.link ? (
                <RRNavLink
                  target="_blank"
                  rel="noopener noreferrer"
                  tag={RRNavLink}
                  to={news.link}
                >
                  <OneNews news={news} />
                </RRNavLink>
              ) : (
                <OneNews news={news} />
              );
            })}
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default News;
