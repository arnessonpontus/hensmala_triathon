import React from "react";
import radioShows from "../../assets/radioShows.json";

import { Container, Row, Col } from "reactstrap";

export const Radio = () => {
  return (
    <Container className="pb-4">
      <Row>
        {radioShows.map((radioShow) => {
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
                    alt={radioShow.title}
                    width="100%"
                    height="200px"
                    style={{ objectFit: "cover", marginBottom: "10px" }}
                    src={radioShow.image}
                  ></img>
                  <div>
                    <h4>{radioShow.title}</h4>

                    <p>{radioShow.text}</p>
                  </div>
                </div>

                <audio controls src={radioShow.radioSrc}>
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

