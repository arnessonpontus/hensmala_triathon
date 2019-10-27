import React from "react";
import { Link } from "react-router-dom";

class Media extends React.Component {
  render() {
    return (
      <div className="media">
        <h1>MEDIA</h1>
        <div className="media-choices">
          <Link to="/videos">
            <h3 className="logo">VIDEOS</h3>
          </Link>
          <Link to="/photos">
            <h3 className="logo">FOTON</h3>
          </Link>
        </div>
      </div>
    );
  }
}

export default Media;
