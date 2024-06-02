import React, { useRef, useState } from "react";
import { Button } from "reactstrap";
import { Col } from "reactstrap";
import newsArc from "../../assets/news";
import OneNews from "./OneNews";


const News = (props) => {
    const chunkSize = useRef(6)
    const [currentOffset, setCurrentOffset] = useState(chunkSize.current);

    return (
      <Col className="s mt-5">
        <h2>Nyheter</h2>
        {newsArc.slice(0, currentOffset).map((news, i) => {
          return <OneNews key={i} news={news} />;
        })}
        <div className="d-flex flex-column align-items-center">
        Visar {Math.min(currentOffset, newsArc.length)} av {newsArc.length}
        {currentOffset <= newsArc.length &&
          <Button className="mt-2" onClick={() => setCurrentOffset(currentOffset + chunkSize.current)}>Ladda {Math.min(chunkSize.current, newsArc.length - currentOffset)} till</Button>
        }
        </div>
      </Col>
    );
}

export default News;
