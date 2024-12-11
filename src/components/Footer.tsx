import React from "react";
import { FOOTER_HEIGHT } from "../Constants";
import { useConsentBanner } from "../features/consent/context/ConsentBannerContext";

export const Footer: React.FC = () => {
  const cookieBanner = useConsentBanner();

  const handleCookieBannerClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log("hesze")
    cookieBanner.showBanner();
  }

  return (
    <div
      style={{
        paddingRight: 20,
        paddingLeft: 20,
        paddingTop: 20,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 0,
        height: FOOTER_HEIGHT,
        backgroundColor: "#11999E",
        color: "#11999E",
        borderRadius: "0px",
      }}
    >
      <div
        style={{
          width: 200,
          height: 50,
          padding: 20,
          backgroundColor: "white",
          borderRadius: 5,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <a
          href="https://www.facebook.com/profile.php?id=61557863443816"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="30px"
            width="30px"
            src="/images/icons/fb_logo_144.png"
            alt="fb_logo"
          ></img>
        </a>
        <a
          href="mailto:hensmala.triathlon@gmail.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="30px"
            width="30px"
            src="/images/icons/Gmail_Icon.png"
            alt="Gmail_Icon"
          ></img>
        </a>
        <a
          href="https://www.instagram.com/hensmalatriathlon/?hl=sv"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            height="30px"
            width="30px"
            src="/images/icons/IG_logo.png"
            alt="IG_logo"
          ></img>
        </a>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <p style={{ color: "white" }}>© 2024  Copyright: Hensmalatriathlon.se</p>
        <a href="/" style={{ color: "white", textDecoration: "underline" }} role="button" onClick={handleCookieBannerClick}>Öppna cookiehantering</a>
      </div>
    </div>
  );
}
