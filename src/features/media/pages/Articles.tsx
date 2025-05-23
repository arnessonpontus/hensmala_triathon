import { useEffect, useState } from "react";

import { Row, Button, ButtonDropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
import { ArticleSection } from "../components/ArticleSection";
import { Entry } from "contentful";
import { TypeArticleSkeleton } from "../../../../generated/type";
import { useContentfulClient } from "../../../hooks/useContentfulClient";

const onToTopTap = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

export const Articles = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [entries, setEntries] = useState<Entry<TypeArticleSkeleton, undefined, string>[]>([]);
  const [years, setYears] = useState<number[]>([]);

  const client = useContentfulClient();
  
  const onYearTap = (yearIndex: number) => {
    if (yearIndex === 0) {
      onToTopTap();
      return;
    }
      document.querySelector(".year-" + years[yearIndex-1])?.scrollIntoView({ behavior: "smooth" });
  };

  const fetchEntries = async (): Promise<void> => {
    client
      .getEntries<TypeArticleSkeleton>({
        content_type: "article",
        order: ["-sys.createdAt"],
      })
      .then((res) => {
        setEntries(res.items);
        setYears(Array.from(new Set(res.items.map(item => item.fields.year))).sort().reverse())
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    onToTopTap();
    fetchEntries();
  }, [])

  const toggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

    return (
      <div className="text-center pt-5 min-vh-100">
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
                  {entries.filter(e => e.fields.year === year).map((article) => {
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
