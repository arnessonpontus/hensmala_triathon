import { useEffect, useState } from "react";

import { Container } from "reactstrap";
import { SponsorSection } from "../components/SponsorSection";
import { TypeSponsorSkeleton } from "../../../../generated/type";
import { Entry } from "contentful";
import { useContentfulClient } from "../../../hooks/useContentfulClient";

export const Sponsors = () => {
  const [entries, setEntries] = useState<Entry<TypeSponsorSkeleton, undefined, string>[]>([]);
  const client = useContentfulClient();

  const fetchEntries = async (): Promise<void> => {
    client
      .getEntries<TypeSponsorSkeleton>({
        content_type: "sponsor",
        order: ["-sys.createdAt"],
      })
      .then((res) => {
        setEntries(res.items);
      })
      .catch((err) => console.log(err))
  }

  useEffect(() => {
    fetchEntries();

    window.scrollTo(0, 0);
  }, [])

  // Gold sponsor - more than 5k, silver - more than 2k
  return (
    <Container className="min-vh-100">
      <div className="spons-container" style={{ paddingTop: "20px" }}>
        {entries.filter(item => item.fields.level === "GOLD").map((sponsor) => {
          return <SponsorSection sponsor={sponsor}/>;
        })}
      </div>
      <div className="spons-container">
        {entries.filter(item => item.fields.level === "SILVER").map((sponsor) => {
          return <SponsorSection sponsor={sponsor}/>;
        })}
      </div>
      <div className="spons-container">
        {entries.filter(item => item.fields.level === "BRONZE").map((sponsor) => {
          return <SponsorSection sponsor={sponsor}/>;
        })}
      </div>
    </Container>
  );
}
