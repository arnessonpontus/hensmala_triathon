import { Container, Row, Col } from "reactstrap";
import { useContentfulClient } from "../../../hooks/useContentfulClient";
import { useEffect, useState } from "react";
import { TypeRadioShowSkeleton } from "../../../../generated/type";
import { Entry } from "contentful";
import { getAssetUrl } from "../../../utils";

export const Radio = () => {
  const [entries, setEntries] = useState<Entry<TypeRadioShowSkeleton, undefined, string>[]>([]);
  const client = useContentfulClient();

  const fetchEntries = async (): Promise<void> => {
    client
      .getEntries<TypeRadioShowSkeleton>({
        content_type: "radioShow",
        order: ["-sys.createdAt"],
      })
      .then((res) => {
        setEntries(res.items)
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchEntries();
  }, [])
  return (
    <Container className="pb-4 min-vh-100">
      <Row>
        {entries.map((radioShow) => {
          return (
            <Col className="mt-4" md="6">
              <div
                className="card-box"
                style={{
                  minHeight: 500,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <img
                    alt={radioShow.fields.title}
                    width="100%"
                    height="200px"
                    style={{ objectFit: "cover", marginBottom: "10px" }}
                    src={getAssetUrl(radioShow.fields.thumbnail) ?? "images/radio_2.jpg"}
                  ></img>
                  <div>
                    <h4>{radioShow.fields.title}</h4>

                    <p>{radioShow.fields.text}</p>
                  </div>
                </div>

                <audio controls src={getAssetUrl(radioShow.fields.radioFile)}>
                  Din webläsare stödjer ej ljudelementet
                </audio>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

