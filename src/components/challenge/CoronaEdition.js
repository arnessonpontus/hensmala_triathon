import React, { useEffect, useState } from "react";

import { NavLink } from "reactstrap";
import UploadModal from "./UploadModal";
import * as firebase from "firebase";
import EntryCard from "./EntryCard";
import { NavLink as RRNavLink } from "react-router-dom";

const Challenge = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const entries = [1, 2, 3, 4, 5, 6, 7];

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
        <div className="button-style">
          <span>Om årets lopp</span>
          <i className="fas fa-lightbulb icon-style"></i>
        </div>
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

        <div className="button-style upload-button">
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
          justifyContent: "space-around",
        }}
      >
        {entries.map((entry) => {
          return <EntryCard id={entry} />;
        })}
      </div>
    </div>
  );
};

export default Challenge;
