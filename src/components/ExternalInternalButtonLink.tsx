import { Link } from "react-router-dom";
import { PrimaryColor } from "../Constants";

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
        style={{color: PrimaryColor, flexShrink: 0}}
      >{`Gå till ${linkName} >`}</a>
    )
  } else {
    return (
      <Link style={{color: PrimaryColor, flexShrink: 0}} to={link}>{`Gå till ${linkName} >`}</Link>
    )
  }
}

export default ExternalInternalButtonLink;
