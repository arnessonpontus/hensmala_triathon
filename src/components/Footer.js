import React from "react";
import { Jumbotron } from "reactstrap";

class Footer extends React.Component {
  render() {
    return (
      <Jumbotron
        className="text-center py-3"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 0,
          marginTop: 50,
          height: "20vh",
          backgroundColor: "#11999E",
          color: "#11999E",
          borderRadius: "0px",
        }}
      >
        <p style={{ color: "white" }}>© 2021 Copyright: Hensmalatriathlon.se</p>
        <div
          style={{
            width: 200,
            height: 50,
            backgroundColor: "white",
            borderRadius: 5,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <a
            href="https://www.facebook.com/HensmalaTriathlon/"
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
      </Jumbotron>
    );
  }
}

export default Footer;
