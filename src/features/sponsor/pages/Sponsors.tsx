import React, { useEffect } from "react";

import sponsors from "../../../assets/sponsors.json";

import { Container } from "reactstrap";
import { SponsorSection } from "../components/SponsorSection";

export const Sponsors = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  // Gold sponsor - more than 5k, silver - more than 2k
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
