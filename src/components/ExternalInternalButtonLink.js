import React from "react";
import { Button } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

const ExternalInternalButtonLink = (props) => {
    const {link, linkName} = props;
    
    if ( link.substring(0, 4) === "http") {
        return (
            <a
            target="_blank"
            rel="noopener noreferrer"
            href={link}
        >
            <Button style={{ marginTop: 4 }}>
            Gå till {linkName}
            </Button>
        </a>
        )
    } else {
        return (
            <RRNavLink to={link}>
            <Button style={{ marginTop: 4 }}>
                Gå till {linkName}
            </Button>
            </RRNavLink>
        )
    }
}

export default ExternalInternalButtonLink;