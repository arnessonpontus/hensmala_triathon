import { Entry } from "contentful";
import { TypeSponsorSkeleton } from "../../../../generated/type";
import { getAssetUrl } from "../../../utils";

export const SponsorSection  = ({sponsor}: {sponsor: Entry<TypeSponsorSkeleton, undefined, string>}) => {
    return (
      <div style={{ margin: "10px" }}>
        {sponsor.fields.siteLink ? (
          <a
            target="_blank"
            rel="noopener noreferrer"
            href={sponsor.fields.siteLink}
            className="card-box-hoverable"
          >
            <div
              className={"spons-" + sponsor.fields.level}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt={"Sponsor image"}
                className={"spons-img-" + sponsor.fields.level}
                src={getAssetUrl(sponsor.fields.image)}
              ></img>
            </div>
          </a>
        ) : (
          <div className="card-box">
            <div
              className={"spons-" + sponsor.fields.level}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                alt={"Sponsor image"}
                className={"spons-img-" + sponsor.fields.level}
                src={getAssetUrl(sponsor.fields.image)}
              ></img>
            </div>
          </div>
        )}
      </div>
    );
  }
