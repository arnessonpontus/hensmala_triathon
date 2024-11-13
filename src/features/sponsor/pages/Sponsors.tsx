import { Container } from "reactstrap";
import { SponsorSection } from "../components/SponsorSection";
import { useSponsorContent } from "../components/hooks/useSponsorContent";

export const Sponsors = () => {
  const entries = useSponsorContent();

  // Gold sponsor - more than 5k, silver - more than 2k
  return (
    <Container className="min-vh-100">
      <div className="spons-container" style={{ paddingTop: "20px" }}>
        {entries.filter(item => item.fields.level === "GOLD").map((sponsor) => {
          return <SponsorSection sponsor={sponsor}/>;
        })}
      </div>
      <div className="spons-container">
        {entries.filter(item => item.fields.level === "SILVER").map((sponsor) => {
          return <SponsorSection sponsor={sponsor}/>;
        })}
      </div>
      <div className="spons-container">
        {entries.filter(item => item.fields.level === "BRONZE").map((sponsor) => {
          return <SponsorSection sponsor={sponsor}/>;
        })}
      </div>
    </Container>
  );
}
