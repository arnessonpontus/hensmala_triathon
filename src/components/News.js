import React, { Component } from "react";
import { Col, Card, CardBody, CardText } from "reactstrap";
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
                    borderColor: "black",
                    borderStyle: "solid",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap"
                  }}
                >
                  <Col>
                    <h3>{news.title}</h3>
                    <p>{news.text}</p>
                    {Date(Date.now().toString()).substring(0, 25)}
                    <i style={{ justifySelf: "flex-end" }}></i>
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
