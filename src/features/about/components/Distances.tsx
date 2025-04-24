import React from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 1rem;
`;

const Section = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 2rem;
`;

const TextContent = styled.div`
  flex: 1 1 50%;
  padding-right: 1rem;
`;

const ImageWrapper = styled.div`
  flex: 1 1 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledImage = styled.img`
  width: 200px;
  height: 200px;
  object-fit: contain;
`;

const SubTitle = styled.h3`
  margin-top: 1rem;
`;

export const Distances: React.FC = () => {
  return (
    <Container>
      <h2>Ordinarie tävlingssträckor</h2>

      <Section>
        <TextContent>
          <b>Simning - 340 m</b>
          <p>
            Simningen sker runt lillön. Starten går i vattnet vid stranden.
            Därefter är det medurs varv runt ön som gäller.
          </p>
          <p>
            Det kommer finnas livbåtar och dykare i vattnet. Vi startar 40 st i varje startgrupp. Se till att ha badmössan på dig under hela simningen och missa inte att slängda den i de utplacerade baljorna så vi ser att alla kommit upp helskinade.
          </p>
          <p>
            En film på simningen kan du se{" "}
            <a href="https://www.youtube.com/watch?time_continue=2&amp;v=JT6NvRHYMqw&amp;feature=emb_logo">
              här
            </a>
          </p>
        </TextContent>
        <ImageWrapper>
          <StyledImage src="/images/distances/simning.jpg" alt="Simmning" />
        </ImageWrapper>
      </Section>

      <Section>
        <TextContent>
          <b>Cykling - 9.2 km</b>
          <p>
            Cyklingen sker runt Hensjön. Cyklingen får först börja när
            deltagaren är utanför växlingsområdet, alltså på grusvägen,
            därefter går turen medurs runt sjön. Det är ca 2 kilometer{" "}
            <b>grusväg</b> under cykelsträckan. Det kan även förekomma lösgrus
            på vissa ställen.
          </p>
          <p>
            En film på cykelrundan kan du se{" "}
            <a href="https://www.youtube.com/watch?v=ce22jo1_FzA&amp;feature=emb_logo">
              här
            </a>
          </p>
        </TextContent>
        <ImageWrapper>
          <StyledImage src="/images/distances/cykling.jpg" alt="Cykling" />
        </ImageWrapper>
      </Section>

      <Section>
        <TextContent>
          <b>Löpning - 6.5 km</b>
          <p>
            Löpningen sker i skogen på andra sidan väg 120. Var{" "}
            <b>väldigt uppmärksam</b> på fordon när vägen behöver korsas vid
            två tillfällen.
          </p>
          <p>
            En film på löprundan kan du se{" "}
            <a href="https://www.youtube.com/watch?v=cnDqY2JtKUk&amp;feature=emb_logo">
              här
            </a>
          </p>
        </TextContent>
        <ImageWrapper>
          <StyledImage src="/images/distances/lopning.jpg" alt="Löpning" />
        </ImageWrapper>
      </Section>

      <h2>Tävlingssträckor barn</h2>
      <SubTitle>2-8 år</SubTitle>

      <Section>
        <TextContent>
          <b>Simning/löpning - 30 m</b>
          <p>Simning eller löpning i strandkanten med målsmans övervakning.</p>
        </TextContent>
        <ImageWrapper>
          <StyledImage src="/images/distances/kids/barn-stracka1.png" alt="Löpning barn" />
        </ImageWrapper>
      </Section>
      <Section>
        <TextContent>
          <b>Cykling - 300 m</b>
          <p>Cykling på gräs och grusväg.</p>
          <p>Funktionärer kommer vara utplacerade för att leda barnen rätt.</p>
        </TextContent>
        <ImageWrapper>
          <StyledImage src="/images/distances/kids/barn-stracka5.png" alt="Siming barn" />
        </ImageWrapper>
      </Section>
      <Section>
        <TextContent>
          <b>Löpning - 260 m</b>
          <p>Löpning på grus och grässtig.</p>
        </TextContent>
        <ImageWrapper>
          <StyledImage src="/images/distances/kids/barn-stracka4.png" alt="Siming barn" />
        </ImageWrapper>
      </Section>

      <SubTitle>9-15 år</SubTitle>

      <Section>
        <TextContent>
          <b>Simning - 25 m</b>
          <p>Simning nära strandkanten.</p>
        </TextContent>
        <ImageWrapper>
          <StyledImage src="/images/distances/kids/barn-stracka1.png" alt="Löpning barn" />
        </ImageWrapper>
      </Section>
      <Section>
        <TextContent>
          <b>Cykling - 550 m</b>
          <p>Cykling på gräs och grusväg.</p>
        </TextContent>
        <ImageWrapper>
          <StyledImage src="/images/distances/kids/barn-stracka3.png" alt="Siming barn" />
        </ImageWrapper>
      </Section>
      <Section>
        <TextContent>
          <b>Löpning - 360 m</b>
          <p>Löpning på gräsplan och stig.</p>
        </TextContent>
        <ImageWrapper>
          <StyledImage src="/images/distances/kids/barn-stracka2.png" alt="Siming barn" />
        </ImageWrapper>
      </Section>
    </Container>
  );
};
