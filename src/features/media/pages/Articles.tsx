import React, { useEffect, useState } from "react";
import articles from "../../../assets/articles.json";

import { Row, Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { ArticleSection } from "../components/ArticleSection";

export const Articles = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    onToTopTap();
  }, [])

  const years = ["2024", "2022", "2021","2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013"];

  const onYearTap = (yearIndex: number) => {
    if (yearIndex === 0) {
      onToTopTap();
      return;
    }
      document.querySelector(".year-" + years[yearIndex-1])?.scrollIntoView({ behavior: "smooth" });
  };

  const onToTopTap = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

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
          onClick={() => onToTopTap()}
        >
          <i
            className="fas fa-chevron-up"
            style={{ marginLeft: 5, color: "white" }}
          ></i>{" "}
          Till toppen
        </Button>
        <ButtonDropdown
          className="pb-5 sticky-top"
          style={{ top: 80, zIndex: 4}}
          isOpen={isDropdownOpen}
          toggle={toggle}
        >
          <DropdownToggle caret>Välj år</DropdownToggle>
          <DropdownMenu>
            {years.map((year, i) => (
              <DropdownItem onClick={() => onYearTap(i)}>
                {year}
              </DropdownItem>
            ))}
          </DropdownMenu>
        </ButtonDropdown>
        {years.map((year, i) => {
          return (
            <>
              <div className="p-5">
                <h3>{year}</h3>
                <Row>
                  {articles[year as keyof typeof articles].map((article) => {
                    return <ArticleSection article={article} />;
                  })}
                </Row>
              </div>
              {i < years.length - 1 && <div className={`year-${year} article-seperator`}></div>}
            </>
          );
        })}
      </div>
    );
  }
