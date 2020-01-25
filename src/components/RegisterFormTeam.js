import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "./Consent";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class RegisterFormTeam extends Component {
  state = {
    teamName: "",
    name1: "",
    email1: "",
    birthday1: "",
    city1: "",
    name2: "",
    email2: "",
    birthday2: "",
    city2: "",
    name3: "",
    email3: "",
    birthday3: "",
    city3: "",
    info: "",
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
      body: encode({ "form-name": "registerTeam", ...this.state })
    })
      .then(() => this.props.handleRegistration())
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => {
    e.preventDefault();

    const name = e.target.name;
    let value = e.target.value;

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
            <h3>Anmälan Lag</h3>
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
            <Label for="teamMember1">Lagmedlem 1</Label>
            <Card id="teamMember1" style={{ backgroundColor: "#dfeff0" }}>
              <CardBody>
                <FormGroup>
                  <Label for="name1">Namn</Label>
                  <Input
                    required={true}
                    type="text"
                    name="name1"
                    id="name1"
                    placeholder="Förnamn Efternamn"
                    value={this.state.name1}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email1">Epost</Label>
                  <Input
                    required={true}
                    type="email"
                    name="email1"
                    id="email1"
                    placeholder="din.email@gmail.com"
                    value={this.state.email1}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="birthdayID1">Födelsedatum</Label>
                  <Input
                    required={true}
                    type="date"
                    name="birthday1"
                    id="birthday1"
                    placeholder="date placeholder"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city1"> Ort (klubb)</Label>
                  <Input
                    type="text"
                    name="city1"
                    id="city1"
                    placeholder="Hensmåla löparförening"
                    value={this.state.city1}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </CardBody>
            </Card>
            <Label className="mt-4" for="teamMember2">
              Lagmedlem 2
            </Label>
            <Card id="teamMember2" style={{ backgroundColor: "#cee7e9" }}>
              <CardBody>
                <FormGroup>
                  <Label for="name2">Namn</Label>
                  <Input
                    required={true}
                    type="text"
                    name="name2"
                    id="name2"
                    placeholder="Förnamn Efternamn"
                    value={this.state.name2}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email2">Epost</Label>
                  <Input
                    required={true}
                    type="email"
                    name="email2"
                    id="email2"
                    placeholder="din.email@gmail.com"
                    value={this.state.email2}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="birthdayID2">Födelsedatum</Label>
                  <Input
                    required={true}
                    type="date"
                    name="birthday2"
                    id="birthday2"
                    placeholder="date placeholder"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city2"> Ort (klubb)</Label>
                  <Input
                    type="text"
                    name="city2"
                    id="city2"
                    placeholder="Hensmåla löparförening"
                    value={this.state.city2}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </CardBody>
            </Card>
            <Label className="mt-4" for="teamMember3">
              Lagmedlem 3 (Ej för lag med endast två deltagare)
            </Label>
            <Card id="teamMember3" style={{ backgroundColor: "#b6dcdf" }}>
              <CardBody>
                <FormGroup>
                  <Label for="name3">Namn</Label>
                  <Input
                    required={true}
                    type="text"
                    name="name3"
                    id="name3"
                    placeholder="Förnamn Efternamn"
                    value={this.state.name3}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email3">Epost</Label>
                  <Input
                    type="email"
                    name="email3"
                    id="email3"
                    placeholder="din.email@gmail.com"
                    value={this.state.email3}
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="birthdayID3">Födelsedatum</Label>
                  <Input
                    type="date"
                    name="birthday3"
                    id="birthday3"
                    placeholder="date placeholder"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city3"> Ort (klubb)</Label>
                  <Input
                    type="text"
                    name="city3"
                    id="city3"
                    placeholder="Hensmåla löparförening"
                    value={this.state.city3}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </CardBody>
            </Card>

            <FormGroup>
              <Label className="mt-4" for="info">
                Information
              </Label>
              <Input
                type="textarea"
                name="info"
                id="info"
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
                Vi accepterar att Hensmåla Triathlon sparar data om oss.
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
                Vi kommer att följa den anmälningsinformation och de{" "}
                <RRNavLink tag={RRNavLink} to="/AboutHT">
                  tävlingsregler
                </RRNavLink>{" "}
                som finns på denna sida. som finns på denna sida.
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
              Anmäl oss!
            </Button>
          </Form>
        </Col>
        <Col style={{ marginTop: "5vh" }}>
          <h3>Anmäl er som Lag</h3>
          <b>Startavgift: 500kr </b>
          <i style={{ fontSize: 12 }}>
            Priset kommer höjas till 600 kr från och med 15:e juli.
          </i>
          <p>
            När ni anmäler er som lag får sträckorna delas upp inom laget. Detta
            kan innebära att ni är tre som deltar där alla kör en gren var.
            Eller innefattar laget endast två personer och en person kör två av
            grenarna. För mer information om sträckorna och regler kan du gå in{" "}
            <RRNavLink tag={RRNavLink} to="/AboutHT">
              HÄR
            </RRNavLink>
          </p>
          <p>
            Ni kommer få ett mail med ett id-nummer och{" "}
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

export default RegisterFormTeam;
