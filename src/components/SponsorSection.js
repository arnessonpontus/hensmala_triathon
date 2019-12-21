import React, { Component } from "react";

import { Card } from "reactstrap";

class SponsorSection extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.sponsor.link ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={this.props.sponsor.link}
          >
            <Card
              className={"spons-" + this.props.sponsType}
              style={{
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <img
                className={"spons-img-" + this.props.sponsType}
                src={"../../images/sponsorImages/" + this.props.sponsor.image}
              ></img>
            </Card>
          </a>
        ) : (
          <Card
            className={"spons-" + this.props.sponsType}
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <img
              className={"spons-img-" + this.props.sponsType}
              src={"../../images/sponsorImages/" + this.props.sponsor.image}
            ></img>
          </Card>
        )}
      </div>
    );
  }
}

export default SponsorSection;
