import React, { useEffect, useRef, useState } from "react";
import { Button } from "reactstrap";
import { Col } from "reactstrap";
import newsArc from "../../../assets/news.json";
import OneNews from "./OneNews";
import UseNewsTracker from "../../hooks/UseNewsTracker";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { useContentfulClient } from "../../hooks/useContentfulClient";

let options = {
  renderNode: {
    'embedded-asset-block': (node) =>
      <img width={150} height={510} alt="en bild" className="img-fluid" src={node.data.target.fields.file.url}/>
  }
}

const News = () => {
    const chunkSize = useRef(6)
    const [newsCount, setNewsCount] = UseNewsTracker(chunkSize.current);
    const [entries, setEntries] = useState([])
    const [loading, setLoading] = useState(false)

    const client = useContentfulClient();

    useEffect(() => {
      setLoading(true)
        client
        .getEntries()
        .then((entries) => setEntries(entries))
        .catch((err) => console.log(err))
        .finally(() => setLoading(false))
    }, [])
    console.log(entries)

    if (loading) return <>Laddar nyheter...</>
    if (!entries.items) return <>Inga nyheter</>

    return (
      <Col className="s mt-5">
        <h2>Nyheter</h2>
        {entries.items.map((e) => {
          return (
            <>
              <h2>{e.fields.title}</h2>
              {documentToReactComponents(e.fields.description, options)}
            </>
          )
        })}
        {/* {newsArc.slice(0, newsCount).map((news, i) => {
          return <OneNews key={i} news={news} />;
        })}
        <div className="d-flex flex-column align-items-center">
        Visar {Math.min(newsCount, newsArc.length)} av {newsArc.length}
        {newsCount <= newsArc.length &&
          <Button className="mt-2" onClick={() => setNewsCount(newsCount + chunkSize.current)}>Ladda {Math.min(chunkSize.current, newsArc.length - newsCount)} till</Button>
        }
        </div> */}
      </Col>
    );
}

export default News;
