import ClipLoader from "react-spinners/ClipLoader";

import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import { useContentfulClient } from "../../../hooks/useContentfulClient";
import { TypeVideoSkeleton } from "../../../../generated/type";
import { Entry } from "contentful";

export const Videos = () => {
  const [entries, setEntries] = useState<Entry<TypeVideoSkeleton, undefined, string>[]>([]);
  const client = useContentfulClient();

  const fetchEntries = async (): Promise<void> => {
    client
      .getEntries<TypeVideoSkeleton>({
        content_type: "video",
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
          {entries.map((video) => {
            return (
              <Col className="mt-4" md="6">
                <div className="card-box">
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <ClipLoader
                      className="spinner"
                      size={50}
                      color={"black"}
                    />
                  </div>

                  <h5 style={{height: "2.2em"}}>{video.fields.title}</h5>
                  <div className="embed-responsive embed-responsive-16by9">
                   <iframe src={video.fields.videoLink} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
