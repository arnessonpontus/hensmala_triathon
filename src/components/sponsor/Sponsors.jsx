import React, { Component } from "react";
import SponsorSection from "./SponsorSection";

import sponsors from "../../assets/sponsors";

import { Container } from "reactstrap";

class Sponsors extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  // Gold sponsor - more than 5k, silver - more than 2k

  render() {
    return (
      <Container>
        <div className="spons-container" style={{ paddingTop: "20px" }}>
          {sponsors.gold.map((sponsor) => {
            return <SponsorSection sponsor={sponsor} sponsType="gold" />;
          })}
        </div>
        <div className="spons-container">
          {sponsors.silver.map((sponsor) => {
            return <SponsorSection sponsor={sponsor} sponsType="silver" />;
          })}
        </div>
        <div className="spons-container">
          {sponsors.brons.map((sponsor) => {
            return <SponsorSection sponsor={sponsor} sponsType="brons" />;
          })}
        </div>
      </Container>
    );
  }
}

export default Sponsors;
