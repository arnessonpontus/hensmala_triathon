import sponsors from "../../../assets/sponsors.json";
import { SponsorSection } from "./SponsorSection";

export const SponsorHighlight = () => {
  return (
    <div className="sponsor-content">
      {sponsors.gold.map((sponsor) => {
        return <SponsorSection sponsor={sponsor} sponsType="brons" />;
      })}
    </div>
  )
}
