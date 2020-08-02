import React from "react";
import articles from "../../assets/articles";
import ArticleSection from "./ArticleSection";

import { Row, ButtonGroup, Button } from "reactstrap";

class Articles extends React.Component {
  onYearTap = (year) => {
    document
      .querySelector(".year-" + year)
      .scrollIntoView({ behavior: "smooth" });
  };

  onToTopTap = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  render() {
    return (
      <div className="text-center pt-5">
        <Button
          color="primary"
          style={{
            zIndex: 1,
            position: "fixed",
            bottom: "15px",
            right: "15px",
          }}
          onClick={() => this.onToTopTap()}
        >
          <i
            className="fas fa-chevron-up"
            style={{ marginLeft: 5, color: "white" }}
          ></i>{" "}
          Till toppen
        </Button>
        <ButtonGroup size="sm" className="px-5 pb-5">
          <Button onClick={() => this.onYearTap("2013")}>2013</Button>
          <Button onClick={() => this.onYearTap("2014")}>2014</Button>
          <Button onClick={() => this.onYearTap("2015")}>2015</Button>
          <Button onClick={() => this.onYearTap("2016")}>2016</Button>
          <Button onClick={() => this.onYearTap("2017")}>2017</Button>
          <Button onClick={() => this.onYearTap("2018")}>2018</Button>
          <Button onClick={() => this.onYearTap("2019")}>2019</Button>
        </ButtonGroup>
        <div className="px-5 pb-5">
          <h3>2020</h3>
          <Row>
            {articles.twenty.map((article) => {
              return <ArticleSection article={article} />;
            })}
          </Row>
        </div>
        <div className="year-2019 article-seperator"></div>
        <div className="p-5">
          <h3>2019</h3>
          <Row>
            {articles.nineteen.map((article) => {
              return <ArticleSection article={article} />;
            })}
          </Row>
        </div>
        <div className="year-2018 article-seperator"></div>
        <div className="p-5">
          <h3>2018</h3>
          <Row>
            {articles.eighteen.map((article) => {
              return <ArticleSection article={article} />;
            })}
          </Row>
        </div>
        <div className="year-2017 article-seperator"></div>
        <div className="p-5">
          <h3>2017</h3>
          <Row>
            {articles.seventeen.map((article) => {
              return <ArticleSection article={article} />;
            })}
          </Row>
        </div>
        <div className="year-2016 article-seperator"></div>
        <div className="p-5">
          <h3>2016</h3>
          <Row>
            {articles.sixteen.map((article) => {
              return <ArticleSection article={article} />;
            })}
          </Row>
        </div>
        <div className="year-2015 article-seperator"></div>
        <div className="p-5">
          <h3>2015</h3>
          <Row>
            {articles.fifteen.map((article) => {
              return <ArticleSection article={article} />;
            })}
          </Row>
        </div>
        <div className="year-2014 article-seperator"></div>
        <div className="p-5">
          <h3>2014</h3>
          <Row>
            {articles.fourteen.map((article) => {
              return <ArticleSection article={article} />;
            })}
          </Row>
        </div>
        <div className="year-2013 article-seperator"></div>
        <div className="p-5">
          <h3>2013</h3>
          <Row>
            {articles.thirteen.map((article) => {
              return <ArticleSection article={article} />;
            })}
          </Row>
        </div>
        <div className="article-seperator"></div>
      </div>
    );
  }
}

export default Articles;
