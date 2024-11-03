import React, { useRef } from "react";
import { Button } from "reactstrap";
import { Col } from "reactstrap";
import newsArc from "../../../assets/news.json";
import OneNews from "./OneNews";
import { UseNewsTracker } from "../../../hooks/UseNewsTracker";

const News = () => {
    const chunkSize = useRef(6)
    const [newsCount, setNewsCount] = UseNewsTracker(chunkSize.current);

    return (
      <Col className="s mt-5">
        <h2>Nyheter</h2>
        {newsArc.slice(0, newsCount).map((news, i) => {
          return <OneNews key={i} news={news} />;
        })}
        <div className="d-flex flex-column align-items-center">
        Visar {Math.min(newsCount, newsArc.length)} av {newsArc.length}
        {newsCount <= newsArc.length &&
          <Button className="mt-2" onClick={() => setNewsCount(newsCount + chunkSize.current)}>Ladda {Math.min(chunkSize.current, newsArc.length - newsCount)} till</Button>
        }
        </div>
      </Col>
    );
}

export default News;
