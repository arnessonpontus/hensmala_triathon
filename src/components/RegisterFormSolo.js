import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "./Consent";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class RegisterFormSolo extends Component {
  state = {
    name: "",
    email: "",
    birthday: "",
    info: "",
    city: "",
    sex: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "registerSolo", ...this.state })
    })
      .then(() => this.props.handleRegistration())
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => {
    e.preventDefault();

    const name = e.target.name;
    let value = e.target.value;

    if (e.target.name === "sexSOLO") {
      let element = document.getElementById("sexSelectionSOLO");
      value = element.options[element.selectedIndex].value;
    }

    this.setState({ [name]: value });
  };

  toggleConsent = checkbox => {
    if (checkbox === 1) {
      this.setState({ isCheckboxOneTicked: !this.state.isCheckboxOneTicked });
    } else {
      this.setState({ isCheckboxTwoTicked: !this.state.isCheckboxTwoTicked });
    }
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
              <Input
                required={true}
                type="date"
                name="birthday"
                id="birthdaySOLO"
                placeholder="date placeholder"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="sexSelection">Kön</Label>
              <Input
                required={true}
                type="select"
                name="sex"
                id="sexSelectionSOLO"
                onChange={this.handleChange}
              >
                <option></option>
                <option>Man</option>
                <option>Kvinna</option>
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
                placeholder="t.ex. önskemål att starta i någon speciell
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
                Jag kommer att följa den anmälningsinformation och de{" "}
                <RRNavLink tag={RRNavLink} to="/AboutHT">
                  tävlingsregler
                </RRNavLink>{" "}
                som finns på denna sida.
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
            grenar individuellt. För mer information om sträckorna och regler
            kan du gå in{" "}
            <RRNavLink tag={RRNavLink} to="/AboutHT">
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
