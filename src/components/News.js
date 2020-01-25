import React, { Component } from "react";
import { Col, Card, CardBody } from "reactstrap";
import newsArc from "../assets/news";

class News extends Component {
  render() {
    return (
      <Col className="s mt-5">
        <Card>
          <CardBody>
            <h2>Nyheter</h2>
            {newsArc.map(news => {
              return (
                <div
                  style={{
                    padding: 20,
                    minHeight: 200,
                    marginTop: 20,
                    borderRadius: 5,
                    borderWidth: 1,
                    borderColor: "#d9d7d7",
                    borderStyle: "solid",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    boxShadow: "0px 0px 3px 3px #c4c4c4"
                  }}
                >
                  <Col>
                    <h3>{news.title}</h3>
                    <p>{news.text}</p>

                    <i style={{ justifySelf: "flex-end" }}>{news.date}</i>
                  </Col>
                  <Col
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <img
                      style={{
                        minWidth: 200,
                        margin: "1em auto",
                        maxHeight: 200,
                        objectFit: "contain"
                      }}
                      width="100%"
                      src={news.image}
                      alt={news.image}
                    ></img>
                  </Col>
                </div>
              );
            })}
          </CardBody>
        </Card>
      </Col>
    );
  }
}

export default News;
