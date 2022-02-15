import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Spinner,
  Card,
  CardBody
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "../Consent";
import { DayPicker, MonthPicker, YearPicker } from "../TimeUtils";

// TODO: Complete with correct state

class RegisterFormTeam extends Component {
  state = {
    teamName: "",
    name1: "",
    email1: "",
    year1: "",
    month1: "",
    day1: "",
    city1: "",
    name2: "",
    email2: "",
    year2: "",
    month2: "",
    day2: "",
    city2: "",
    name3: "",
    email3: "",
    year3: "",
    month3: "",
    day3: "",
    city3: "",
    info: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false,
    isCheckboxThreeTicked: false,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.scrollToInfo = this.scrollToInfo.bind(this);
  }

  handleChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    let value = e.target.value;

    this.setState({ [name]: value });
  };

  scrollToInfo = () => {
    document
      .getElementById("submitButton")
      .scrollIntoView({ behavior: "smooth" });
  };

  toggleConsent = (checkbox) => {
    if (checkbox === 1) {
      this.setState({ isCheckboxOneTicked: !this.state.isCheckboxOneTicked });
    } else if (checkbox === 2) {
      this.setState({ isCheckboxTwoTicked: !this.state.isCheckboxTwoTicked });
    } else {
      this.setState({
        isCheckboxThreeTicked: !this.state.isCheckboxThreeTicked,
      });
    }
  };

  renderMemberFields = () => {
    return ["1", "2", "3"].map((num) => {
      return(
      <div style={{marginBottom: "20px"}}>
        <Label for={`teamMember${num}`}>Lagmedlem {num}</Label>
        {num === "3" ? <i> (Ej för lag med endast två deltagare)</i> : null} 
        <i></i>
          <Card id={`teamMember${num}`} style={{ backgroundColor: `#dfeff${num*3}` }}>
            <CardBody>
              <FormGroup>
                <Label for={`name${num}`}>Namn</Label>
                <Input
                  required={true}
                  type="text"
                  name={`name${num}`}
                  id={`name${num}`}
                  placeholder="Förnamn Efternamn"
                  value={this.state[`name${num}`]}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`email${num}`}>Epost</Label>
                <Input
                  required={true}
                  type="email"
                  name={`email${num}`}
                  id={`email${num}`}
                  placeholder="din.email@gmail.com"
                  value={this.state[`email${num}`]}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`birthdayID${num}`}>Födelsedatum</Label>
                <div style={{ display: "flex" }}>
                  <YearPicker
                    handleChange={this.handleChange}
                    elemName={`year${num}`}
                  />
                  <MonthPicker
                    handleChange={this.handleChange}
                    elemName={`month${num}`}
                  />
                  <DayPicker
                    handleChange={this.handleChange}
                    elemName={`day${num}`}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <Label for={`city${num}`}> Ort (klubb)</Label>
                <Input
                  type="text"
                  name={`city${num}`}
                  id={`city${num}`}
                  placeholder="Hensmåla löparförening"
                  value={this.state[`city${num}`]}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </CardBody>
          </Card>
        </div>
        )
    })
  }
            

  render() {
    return (
      <Row>
        <Col style={{ marginTop: "2vh" }} md={6}>
          <Form
            onSubmit={(e) =>
              this.props.handleSubmit(e, "team", this.state)
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Anmälan 2021 Lag</h3>
              <div onClick={this.scrollToInfo} className="scroll-to-info-btn">
                Visa info<i className="fas fa-angle-down angle-down"></i>
              </div>
            </div>

            <FormGroup>
              <Label for="teamName">Lagnamn</Label>
              <Input
                required={true}
                type="text"
                name="teamName"
                id="teamName"
                placeholder="Gubbaflås"
                value={this.state.teamName}
                onChange={this.handleChange}
              />
            </FormGroup>
            {this.renderMemberFields()}
            <FormGroup>
              <Label for="info">Information</Label>
              <Input
                type="textarea"
                name="info"
                id="info"
                placeholder="T.ex. vilka du vill köra samtidigt som eller övrig info"
                value={this.state.info}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup check>
              <Label for="checkbox1">
                <Input
                  className="checkbox1"
                  type="checkbox"
                  onClick={() => this.toggleConsent(1)}
                />{" "}
                Jag accepterar att Hensmåla Triathlon sparar data om mig.
                <Consent
                  buttonText="Vad betyder detta?"
                  title="Information om sparad data"
                >
                  Hensmåla Triathlon kommer spara uppgifter för att hantera
                  anmälningar till tävlingen. Dessa uppgifter behövs för att
                  kunna hantera alla deltagare och se till att evemanget blir så
                  bra som möjligt.
                  <br></br>
                  <br></br>
                  Om du önskar att vi ska ta bort dina uppgifter kan du kontakta
                  hensmala.triathlon@gmail.com. Dock kommer du då ej kunna vara
                  med på loppet.
                </Consent>
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label for="checkbox2">
                <Input
                  className="checkbox2"
                  type="checkbox"
                  onClick={() => this.toggleConsent(2)}
                />{" "}
                Jag kommer att följa Hensmåla Triathlons{" "}
                <RRNavLink
                  target="_blank"
                  rel="noopener noreferrer"
                  to="/om-ht/regler"
                >
                  regler
                </RRNavLink>{" "}
                och den anmälningsinformation som finns på denna sida.
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label for="checkbox3">
                <Input
                  className="checkbox3"
                  type="checkbox"
                  onClick={() => this.toggleConsent(3)}
                />{" "}
                Jag accepterar att bilder och filmer sparas och kan användas på
                internet.
              </Label>
            </FormGroup>
            <Button
              id="submitButton"
              className="mt-4"
              style={{ minWidth: "140px" }}
              disabled={
                !(
                  this.state.isCheckboxOneTicked &&
                  this.state.isCheckboxTwoTicked &&
                  this.state.isCheckboxThreeTicked
                ) || this.props.loading
              }
            >
              {this.props.loading ? (
                <Spinner size="sm" color="info" />
              ) : (
                "Anmäl mig!"
              )}
            </Button>
          </Form>
          <small>
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
            apply.
          </small>
        </Col>
        <Col style={{ marginTop: "2vh" }}>
          <hr className="register-divider"></hr>
          <h3>Anmälan till Hensmåla Triathlon 2021 - Corona Edition</h3>
          <b>
            Gå{" "}
            <RRNavLink tag={RRNavLink} to="/corona-edition">
              hit
            </RRNavLink>{" "}
            för att läsa mer om årets lopp. En kort sammanfattning av processen
            för årets lopp följer nedan:
          </b>
          <br></br>
          <br></br>
          <ol style={{ paddingLeft: 0, listStylePosition: "inside" }}>
            <li>Evenemanget sker från 2:e juli - 16:e juli</li>
            <li>Anmäl dig här och ange vilken tid du vill komma</li>
            <li>
              Betala 250kr till bankgiro 386-6563 eller swisha till 1236882088
            </li>
            <li>Genomför loppet (och ta gärna bilder)</li>
            <li>
              Ladda upp tid, bild och valfri text (kan döljas från hemsidan)
            </li>
            <li>
              De snabbaste bjuds in till final den 18:e juli (genomförs med
              funktionärer)
            </li>
          </ol>
          <i>
            Evenemanget sker i år utan funktionärer. Därför är det väldigt
            viktigt att vara extra aktsam vid vägövergångar och simning.
          </i>
          <br></br>
          <br></br>
          <p>
            Årets Hensmåla Triathlon 2021 - Corona Edition är lite annorlunda
            från både vanliga år, och förra årets "Utmaningen". Tanken med årets
            lopp är att separera deltagarna så mycket det går, medan fortfarande
            kunna köra den ordinarie rundan. Årets evenemang sträcker sig därför
            över en längre period och grupper om max 8 personer kör vid samma
            tillfälle. När tid för genomförande är bestämt, kör man rundan och
            efteråt laddar upp sitt resultat på hemsidan{" "}
            <RRNavLink tag={RRNavLink} to="/corona-edition">
              här
            </RRNavLink>
            . De med snabbaste tider kommer sedan bli inbjudna till en final.
          </p>

          <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
          <b style={{ fontSize: 20 }}>Startavgift: 250kr</b>
        </Col>
      </Row>
    );
  }
}

export default RegisterFormTeam;
