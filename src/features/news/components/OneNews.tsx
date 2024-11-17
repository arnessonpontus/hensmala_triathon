import { Button } from "reactstrap";
import { Link } from 'react-router-dom';
import { Fade } from "react-awesome-reveal";
import ExternalInternalButtonLink from "../../../components/ExternalInternalButtonLink";
import { Entry } from "contentful";
import { TypeNewsEntrySkeleton } from "../../../../generated/type";
import styled from "styled-components";
import { trimTimeFromDate } from "../utils";
import { getAssetUrl } from "../../../utils";

export const StyledImage = styled.img`
  height: 200px;
  object-fit: cover;
`;

const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  overflow: hidden;
  flex: 1;
`;

const StyledText = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  max-height: 50px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  white-space: normal;
`;

const NewsCard = styled.div`
  padding: 0;
  overflow: hidden;
  max-width: 500px;
  min-height: 500px;
  flex: 1;
  flex-direction: column;
  justify-content: flex-start;
`;

const CardFooter = styled.div`
  display: flex;
  min-height: 50px;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1;
  flex-wrap: wrap;
  gap: 4px;
`;

const OneNews = (props: { news: Entry<TypeNewsEntrySkeleton, undefined, string> }) => {
  const firstImageUrl = getAssetUrl(props.news.fields.images?.[0])

  return (
    <Fade>
      <NewsCard key={props.news.fields.publishedTime} className="card-box">
        {firstImageUrl ?
          <StyledImage width="100%" src={firstImageUrl} /> :
          <StyledImage width="100%" src={"/images/news/news_default.png"} />
        }
        <StyledContent>
          <h4>{props.news.fields.title}</h4>
          <StyledText>{props.news.fields.ingressText}</StyledText>
          <Link className="nostyle-link mb-2" to={'/news/' + props.news.sys.id}> <Button outline style={{ width: "100%" }}>Läs mer</Button></Link>
          <CardFooter>
            <i>{trimTimeFromDate(props.news.fields.publishedTime)}</i>
            {props.news.fields.link && props.news.fields.linkText ? (
              <ExternalInternalButtonLink link={props.news.fields.link} linkName={props.news.fields.linkText} />
            ) : null}
          </CardFooter>
        </StyledContent>
      </NewsCard>
    </Fade>
  );
};

export default OneNews;
