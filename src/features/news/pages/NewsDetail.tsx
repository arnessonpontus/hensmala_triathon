import { useEffect, useRef, useState } from "react";
import ImageGallery, { ReactImageGalleryItem } from "react-image-gallery";
import { Spinner } from "reactstrap";
import ExternalInternalButtonLink from "../../../components/ExternalInternalButtonLink";
import { useParams } from "react-router-dom";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { useContentfulClient } from "../../../hooks/useContentfulClient";
import { TypeNewsEntrySkeleton } from "../../../../generated/type";
import { Asset, Entry, UnresolvedLink } from "contentful";
import { styled } from "styled-components";
import { trimTimeFromDate } from "../utils";

const StyledContainer = styled.div`
  padding: 20px;
  max-width: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: center;
  
  ul, ol {
    padding-inline-start: 1.5rem;
    margin-inline-start: 0;
  }
`;

const StyledImageWrapper = styled.div`
  width: 100%;
   @media (min-width: 770px) {
     padding-left: 25%;
     padding-right: 25%;
   }
`;

let markdownOptions = {
  renderNode: {
    'embedded-asset-block': (node: any) => // TODO: Fix any
      <img width={150} height={510} alt="en bild" className="img-fluid" src={node.data.target.fields.file.url} />
  }
}

export const NewsDetail = () => {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState<Entry<TypeNewsEntrySkeleton, undefined, string> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const imageGalleryRef = useRef(null);

  if (!id) {
    return <p>Kunde inte hitta nyhet</p>
  }

  useEffect(() => {
    setIsLoading(true);
    const client = useContentfulClient();
    client
      .getEntry<TypeNewsEntrySkeleton>(id)
      .then((entry) => setNewsDetail(entry))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false))
  }, [])

  if (isLoading || !newsDetail) {
    return (
      <StyledContainer>
        <h2>Läser in nyhet</h2>
        <Spinner />
      </StyledContainer>
    )
  }

  function isResolvedAsset(
    asset: UnresolvedLink<'Asset'> | Asset<any>
  ): asset is Asset<any> {
    return 'fields' in asset;
  }

  // TODO: Handle image asset types
  const images: ReactImageGalleryItem[] = newsDetail.fields.images?.filter(i => isResolvedAsset(i)).map(image => ({ thumbnail: image.fields.file?.url as string, original: image.fields?.file?.url as string, originalAlt: image.fields.title })) ?? [] as ReactImageGalleryItem[];

  return (
    <StyledContainer>
      <div className="card-box d-block">
        <h1 className="m-4 minimize-title-small">{newsDetail.fields.title}</h1>
        <p><i>{trimTimeFromDate(newsDetail.fields.publishedTime)}</i></p>
        <p><strong>{newsDetail.fields.ingressText}</strong></p>
        {documentToReactComponents(newsDetail.fields.body!, markdownOptions)}
        {newsDetail.fields.videoLink ? (
          <div className="embed-responsive embed-responsive-16by9 mt-5">
            <iframe src={newsDetail.fields.videoLink} width="640" height="360" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen></iframe>
          </div>
        ) : images.length > 0 &&
        <StyledImageWrapper>
          <ImageGallery ref={imageGalleryRef} showPlayButton={false} showFullscreenButton={true} items={images} showThumbnails={images.length > 1 } onClick={() => (imageGalleryRef.current as any).toggleFullScreen()}/>
        </StyledImageWrapper>
        }

        {newsDetail.fields.link && newsDetail.fields.linkText ? (
          <div className="mt-4 d-flex justify-content-center">
            <ExternalInternalButtonLink link={newsDetail.fields.link} linkName={newsDetail.fields.linkText} />
          </div>
        ) : null}
      </div>
    </StyledContainer>
  );
}
