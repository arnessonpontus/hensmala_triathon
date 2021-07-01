import React, { Fragment, useEffect, useRef, useState } from "react";

import UploadModal from "./UploadModal";
import { NavLink as RRNavLink } from "react-router-dom";
import About2021 from "./About2021";
import EntryModal from "./EntryModal";
import * as firebase from "firebase";
import { Alert, Spinner } from "reactstrap";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";

const CoronaEdition = () => {
  const [userEntries, setUserEntries] = useState([]);
  const [hiddenUserEntries, setHiddenUserEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [orderBy, setOrderBy] = useState("time");
  const [hasUpdated, setHasUpdated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const dismissSnackbar = () => setSnackbarVisible(false);

  const hasUploaded = () => {
    setHasUpdated(true);
    setSnackbarVisible(true);
    setTimeout(() => dismissSnackbar(), 7000);
  };

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const placements = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    setUserEntries([]);
    setHiddenUserEntries([]);
    setLoadingEntries(true);
    placements.current = [];

    firebase
      .database()
      .ref("entries")
      .orderByChild(orderBy)
      .once("value", (snapshot) => {
        snapshot.forEach((child) => {
          const childWithUid = { ...child.val(), uid: child.key };

          if (!childWithUid.hideResults) {
            placements.current.push(childWithUid.raceTime);
          }

          if (orderBy === "time") {
            setUserEntries((userEntries) => [...userEntries, childWithUid]);
          } else {
            if (!childWithUid.hideResults) {
              setUserEntries((userEntries) => [...userEntries, childWithUid]);
            } else {
              setHiddenUserEntries((hiddenUserEntries) => [
                ...hiddenUserEntries,
                childWithUid,
              ]);
            }
          }
        });
      })
      .then(() => {
        placements.current.sort((a, b) => a - b);

        setLoadingEntries(false);
      });
  }, [hasUpdated, orderBy]);

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

        <UploadModal hasUploaded={hasUploaded} />
      </div>
      <UncontrolledDropdown
        isOpen={dropdownOpen}
        toggle={toggle}
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <DropdownToggle tag="div" caret className="sorting-toggle">
          Sortera efter
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem
            onClick={() => setOrderBy("time")}
            active={orderBy === "time"}
          >
            Nyast
          </DropdownItem>
          <DropdownItem
            onClick={() => setOrderBy("raceTime")}
            active={orderBy === "raceTime"}
          >
            Placering
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
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
        ) : orderBy === "time" ? (
          userEntries
            .slice(0)
            .reverse()
            .map((entry, i) => {
              entry.placement = placements.current.indexOf(entry.raceTime) + 1;
              return <EntryModal key={i} id={i + 1} entry={entry} />;
            })
        ) : (
          <Fragment>
            {userEntries.map((entry, i) => {
              entry.placement = placements.current.indexOf(entry.raceTime) + 1;
              return <EntryModal key={i} id={i + 1} entry={entry} />;
            })}

            {hiddenUserEntries.map((entry, i) => {
              entry.placement = placements.current.indexOf(entry.raceTime) + 1;
              return <EntryModal key={i} id={i + 1} entry={entry} />;
            })}
          </Fragment>
        )}
      </div>
      <Alert
        color="success"
        isOpen={snackbarVisible}
        toggle={dismissSnackbar}
        style={{
          position: "fixed",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          minWidth: "40%",
          textAlign: "center",
        }}
      >
        Ditt bidrag har laddats up!{" "}
        <span aria-label="party" role="img">
          🎉
        </span>{" "}
        <p>Maila hensmala.triathlon@gmail.com om något behöver ändras.</p>
      </Alert>
    </div>
  );
};

export default CoronaEdition;
