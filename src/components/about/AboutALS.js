import React from "react";
import {
  Collapse,
  Button,
  CardBody,
  Card,
  Container,
  CardTitle,
} from "reactstrap";
class AboutALS extends React.Component {
  state = {
    isALSOpen: false,
    isNeuroOpen: false,
  };

  constructor(props) {
    super(props);

    this.toggleALS = this.toggleALS.bind(this);
    this.toggleNeuro = this.toggleNeuro.bind(this);
  }

  toggleALS = () => {
    this.setState({ isALSOpen: !this.state.isALSOpen });
  };

  toggleNeuro = () => {
    this.setState({ isNeuroOpen: !this.state.isNeuroOpen });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div>
        <img
          style={{ width: "100%" }}
          src="/images/about-als.jpg"
          alt="Neuro"
        ></img>
        <Container className="mt-5" style={{ minHeight: "50vh" }}>
          <div>
            <Button
              outline
              size="lg"
              block
              color="secondary"
              onClick={this.toggleALS}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Om ALS
              <img
                src="../../images/icons/downarrow.svg"
                alt="arrow down"
              ></img>
            </Button>
            <Collapse isOpen={this.state.isALSOpen}>
              <Card>
                <CardBody>
                  <CardTitle style={{ fontSize: 30 }}>
                    ALS (amyotrofisk lateral skleros)
                  </CardTitle>
                  <p>
                    ALS (amyotrofisk lateral skleros) ALS är en sjukdom som
                    leder till förlamningar, orsakade av att de nervceller i
                    hjärnan och ryggmärgen som styr musklerna bryts ner.
                    Medvetandet påverkas inte. Andningssvikt uppträder förr
                    eller senare, och oftast dör personen inom 2-4 år.
                    <br></br>
                    Orsaken är inte känd. Ärftlig i endast 5-10% av fallen.
                    Ingen bot finns ännu. Smittar inte. Förekommer över hela
                    världen.
                    <br />
                    <br />
                    Varje år insjuknar cirka 200 personer i Sverige. Tendens
                    till ökning på senare tid. De flesta som insjuknar är mellan
                    50 och 70 år.
                  </p>
                  <CardTitle style={{ fontSize: 30 }}>
                    Stoppa ALS och ALS Treatment Center Karolinska
                  </CardTitle>
                  <p>
                    Stoppa ALS och Neuroförbundet driver tillsammans en riktad
                    insamling för att möjliggöra uppstart och drift av ett
                    rikstäckande center för kliniska behandlingsstudier för
                    ALS-patienter, ALS Treatment Center Karolinska. Centret
                    skall utgå ifrån Karolinska Sjukhuset i Huddinge och kommer
                    göra det möjligt för patienter över hela Sverige att delta i
                    kliniska studier på nya lovande preparat. Det första
                    delmålet är att samla in 1,5 miljoner kronor för att kunna
                    öppna centret och hålla det igång under ett år. Hensmåla
                    Triathlons överskott från 2018, 125 000 kronor, skänktes
                    till denna insamling. Se artikeln{" "}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="images/articleImages/2018/neuro_2018-10-02.pdf"
                    >
                      här
                    </a>
                    .
                    <br />
                    <br />
                    I slutet av oktober 2018 hände det äntligen, ALS Treatment
                    Center Karolinska blev verklighet! Centret har satt upp
                    infrastruktur samt anställt och utbildat personal. Centret
                    har nu också kunnat delta i sin första studie (REFALS). Det
                    är en stor internationell multicenterstudie. Upp till 45
                    ALS-drabbade från hela Sverige kommer kunna inkluderas i
                    studien, vars mål är att utvärdera effekten av Levosimendan
                    på andningsmuskelaturen.
                    <br />
                    <br />
                    Dock återstår mycket arbete för att ALS Treatment Center
                    Karolinska skall bli den långsiktiga satsning som målet
                    alltid varit. Insamlingen har hittills nått halvvägs till
                    det första delmålet på 1,5 miljoner kronor. Ett långsiktigt
                    center kommer att kunna ta emot ytterligare kliniska studier
                    och möjliggöra att ännu fler drabbade kan få anledning att
                    hoppas på mer tid med sina nära och kära.
                    <br />
                    <br />
                    Alla gåvor till insamlingen, stora som små, tas tacksamt
                    emot.
                  </p>
                </CardBody>
              </Card>
            </Collapse>
          </div>
          <div>
            <Button
              outline
              size="lg"
              block
              color="secondary"
              onClick={this.toggleNeuro}
              style={{
                marginBottom: "1rem",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              Om Neuro
              <img
                src="../../images/icons/downarrow.svg"
                alt="arrow down"
              ></img>
            </Button>
            <Collapse isOpen={this.state.isNeuroOpen}>
              <Card>
                <CardBody>
                  <CardTitle>Detta är Neuro</CardTitle>
                  Neuro (Neuroförbundet) fokuserar brett på konsten att leva med
                  en neurologisk diagnos och för ett tillgängligt samhälle för
                  alla. 500 000 människor i Sverige har en neurologisk diagnos
                  och neurologi är en gren av medicinen som behandlar sjukdomar
                  i hjärnan och övriga nervsystemet (som als, stroke, epilepsi,
                  multipel skleros, Parkinson, ryggmärgsskada och myastenia
                  gravis). Neuro administrerar Neurofonden, som årligen ger ett
                  par miljoner kronor i bidrag till olika forskningsprojekt inom
                  neurologin. På <a href="https://www.Neuro.se">Neuro.se</a> och
                  i den nystartade podcasten 
                  <a href="https://www.Neuropodden.se">Neuropodden.se</a>,
                  rapporterar NeuroMedia om den neurologiska forskningens
                  framsteg. Här finns också reportage och intervjuer där
                  personer berättar om konsten att leva med en neurologisk
                  diagnos.  För mer info och medlemskap: 
                  <a href="https://www.Neuro.se">Neuro.se</a>
                </CardBody>
              </Card>
            </Collapse>
          </div>
        </Container>
      </div>
    );
  }
}

export default AboutALS;
