import { useSponsorContent } from "./hooks/useSponsorContent";
import { SponsorSection } from "./SponsorSection";

export const SponsorHighlight = () => {
  const {currentYearEntries} = useSponsorContent();

  return (
    <div className="sponsor-content">
      {currentYearEntries.filter(item => item.fields.level === "GOLD").map((sponsor) => {
        return <SponsorSection key={sponsor.sys.id} sponsor={sponsor}/>;
      })}
    </div>
  )
}
