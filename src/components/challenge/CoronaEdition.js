import React, { useEffect, useState } from "react";

import UploadModal from "./UploadModal";
import * as firebase from "firebase";
import { NavLink as RRNavLink } from "react-router-dom";
import About2021 from "./About2021";
import EntryModal from "./EntryModal";

const Challenge = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const entries = [
    "/images/fortrampet_bike.jpg",
    "/images/news/barn-badmossa.jpg",
    "/images/barn_lopning.png",
    "/images/eva_kronobergare.jpg",
    "/images/simning.jpg",
  ];

  const exampleTexts = [
    "Detta är ett exempel på hur det kommer se ut när deltagare kommer lägga upp. Det går som sagt att dölja sin tid och placering så att det inte syns på hemsidan.",
    "Ett till exempel med mindre lite text.",
    "",
    "Bra runda",
    "Detta är ett exempel på hur det kommer se ut när deltagare kommer lägga upp. Det går som sagt att dölja sin tid och placering så att det inte syns på hemsidan.",
  ];

  return (
    <div style={{ padding: "0px 20px 0px 20px" }}>
      <h1
        style={{
          fontSize: "calc(2em + 3vw)",
          fontWeight: "bold",
          marginTop: "20px",
          marginBottom: "-10px",
        }}
      >
        Hensmåla Triathlon 2021
      </h1>
      <h1
        style={{
          fontSize: "calc(2em + 2vw)",
          fontStyle: "italic",
        }}
      >
        Corona Edition
      </h1>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          marginTop: 20,
        }}
      >
        <About2021 />

        <RRNavLink
          className="button-style"
          style={{
            textDecoration: "none",
            backgroundColor: "#11999E",
            color: "white",
          }}
          to="/anmalan"
        >
          <span>Anmälan</span>
        </RRNavLink>

        <div
          onClick={() => alert("Uppladdning inte tillåten ännu.")}
          className="button-style upload-button"
        >
          <span>Ladda upp bidrag</span>
          <i className="fas fa-upload icon-style"></i>
        </div>
      </div>

      <div
        style={{
          marginLeft: "auto",
          marginRight: "auto",
          maxWidth: 3 * (350 + 20),
          minHeight: "70vh",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {entries.map((img, i) => {
          return (
            <EntryModal
              id={i + 1}
              image={img}
              participantText={exampleTexts[i]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Challenge;
