import React, { useEffect, useRef, useState } from "react";

import UploadModal from "./UploadModal";
import { NavLink as RRNavLink } from "react-router-dom";
import About2021 from "./About2021";
import EntryModal from "./EntryModal";
import * as firebase from "firebase";
import Spinner from "../../../node_modules/reactstrap/es/Spinner";

const CoronaEdition = () => {
  const [userEntries, setUserEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);

  const [hasUpdated, setHasUpdated] = useState(false);

  const placements = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setUserEntries([]);
    setLoadingEntries(true);

    firebase
      .database()
      .ref("entries")
      .orderByChild("time")
      .once("value", (snapshot) => {
        snapshot.forEach((child) => {
          const childWithUid = { ...child.val(), uid: child.key };
          placements.current.push(childWithUid.raceTime);
          setUserEntries((userEntries) => [...userEntries, childWithUid]);
        });
      })
      .then(() => {
        placements.current.sort((a, b) => a - b);
        setLoadingEntries(false);
      });
  }, [hasUpdated]);

  const testEntries = [
    {
      name: "Exempel Exempelsson",
      raceTime: 5243,
      uploadTime: "2021-04-02 08.32",
      imgs: ["/images/fortrampet_bike.jpg"],
      text: "Detta är ett exempel på hur det kommer se ut när deltagare kommer lägga upp. Det går som sagt att dölja sin tid och placering så att det inte syns på hemsidan.",
      hideResults: false,
    },
    {
      name: "Exempel Exempelsson",
      raceTime: 3243,
      uploadTime: "2021-02-02 08.32",
      imgs: ["/images/news/barn-badmossa.jpg"],
      text: "Ett till exempel med mindre lite text.",
      hideResults: false,
    },
    {
      name: "Exempel Exempelsson",
      raceTime: 1943,
      uploadTime: "2021-02-02 08.32",
      imgs: ["/images/barn_lopning.png"],
      text: "",
      hideResults: false,
    },
    {
      name: "Exempel Exempelsson",
      raceTime: 6243,
      uploadTime: "2021-02-02 08.32",
      imgs: ["/images/eva_kronobergare.jpg"],
      text: "Bra runda",
      hideResults: false,
    },
    {
      name: "Exempel Exempelsson",
      raceTime: 3243,
      uploadTime: "2021-02-02 09.32",
      imgs: ["/images/simning.jpg"],
      text: "Detta är ett exempel på hur det kommer se ut när deltagare kommer lägga upp. Det går som sagt att dölja sin tid och placering så att det inte syns på hemsidan.",
      hideResults: true,
    },
  ];

  const testPlacements = useRef(
    [5243, 3243, 1943, 6243, 3243].sort((a, b) => a - b)
  );

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

        <UploadModal setHasUpdated={setHasUpdated} />
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
        {loadingEntries ? (
          <Spinner
            style={{ width: "3rem", height: "3rem", marginTop: 10 }}
            type="grow"
          />
        ) : userEntries.length > 0 ? (
          userEntries.map((entry, i) => {
            entry.placement = placements.current.indexOf(entry.raceTime) + 1;
            return <EntryModal key={i} id={i + 1} entry={entry} />;
          })
        ) : (
          testEntries.map((entry, i) => {
            entry.placement =
              testPlacements.current.indexOf(entry.raceTime) + 1;
            return <EntryModal key={i} id={i + 1} entry={entry} />;
          })
        )}
      </div>
    </div>
  );
};

export default CoronaEdition;
