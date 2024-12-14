import { useEffect } from "react";
import styled from "styled-components";
import { clarity } from "react-microsoft-clarity";
import { useConsentBanner } from "../context/ConsentBannerContext";
import { Link } from "react-router-dom";
import { getViteEnvVariable } from "../../../utils";

const ConsentBanner = () => {
  const {isOpen, hideBanner, showBanner} = useConsentBanner();
  const PROJECT_ID = getViteEnvVariable("VITE_CLARITY_PROJECT_ID");

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (consent === "accepted") {
      clarity.init(PROJECT_ID);
      hideBanner();
    } else {
      showBanner();
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    hideBanner();

    clarity.init(PROJECT_ID);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    clarity.stop();
    hideBanner();
  };

  if (!isOpen) return null;

  return (
    <BannerContainer>
      <Text>
      Vi använder cookies för att förbättra din upplevelse och analysera användningen med Microsoft Clarity. Genom att klicka på "Acceptera" samtycker du till användningen av dessa cookies. Läs mer i vår <Link to="/integritetspolicy">Integritetspolicy</Link>.
      </Text>
      <ButtonContainer>
        <Button onClick={handleAccept}>Acceptera</Button>
        <Button onClick={handleDecline} decline>Avböj</Button>
      </ButtonContainer>
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #343a40;
  color: #ffffff;
  padding: 15px;
  text-align: center;
  z-index: 1000;
`;

const Text = styled.p`
  margin: 0;
  a {
    color: #007bff;
    text-decoration: none;
  }
`;

const ButtonContainer = styled.div`
  margin-top: 10px;
`;

const Button = styled.button<{ decline?: boolean }>`
  margin: 0 5px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.decline ? "transparent" : "#007bff")};
  color: #ffffff;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    opacity: 0.9;
  }
`;

export default ConsentBanner;
