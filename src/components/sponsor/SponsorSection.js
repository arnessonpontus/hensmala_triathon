import React, { Component } from "react";

class SponsorSection extends Component {
  render() {
    return (
      <div style={{ margin: "10px" }}>
        {this.props.sponsor.link ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.sponsor.link}
            className="card-box-hoverable"
          >
            <div
              className={"spons-" + this.props.sponsType}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                style={{ pointerEvents: "none" }}
                alt={this.props.image}
                className={"spons-img-" + this.props.sponsType}
                src={"../../images/sponsorImages/" + this.props.sponsor.image}
              ></img>
            </div>
          </a>
        ) : (
          <div className="card-box-hoverable">
            <div
              className={"spons-" + this.props.sponsType}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt={this.props.image}
                className={"spons-img-" + this.props.sponsType}
                src={"../../images/sponsorImages/" + this.props.sponsor.image}
              ></img>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SponsorSection;
