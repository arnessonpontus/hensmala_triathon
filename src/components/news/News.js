import React, { Component } from "react";

import { Col } from "reactstrap";
import newsArc from "../../assets/news";
import OneNews from "./OneNews";

class News extends Component {
  render() {
    return (
      <Col className="s mt-5">
        <h2>Nyheter</h2>
        {newsArc.map((news, i) => {
          return <OneNews key={i} news={news} />;
        })}
      </Col>
    );
  }
}

export default News;
