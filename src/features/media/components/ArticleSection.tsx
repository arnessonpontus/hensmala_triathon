import React, { useEffect } from "react";

import { Col } from "reactstrap";
interface Article {
  link: string,
  title: string
}

interface ArticleSectionProps {
  article: Article
}
export const ArticleSection = (props: ArticleSectionProps) => {
let randomNumbers: number[] = [];
  useEffect(() => {
    randomNumbers = Array.from({length: 5}, () => Math.floor(Math.random() * 7 + 1));
  }, [])

    return (
      <Col className="mt-4" md="6">
        <a
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
          href={"images/articleImages/" + props.article.link}
        >
          <div className="card-box-hoverable" style={{ height: 350 }}>
            <div className="article-placeholder">
              {randomNumbers.map(rnd => <div style={{width: rnd + "0%"}} className="article-placeholder-row"/>)}
            </div>
            <div style={styles.titleContainer as any}>
              <h5
                style={{
                  color: "black",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
                className="mt-2"
              >
                {props.article.title}
              </h5>
            </div>
          </div>
        </a>
      </Col>
    );
  }

const styles = {
  titleContainer: {
    maxHeight: 100,
    wordWrap: "break-word",
    textOverflow: "ellipsis",
    overflow: "hidden",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
  },
};
