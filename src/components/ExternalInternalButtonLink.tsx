import React from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";

interface ExternalInternalButtonLinkProps {
  link: string,
  linkName: string
}

const ExternalInternalButtonLink = (props: ExternalInternalButtonLinkProps) => {
  const { link, linkName } = props;

  if (link.substring(0, 4) === "http") {
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
      <Link to={link}>
        <Button style={{ marginTop: 4 }}>
          Gå till {linkName}
        </Button>
      </Link>
    )
  }
}

export default ExternalInternalButtonLink;
