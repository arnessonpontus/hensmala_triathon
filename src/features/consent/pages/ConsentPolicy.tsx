import styled from 'styled-components';
import { DEFAULT_CONTACT_EMAIL } from '../../../Constants';

const PrivacyPolicyContainer = styled.div`
  padding: 20px;
  background-color: #f8f9fa;
  max-width: 800px;
  margin: 20px auto;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  color: #343a40;
`;

const Section = styled.div`
  margin-bottom: 20px;
  list-style: inside;
`;

const SectionTitle = styled.h3`
  color: #343a40;
  margin-bottom: 10px;
`;

const Paragraph = styled.p`
  margin: 10px 0;
  line-height: 1.5;
`;

const ContactInfo = styled.p`
  font-weight: bold;
  color: #343a40;
`;

export const PrivacyPolicy = () => {
  return (
    <PrivacyPolicyContainer>
      <Title>Integritetspolicy för Hensmåla Trialthlon</Title>

      <Section>
        <SectionTitle>1. Introduktion</SectionTitle>
        <Paragraph>
          Hensmåla Triathlon respekterar din integritet och är engagerade i att skydda dina personuppgifter. Denna integritetspolicy förklarar hur vi samlar in, använder, delar och skyddar din information när du besöker vår webbplats.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>2. Information vi samlar in</SectionTitle>
        <Paragraph>
          Vi samlar in följande typer av information när du besöker vår webbplats:
        </Paragraph>
        <ul>
          <li>Personlig information: Vi kan samla in namn, e-postadress och annan kontaktinformation som du frivilligt tillhandahåller när du anmäler dig eller beställer kläder.</li>
          <li>Webbplatsanvändning: Vi använder Microsoft Clarity för att samla in data om hur användare interagerar med vår webbplats. Denna data inkluderar din IP-adress, webbläsartyp, operativsystem, sidor du besöker, hur länge du stannar på varje sida, vilka länkar du klickar på och hur du navigerar på sidan.</li>
        </ul>
      </Section>

      <Section>
        <SectionTitle>3. Användning av Microsoft Clarity</SectionTitle>
        <Paragraph>
          Vi använder Microsoft Clarity för att samla in användarinformation i syfte att förbättra webbplatsens användarvänlighet och för att förstå användarbeteende. Clarity använder cookies för att registrera klick och interaktioner på vår webbplats. Informationen vi samlar in hjälper oss att analysera besöksstatistik och förbättra vår webbplats.
        </Paragraph>
      </Section>

      <Section>
        <SectionTitle>4. Samtycke</SectionTitle>
        <Paragraph>
          När du besöker vår webbplats informeras du om användningen av cookies och spårningsteknologier. Vi ger dig möjlighet att acceptera eller neka användningen av dessa teknologier genom en synlig banner som informerar om samtyckesvillkor. Genom att klicka på "Acceptera" samtycker du till att vi får samla in och använda din information enligt denna policy.
        </Paragraph>
      </Section>

      <ContactInfo>Kontakt: {DEFAULT_CONTACT_EMAIL}</ContactInfo>

      <Section>
        <SectionTitle>7. Ändringar i denna policy</SectionTitle>
        <Paragraph>
          Vi kan komma att uppdatera denna integritetspolicy från tid till annan. Vi gör detta genom att publicera en uppdaterad policy på vår webbplats.
        </Paragraph>
      </Section>
    </PrivacyPolicyContainer>
  );
};

export default PrivacyPolicy;
