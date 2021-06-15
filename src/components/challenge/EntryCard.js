import React from "react";
import { secToHMS } from "../TimeUtils";

const EntryCard = (props) => {
  const styles = {
    cardStyle: {
      width: 350,
      height: 300,
      padding: "10px",
      display: "inline",
      marginLeft: 10,
      marginRight: 10,
    },
    imgStyle: {
      width: "100%",
      height: 150,
      objectFit: "contain",
    },
    imgBackgroundStyle: {
      width: "100%",
      backgroundColor: "gray",
      height: 150,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    userTextBoxStyle: {
      width: "70%",
      maxHeight: 80,
      wordWrap: "break-word",
      textOverflow: "ellipsis",
      overflow: "hidden",
      display: "-webkit-box",
      WebkitLineClamp: 3,
      WebkitBoxOrient: "vertical",
    },
    timeStyle: {
      position: "absolute",
      bottom: 10,
      left: 10,
      fontWeight: "bold",
    },
    dateStyle: {
      position: "absolute",
      bottom: 10,
      right: 10,
      fontWeight: "lighter",
    },
    medalStyle: {
      borderRadius: "50%",
      boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
      width: 40,
      height: 40,
      backgroundColor:
        props.entry.placement === 1
          ? "#E6CF5C"
          : props.entry.placement === 2
          ? "#C0C0C0"
          : props.entry.placement === 3
          ? "#B98555"
          : "#ddeaeb",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontSize: 18,
    },
  };
  return (
    <div
      className="card-box-hoverable"
      style={styles.cardStyle}
      onClick={props.onClick}
    >
      <div style={styles.imgBackgroundStyle}>
        <img
          style={styles.imgStyle}
          src={props.entry.imgs[0]}
          alt="deltagarbild"
        ></img>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 5,
        }}
      >
        <div style={styles.userTextBoxStyle}>
          <h6 style={{ fontWeight: "bold" }}>{props.entry.name}</h6>
          <p style={{ fontSize: 12 }}>{props.entry.text}</p>
        </div>
        <div style={styles.medalStyle}>
          {props.entry.hideResults ? "?" : props.entry.placement}
        </div>
      </div>
      <span style={styles.timeStyle}>
        {props.entry.hideResults ? "*****" : secToHMS(props.entry.raceTime)}
      </span>
      <span style={styles.dateStyle}>{props.entry.uploadTime}</span>
    </div>
  );
};

export default EntryCard;
