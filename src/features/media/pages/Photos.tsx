import { useEffect, useState } from "react";

import { Container, Row, Col } from "reactstrap";
import { useContentfulClient } from "../../../hooks/useContentfulClient";
import { TypeImageCollectionSkeleton } from "../../../../generated/type";
import { Entry } from "contentful";

export const Photos = () => {
  const [entries, setEntries] = useState<Entry<TypeImageCollectionSkeleton, undefined, string>[]>([]);
  const client = useContentfulClient();

  const fetchEntries = async (): Promise<void> => {
    client
      .getEntries<TypeImageCollectionSkeleton>({
        content_type: "imageCollection",
        order: ["-sys.createdAt"],
      })
      .then((res) => {
        setEntries(res.items);
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchEntries();
  }, [])

  return (
    <Container className="pb-4">
      <Row>
        {entries.map((album) => {
          return (
            <Col className="mt-4" md="6">
              <a
                data-flickr-embed="true"
                target="_blank"
                rel="noopener noreferrer"
                href={album.fields.albumLink}
                title={album.fields.title}
                style={{
                  color: "black",
                  textDecoration: "none",
                }}
              >
                <div className="card-box-hoverable" style={{ height: 350 }}>
                  <img
                    src={album.fields.thumbnailUrl}
                    style={{ objectFit: "cover" }}
                    width="100%"
                    height="80%"
                    alt={album.fields.title}
                  ></img>
                  <h5 className="mt-2" style={{ fontWeight: "bold" }}>
                    {album.fields.title}
                  </h5>
                </div>
              </a>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Photos;
