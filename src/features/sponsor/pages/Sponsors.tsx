import { Container } from "reactstrap";
import { SponsorSection } from "../components/SponsorSection";
import { useSponsorContent } from "../components/hooks/useSponsorContent";
import { DEFAULT_CONTACT_EMAIL } from "../../../Constants";
import Chip from "../../../components/Chip";
import styled from "styled-components";

const ChipContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
`;

export const Sponsors = () => {
  const { currentYearEntries, prevYearEntires, latestYear } = useSponsorContent();

  return (
    <Container>
      <h1 className="m-4">Våra sponsorer för {latestYear}</h1>
      <p className="text-center">Vill du eller ditt företag också vara med och sponsra? Hör av er till {DEFAULT_CONTACT_EMAIL}</p>
      <div className="spons-container">
        {currentYearEntries.filter(item => item.fields.level === "GOLD").map((sponsor) => {
          return <SponsorSection sponsor={sponsor} />;
        })}
      </div>
      <div className="spons-container">
        {currentYearEntries.filter(item => item.fields.level === "SILVER").map((sponsor) => {
          return <SponsorSection sponsor={sponsor} />;
        })}
      </div>
      <div className="spons-container">
        {currentYearEntries.filter(item => item.fields.level === "BRONZE").map((sponsor) => {
          return <SponsorSection sponsor={sponsor} />;
        })}
      </div>
      {prevYearEntires.length > 0 &&
        <>
          <h3>Sponsorer för {latestYear - 1}</h3>
          <ChipContainer>
            {prevYearEntires.map(e => <Chip variant="outlined" label={e.fields.title ?? ""} />)}
          </ChipContainer>
        </>
      }
    </Container>
  );
}
