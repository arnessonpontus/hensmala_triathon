import React from "react";
import {Link} from "react-router-dom";

class Nav extends React.Component {
  render() {
    return (
      <nav className="nav">
       <Link to="/">
         <h3 className="logo-link">ANMÄLAN</h3>
        </Link>
        <Link to="/aboutALS">
         <h3 className="aboutALS-link">OM ALS</h3>
        </Link>
        <Link to="/aboutHT">
         <h3 className="aboutHT-link">OM HENSMÅLA TRIATLON</h3>
        </Link>
        <Link to="/media">
         <h3 className="media-link">MEDIA</h3>
        </Link>
        <Link to="/login">
         <h3 className="login-link">LOGIN</h3>
        </Link>
      </nav>
        
    );
  }
}


export default Nav;
