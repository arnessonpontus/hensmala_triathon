import React from "react";

const EntryCard = (props) => {
  return (
    <div className="card-box-hoverable" style={styles.cardStyle}>
      <div style={styles.imgBackgroundStyle}>
        <img
          style={styles.imgStyle}
          src="/images/fortrampet_bike.jpg"
          alt="HT_banner"
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
          <h6 style={{ fontWeight: "bold" }}>Förnamn Efternamn</h6>
          <p style={{ fontSize: 12 }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <div
          style={{
            borderRadius: "50%",
            boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
            width: 40,
            height: 40,
            backgroundColor:
              props.id == 1
                ? "#E6CF5C"
                : props.id == 2
                ? "#C0C0C0"
                : props.id == 3
                ? "#B98555"
                : "#ddeaeb",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {props.id}
        </div>
      </div>
      <span style={styles.timeStyle}>1h 23m 56s</span>
      <span style={styles.dateStyle}>2021-07-12</span>
    </div>
  );
};

const styles = {
  cardStyle: {
    width: 350,
    height: 300,
    padding: "10px",
    display: "inline",
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
  },
  userTextBoxStyle: {
    width: "70%",
    maxHeight: 100,
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
};

export default EntryCard;
