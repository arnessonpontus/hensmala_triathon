import React, {useRef, useEffect} from "react";
import sponsors from "../../assets/sponsors";
import SponsorSection from "./SponsorSection";

const SponsorHighlight = () => {
    return (
        <div className="sponsor-content">
        {sponsors.gold.map((sponsor) => {
             return <SponsorSection sponsor={sponsor} sponsType="brons spons-item" />;
            })}
        </div>
    )
}


export default SponsorHighlight;