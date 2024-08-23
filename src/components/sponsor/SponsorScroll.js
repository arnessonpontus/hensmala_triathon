import React from "react";
import sponsors from "../../assets/sponsors";
import SponsorSection from "./SponsorSection";

const SponsorScroll = () => {

    const allSponsors = sponsors.gold.concat(sponsors.silver, sponsors.brons)

    return (
        <div className="scroll-container">
            <div className="scroll-content">
            {allSponsors.map((sponsor) => {
                 return <SponsorSection sponsor={sponsor} sponsType="brons" />;
                })}
            </div>
        </div>
    )
}


export default SponsorScroll;