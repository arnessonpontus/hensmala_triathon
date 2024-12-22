import { Container } from "reactstrap";
import { SponsorSection } from "../components/SponsorSection";
import { useSponsorContent } from "../components/hooks/useSponsorContent";
import { DEFAULT_CONTACT_EMAIL } from "../../../Constants";

export const Sponsors = () => {
  const entries = useSponsorContent();

  // Gold sponsor - more than 5k, silver - more than 2k
  return (
    <Container>
      <h1 className="m-4">Våra sponsorer för 2024</h1>
      <p className="text-center">Vill du eller ditt företag också vara med och sponsra? Hör av er till {DEFAULT_CONTACT_EMAIL}</p>
      <div className="spons-container">
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
