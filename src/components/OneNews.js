import React from "react";
import { Col } from "reactstrap";

const OneNews = (props) => {
  return (
    <div
      key={props.news.date}
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
        boxShadow: "0px 2px 2px 2px #e3e3e3",
      }}
    >
      <Col style={{ pointerEvents: "none" }}>
        <h3>{props.news.title}</h3>
        <p>{props.news.text}</p>

        <i style={{ justifySelf: "flex-end" }}>{props.news.date}</i>
      </Col>
      <Col
        style={{
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          style={{
            minWidth: 200,
            margin: "1em auto",
            maxHeight: 200,
            objectFit: "contain",
          }}
          width="100%"
          src={props.news.image}
          alt={props.news.image}
        ></img>
      </Col>
    </div>
  );
};

export default OneNews;
