import React, { Component } from "react";
import SponsorSection from "./SponsorSection";

import sponsors from "../assets/sponsors";

import { Container, Row } from "reactstrap";

class Sponsors extends Component {
  render() {
    return (
      <Container>
        <div className="spons-container">
          {sponsors.gold.map(sponsor => {
            return <SponsorSection sponsor={sponsor} sponsType="gold" />;
          })}
        </div>
        <div className="spons-container">
          {sponsors.silver.map(sponsor => {
            return <SponsorSection sponsor={sponsor} sponsType="silver" />;
          })}
        </div>
        <div className="spons-container">
          {sponsors.brons.map(sponsor => {
            return <SponsorSection sponsor={sponsor} sponsType="brons" />;
          })}
        </div>
      </Container>
    );
  }
}

export default Sponsors;
