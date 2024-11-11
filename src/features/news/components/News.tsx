import React, { useEffect, useRef, useState } from "react";
import { Button, Col, Spinner } from "reactstrap";
import { useContentfulClient } from "../../../hooks/useContentfulClient";
import { Entry } from "contentful";
import OneNews from "./OneNews";
import { TypeNewsEntrySkeleton } from "../../../../generated/type";
import { styled } from "styled-components";

const FlexView = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const News = () => {
  const chunkSize = useRef(6);
  const [entries, setEntries] = useState<Entry<TypeNewsEntrySkeleton, undefined, string>[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalNumNews, setTotalNumNews] = useState(0);

  const client = useContentfulClient();

  const fetchEntries = async (): Promise<void> => {
    setLoading(true)
    client
      .getEntries<TypeNewsEntrySkeleton>({
        content_type: "newsEntry",
        order: ["-fields.publishedTime"],
        limit: chunkSize.current,
        skip: entries.length,
      })
      .then((res) => {
        setTotalNumNews(res.total)
        setEntries((prevEntries) => [...prevEntries, ...res.items])
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchEntries();
  }, [])

  return (
    <Col className="s mt-5">
      <h2>Nyheter</h2>
      {!entries && <p>Inga nyheter</p>}
      <FlexView>
        {entries.map((e, i) => {
          return (
            <OneNews key={i} news={e} />
          )
        })}
      </FlexView>

      <div className="d-flex flex-column align-items-center">
        {loading && <Spinner size="sm" />}

        <p>Visar {entries.length} av {totalNumNews}</p>
        {entries.length <= totalNumNews - 1 &&
          <Button className="mt-2" onClick={() => fetchEntries()}>Ladda {Math.min(chunkSize.current, totalNumNews - entries.length)} till</Button>
        }
      </div>
    </Col>
  );
}

export default News;
