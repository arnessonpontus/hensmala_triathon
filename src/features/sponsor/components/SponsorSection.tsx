interface Sponsor {
  title: string;
  image: string;
  link: string;
}
interface SponsorSectionProps {
  sponsor: Sponsor,
  sponsType: "gold" | "silver" | "brons"
}

export const SponsorSection  = (props: SponsorSectionProps) => {
    return (
      <div style={{ margin: "10px" }}>
        {props.sponsor.link ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={props.sponsor.link}
            className="card-box-hoverable"
          >
            <div
              className={"spons-" + props.sponsType}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt={"Sponsor image"}
                className={"spons-img-" + props.sponsType}
                src={"../../images/sponsorImages/" + props.sponsor.image}
              ></img>
            </div>
          </a>
        ) : (
          <div className="card-box">
            <div
              className={"spons-" + props.sponsType}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt={"Sponsor image"}
                className={"spons-img-" + props.sponsType}
                src={"../../images/sponsorImages/" + props.sponsor.image}
              ></img>
            </div>
          </div>
        )}
      </div>
    );
  }
