import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "./Consent";

const encode = (data) => {
  return Object.keys(data)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class RegisterFormSolo extends Component {
  state = {
    name: "",
    email: "",
    year: "",
    month: "",
    day: "",
    info: "",
    city: "",
    gender: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false,
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = (e) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "registerSolo", ...this.state }),
    })
      .then(() => this.props.handleRegistration())
      .catch((error) => alert(error));

    e.preventDefault();
  };

  handleChange = (e) => {
    e.preventDefault();

    const name = e.target.name;
    let value = e.target.value;

    this.setState({ [name]: value });
  };

  toggleConsent = (checkbox) => {
    if (checkbox === 1) {
      this.setState({ isCheckboxOneTicked: !this.state.isCheckboxOneTicked });
    } else {
      this.setState({ isCheckboxTwoTicked: !this.state.isCheckboxTwoTicked });
    }
  };

  renderYears = () => {
    let years = [];
    for (let i = 2005; i > 1930; i--) {
      years.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return years;
  };

  renderMonths = () => {
    let months = [];
    months.push(
      <option value={1} key={0}>
        Januari
      </option>
    );
    months.push(
      <option value={2} key={1}>
        Februari
      </option>
    );
    months.push(
      <option value={3} key={2}>
        Mars
      </option>
    );
    months.push(
      <option value={4} key={3}>
        April
      </option>
    );
    months.push(
      <option value={5} key={4}>
        Maj
      </option>
    );
    months.push(
      <option value={6} key={5}>
        Juni
      </option>
    );
    months.push(
      <option value={7} key={6}>
        Juli
      </option>
    );
    months.push(
      <option value={8} key={7}>
        Augusti
      </option>
    );
    months.push(
      <option value={9} key={8}>
        September
      </option>
    );
    months.push(
      <option value={10} key={9}>
        Oktober
      </option>
    );
    months.push(
      <option value={11} key={10}>
        November
      </option>
    );
    months.push(
      <option value={12} key={11}>
        December
      </option>
    );
    return months;
  };

  renderDays = () => {
    let days = [];
    for (let i = 1; i <= 31; i++) {
      days.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return days;
  };

  render() {
    return (
      <Row>
        <Col style={{ marginTop: "5vh" }} md={6}>
          <Form onSubmit={this.handleSubmit}>
            <h3>Anmälan Individuell</h3>
            <FormGroup>
              <Label for="name">Namn</Label>
              <Input
                required={true}
                type="text"
                name="name"
                id="nameSOLO"
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
                id="emailSOLO"
                placeholder="din.email@gmail.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthdayID">Födelsedatum</Label>
              <div style={{ display: "flex" }}>
                <Input
                  className="mr-2"
                  required={true}
                  type="select"
                  name="year"
                  id="yearSelectionSOLO"
                  onChange={this.handleChange}
                >
                  <option disabled selected value>
                    År
                  </option>
                  {this.renderYears()}
                </Input>
                <Input
                  className="ml-2 mr-2"
                  required={true}
                  type="select"
                  name="month"
                  id="monthSelectionSOLO"
                  onChange={this.handleChange}
                >
                  <option disabled selected value>
                    Månad
                  </option>
                  {this.renderMonths()}
                </Input>
                <Input
                  className="ml-2"
                  required={true}
                  type="select"
                  name="day"
                  id="daySelectionSOLO"
                  onChange={this.handleChange}
                >
                  <option disabled selected value>
                    Dag
                  </option>
                  {this.renderDays()}
                </Input>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="genderSelection">Kön</Label>
              <Input
                required={true}
                type="select"
                name="gender"
                id="genderSelectionSOLO"
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
              <Label for="city"> Ort (klubb)</Label>
              <Input
                type="text"
                name="city"
                id="citySOLO"
                placeholder="Hensmåla löparförening"
                value={this.state.city}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="info">Information</Label>
              <Input
                type="textarea"
                name="info"
                id="infoSOLO"
                placeholder="T.ex. önskemål att starta i någon speciell
                startgrupp"
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
                <RRNavLink tag={RRNavLink} to="/om-ht/regler">
                  tävlingsregler
                </RRNavLink>{" "}
                och den anmälningsinformation som finns på denna sida.
              </Label>
            </FormGroup>
            <Button
              className="mt-4"
              disabled={
                !(
                  this.state.isCheckboxOneTicked &&
                  this.state.isCheckboxTwoTicked
                )
              }
            >
              Anmäl mig!
            </Button>
          </Form>
        </Col>
        <Col style={{ marginTop: "5vh" }}>
          <h3>Anmäl dig som indiviuell deltagare</h3>
          <b>Startavgift: 300kr </b>
          <i style={{ fontSize: 12 }}>
            Priset kommer höjas till 400 kr från och med 15:e juli.
          </i>
          <p>
            När du anmälder sig som indiviuell deltagare utför du alla tre
            grenar individuellt. För mer information om sträckorna och
            tävlingsregler kan du gå in{" "}
            <RRNavLink tag={RRNavLink} to="/om-ht/hem">
              HÄR
            </RRNavLink>
          </p>
          <p>
            Du kommer få ett mail med ett id-nummer och{" "}
            <b>betalningsuppgifter</b> då anmälan är gjord. När tävlingen närmar
            sig kommer yttligare information skickas ut via mail till alla
            deltagare.
          </p>
          <b>
            Fotografering och videofilmning förekommer, meddela om du inte vill
            vara med.
          </b>
          <br></br>
          <br></br>
          <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
        </Col>
      </Row>
    );
  }
}

export default RegisterFormSolo;
