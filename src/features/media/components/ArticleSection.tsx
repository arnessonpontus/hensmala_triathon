import { Entry } from "contentful";
import { useEffect, useState } from "react";

import { Col } from "reactstrap";
import { TypeArticleSkeleton } from "../../../../generated/type";
import { getAssetUrl } from "../../../utils";

interface ArticleSectionProps {
  article: Entry<TypeArticleSkeleton, undefined, string>
}
export const ArticleSection = (props: ArticleSectionProps) => {
  const [randNums, setRandNums] = useState<number[]>([]);
  useEffect(() => {
    setRandNums(Array.from({length: 5}, () => Math.floor(Math.random() * 6 + 1)));
  }, [])

    return (
      <Col className="mt-4" md="6">
        <a
          style={{ textDecoration: "none" }}
          target="_blank"
          rel="noopener noreferrer"
          href={getAssetUrl(props.article.fields.articleFile)}
        >
          <div className="card-box-hoverable" style={{ height: 350 }}>
            <div className="article-placeholder">
              {randNums.map(rnd => <div key={rnd} style={{width: rnd + "0%"}} className="article-placeholder-row"/>)}
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
                {props.article.fields.title}
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
