import React, { Fragment } from "react";
import articles from "../../assets/articles";
import ArticleSection from "./ArticleSection";

import { Row, Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";

class Articles extends React.Component {
  state = {
    isDropdownOpen: false,
  };

  years = ["2024", "2022", "2021","2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013"];

  onYearTap = (yearIndex) => {
    if (yearIndex === 0) {
      this.onToTopTap();
      return;
    }

    document
      .querySelector(".year-" + this.years[yearIndex-1])
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
          className="pb-5 sticky-top"
          style={{ top: 80 }}
          isOpen={this.state.isDropdownOpen}
          toggle={this.toggle}
        >
          <DropdownToggle caret>Choose year</DropdownToggle>
          <DropdownMenu>
            {this.years.map((year, i) => (
              <DropdownItem onClick={() => this.onYearTap(i)}>
                {year}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
        {this.years.map((year, i) => {
          return (
            <>
              <div className="p-5">
                <h3>{year}</h3>
                <Row>
                  {articles[year].map((article) => {
                    return <ArticleSection article={article} />;
                  })}
                </Row>
              </div>
              {i < this.years.length - 1 && <div className={`year-${year} article-seperator`}></div>}
            </>
          );
        })}
      </div>
    );
  }
}

export default Articles;
