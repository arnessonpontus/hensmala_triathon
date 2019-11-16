import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg
} from "reactstrap";

const radioShows = [
  {
    title: "Årets kronobergare 1",
    text:
      "Hensmåla Triathlon-arrangörerna Eva och Lennart Arnesson är nominerade till Årets Kronobergare 2018 - Peje i Hensmåla.",
    radioSrc: "sound/morgon_i_p4_kronoberg_2018-11-16.mp3"
  },
  {
    title: "Årets kronobergare 2",
    text: "Eva på intervjuad i radio Kronoberg.",
    radioSrc: "sound/29_eva_arnesson_om_att_vara_2469435_a192.mp3"
  },
  {
    title: "Neuropodden 9 september 2017",
    text:
      "Hör poddradiointervjun med Caroline Ingre om hennes teams forskning för att försöka lösa ALS-gåtan och mottagandet av stipendiet från Neuroförbundet och Hensmåla Triathlon (6:36 min), NeuroPodden (Neuroförbundet)Publicerat lördag 9 september 2017.",
    radioSrc:
      "sound/neuropodden-detta_ska_neurologen_caroline_ingre_anvanda_neuro-halvmiljonen_till_i_sin_als-forskning.mp3"
  },
  {
    title: "Telefonintervju med Eva",
    text:
      "Folkfesten Hensmåla Triathlon laddar för sjätte året (5:45 min), P4 Kronoberg    Publicerat fredag 28 juli 2017 kl 05.59.",
    radioSrc:
      "sound/2017-08-02-21h16m36s-morgon_i_p4_20170728_0559_192.m4a-.mp4"
  },
  {
    title: "Interjvu med deltagaren Adam Weidenmark och Karin Nilsson",
    text:
      "Triathlon för alla åldrar (2:41 min), P4 Kronoberg Publicerat fredag 28 juli 2017 kl 20.30.",
    radioSrc: "sound/29_triathlondeltagarna_34398a1_a192.mp3"
  },
  {
    title: "Kort omnämnadne i Nyheter från P4 Kronoberg",
    text:
      "Nyheter från P4 Kronoberg (2:30 min), P4 Kronoberg Publicerat måndag 31 juli 2017 kl 13:30.",
    radioSrc: "sound/nyheter_fran_p4_kronoberg_20170731_1330_192.mp3"
  }
];

class Radio extends React.Component {
  render() {
    return (
      <Container className="pt-5">
        <Row>
          {radioShows.map(radioShow => {
            return (
              <Col className="mt-4" md="6">
                <Card style={{ minHeight: 500 }}>
                  <CardBody>
                    <CardImg src="images/arets_kronobergare.png"></CardImg>
                    <CardTitle className="mt-2">{radioShow.title}</CardTitle>
                    <CardText>{radioShow.text}</CardText>

                    <audio controls src={radioShow.radioSrc}>
                      Din webläsare stödjer ej ljudelementet
                    </audio>
                  </CardBody>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}

export default Radio;
