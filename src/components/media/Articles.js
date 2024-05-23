import React, { Fragment } from "react";
import articles from "../../assets/articles";
import ArticleSection from "./ArticleSection";

import { Row, Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

class Articles extends React.Component {
  state = {
    isDropdownOpen: false,
  };

  prevYears = ["2022", "2021","2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013"];

  onYearTap = (year) => {
    document
      .querySelector(".year-" + year)
      .scrollIntoView({ behavior: "smooth" });
  };

  onToTopTap = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  toggle = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
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
        <ButtonDropdown
          className="pb-5"
          isOpen={this.state.isDropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret>Choose year</DropdownToggle>
          <DropdownMenu>
            {this.prevYears.map((year) => (
              <DropdownItem onClick={() => this.onYearTap(year)}>
                {year}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
        <div className="px-5 pb-5">
          <h3>2024</h3>
          <Row>
            {articles["2024"].map((article) => {
              return <ArticleSection article={article} />;
            })}
          </Row>
        </div>
        {this.prevYears.map((year) => {
          return (
            <Fragment>
              <div className={`year-${year} article-seperator`}></div>
              <div className="p-5">
                <h3>{year}</h3>
                <Row>
                  {articles[year].map((article) => {
                    return <ArticleSection article={article} />;
                  })}
                </Row>
              </div>
            </Fragment>
          );
        })}
        <div className="article-seperator"></div>
      </div>
    );
  }
}

export default Articles;
