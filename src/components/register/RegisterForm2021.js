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
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "./Consent";
import { DayPicker, MonthPicker, YearPicker } from "../FormUtils";

class RegisterForm2021 extends Component {
  state = {
    name: "",
    email: "",
    year: "",
    month: "",
    day: "",
    info: "",
    gender: "",
    groupSize: 1,
    city: "",
    time: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false,
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
    } else {
      this.setState({ isCheckboxTwoTicked: !this.state.isCheckboxTwoTicked });
    }
  };

  render() {
    return (
      <Row>
        <Col style={{ marginTop: "2vh" }} md={6}>
          <Form
            onSubmit={(e) =>
              this.props.handleSubmit(e, "corona-edition", this.state)
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Anmälan 2021</h3>
              <div onClick={this.scrollToInfo} className="scroll-to-info-btn">
                Visa info<i className="fas fa-angle-down angle-down"></i>
              </div>
            </div>
            <i>Anmäl enskilt eller en grupp</i>

            <FormGroup>
              <Label for="name">Namn</Label>
              <Input
                required={true}
                type="text"
                name="name"
                id="name"
                placeholder="Förnamn Efternamn"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Epost</Label>
              <Input
                required={true}
                type="email"
                name="email"
                id="email"
                placeholder="din.email@gmail.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthdayID">Födelsedatum</Label>
              <div style={{ display: "flex" }}>
                <YearPicker handleChange={this.handleChange} elemName="year" />
                <MonthPicker
                  handleChange={this.handleChange}
                  elemName="month"
                />
                <DayPicker handleChange={this.handleChange} elemName="day" />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="genderSelection">Kön</Label>
              <Input
                required={true}
                type="select"
                name="gender"
                id="genderSelection"
                onChange={this.handleChange}
              >
                <option disabled selected value>
                  Välj kön
                </option>
                <option value="Man">Man</option>
                <option value="Kvinna">Kvinna</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="groupSize">Antal personer i gruppen</Label>
              <Input
                required={true}
                type="select"
                name="groupSize"
                onChange={this.handleChange}
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num, i) => {
                  return (
                    <option value={num} key={i}>
                      {num}
                    </option>
                  );
                })}
              </Input>
            </FormGroup>

            <FormGroup>
              <Label for="city"> Ort (klubb)</Label>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="Hensmåla löparförening"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="time">Önskad tid</Label>
              <Input
                required={true}
                type="text"
                name="time"
                id="time"
                placeholder="T.ex. 15.00 2021-06-07"
                value={this.state.time}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="info">Information</Label>
              <Input
                type="textarea"
                name="info"
                id="info"
                placeholder="Övriga önskemål eller information"
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
                {<Consent />}
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
                  tävlingsregler
                </RRNavLink>{" "}
                och den anmälningsinformation som finns på denna sida.
              </Label>
            </FormGroup>
            <Button
              id="submitButton"
              className="mt-4"
              style={{ minWidth: "140px" }}
              disabled={
                !(
                  this.state.isCheckboxOneTicked &&
                  this.state.isCheckboxTwoTicked
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
            <li>Evenemanget sker från 2:e juni - 16:e juli</li>
            <li>
              Anmäl dig eller din grupp här och ange vilken tid du vill komma
            </li>
            <li>Genomför loppet</li>
            <li>
              Ladda upp tid, bild och valfri text (kan döljas från hemsidan)
            </li>
            <li>De 8 snabbaste bjuds in till final den 18:e juli</li>
          </ol>
          <p>
            Årets Hensmåla Triathlon 2021 - Corona Edition är lite annorlunda
            från både vanliga år, och förra årets "Utmaningen". Tanken med årets
            lopp är att separera detagarna så mycket det går, medan fortfarande
            möjliggöra att kunna köra den ordinarie rundan. Årets evenemang
            stäcker sig därför över en längre period och grupper om max 8
            personer kör vid samma tillfälle. När man anmält vilken tid man ska
            komma och genomföra loppet, kör man rundan och sedan laddar upp
            tiderna{" "}
            <RRNavLink tag={RRNavLink} to="/corona-edition">
              här
            </RRNavLink>
            . De 8 bästa kommer sedan bli inbjudna till en final.
          </p>

          <b>
            Fotografering och videofilmning kan förekomma, meddela om du inte
            vill vara med.
          </b>
          <br></br>
          <br></br>
          <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
          <i style={{ fontSize: 12 }}>Startavgift: 250kr</i>
        </Col>
      </Row>
    );
  }
}

export default RegisterForm2021;
