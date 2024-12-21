import { Fragment, useEffect, useRef, useState } from "react";
import About2021 from "../components/About2021";
import EntryModal, { Entry } from "../components/EntryModal";
import firebase from "firebase/compat/app"
import "firebase/compat/storage"
import "firebase/compat/database"
import { Spinner } from "reactstrap";
import {
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
} from "reactstrap";
import styled from "styled-components";

export const StyledDropdownToggle = styled(DropdownToggle)`
  outline: none;
  border: none;
  background-color: transparent;
  
  &:focus {
    outline: 3px solid rgba(50, 150, 250, 0.8);
  }

`;

const CoronaEdition = () => {
  const [userEntries, setUserEntries] = useState<Entry[]>([]);
  const [hiddenUserEntries, setHiddenUserEntries] = useState<Entry[]>([]);
  const [loadingEntries, setLoadingEntries] = useState(false);
  const [orderBy, setOrderBy] = useState("time");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const placements = useRef<number[]>([]);

  useEffect(() => {
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
  }, [orderBy]);

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
        HENSMÅLA TRIATHLON 2021
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
        <StyledDropdownToggle tag="button" caret>
          Sortera efter {orderBy === "time" ? "nyast" : "placering"}
        </StyledDropdownToggle>
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
    </div>
  );
};

export default CoronaEdition;
