import React, { Fragment, useState } from "react";
import { Modal } from "reactstrap";
import { secToHMS } from "../TimeUtils";
import ChallengeCarousell from "./ChallengeCarousell";
import EntryCard from "./EntryCard";

const ChallengeModal = (props) => {
  const [modal, setModal] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  const styles = {
    imgStyle: {
      height: 350,
      width: "100%",
      objectFit: "contain",
      position: "relative",
      zIndex: 1,
      boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
    },
    imgBackgroundStyle: {
      width: "100%",
      height: 350,
      position: "absolute",
      top: 0,
      backgroundImage: `url(${props.entry.imgs[activeIndex]})`,
      filter: "blur(50px)",
    },
    userTextBoxStyle: {
      width: "70%",
    },
    timeStyle: {
      position: "absolute",
      bottom: -10,
      left: 0,
      fontWeight: "bold",
    },
    dateStyle: {
      position: "absolute",
      bottom: -10,
      right: 0,
    },
    exampleText: {
      color: "white",
      fontWeight: "bold",
    },
    closeButtonstyle: {
      position: "absolute",
      top: 0,
      right: 0,
      backgroundColor: "#11999E",
      width: 30,
      height: 30,
      borderRadius: "50%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      color: "white",
      zIndex: 2,
      cursor: "pointer",
      boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
    },
    medalStyle: {
      borderRadius: "50%",
      boxShadow: "0px 4px 8px rgba(38, 38, 38, 0.2)",
      width: 60,
      height: 60,
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
      fontSize: 24,
      zIndex: 1,
    },
  };

  return (
    <Fragment>
      <EntryCard
        onClick={toggleModal}
        id={props.id}
        entry={props.entry}
      ></EntryCard>
      <Modal
        className="card-box"
        isOpen={modal}
        toggle={toggleModal}
        style={{
          minWidth: "80vw",
          padding: 15,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <div style={styles.closeButtonstyle} onClick={toggleModal}>
          X
        </div>
        <div style={{ minHeight: "85vh" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {props.entry.imgs.length > 1 ? (
              <div>
                <ChallengeCarousell
                  imgs={props.entry.imgs}
                  activeIndex={activeIndex}
                  setActiveIndex={setActiveIndex}
                  animating={animating}
                  setAnimating={setAnimating}
                />
              </div>
            ) : (
              <Fragment>
                <div style={styles.imgBackgroundStyle}></div>

                <a
                  href={props.entry.imgs[0]}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ overflow: "hidden" }}
                >
                  <img
                    style={styles.imgStyle}
                    src={props.entry.imgs[0]}
                    alt="deltagarbild"
                  ></img>
                </a>
              </Fragment>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 10,
            }}
          >
            <div style={styles.userTextBoxStyle}>
              <h4 style={{ fontWeight: "bold" }}>{props.entry.name}</h4>
              <p style={{ fontSize: 16 }}>{props.entry.text}</p>
            </div>
            <div style={styles.medalStyle}>
              {props.entry.hideResults ? "?" : props.entry.placement}
            </div>
          </div>
          <span style={styles.timeStyle}>
            {" "}
            {props.entry.hideResults ? (
              <i>Tid dold</i>
            ) : (
              secToHMS(props.entry.raceTime)
            )}
          </span>
          <i style={styles.dateStyle}>{props.entry.uploadTime}</i>
        </div>
      </Modal>
    </Fragment>
  );
};

export default ChallengeModal;
