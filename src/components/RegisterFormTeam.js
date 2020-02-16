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
                  <div style={{ display: "flex" }}>
                    <Input
                      className="mr-2"
                      required={true}
                      type="select"
                      name="year1"
                      id="yearSelection1"
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
                      name="month1"
                      id="monthSelection1"
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
                      name="day1"
                      id="daySelection1"
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
                  <div style={{ display: "flex" }}>
                    <Input
                      className="mr-2"
                      required={true}
                      type="select"
                      name="year2"
                      id="yearSelection2"
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
                      name="month2"
                      id="monthSelection2"
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
                      name="day2"
                      id="daySelection2"
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
                  <div style={{ display: "flex" }}>
                    <Input
                      className="mr-2"
                      required={true}
                      type="select"
                      name="year3"
                      id="yearSelection3"
                      onChange={this.handleChange}
                    >
                      <option>År</option>
                      {this.renderYears()}
                    </Input>
                    <Input
                      className="ml-2 mr-2"
                      required={true}
                      type="select"
                      name="month3"
                      id="monthSelection3"
                      onChange={this.handleChange}
                    >
                      <option>Månad</option>
                      {this.renderMonths()}
                    </Input>
                    <Input
                      className="ml-2"
                      required={true}
                      type="select"
                      name="day3"
                      id="daySelection3"
                      onChange={this.handleChange}
                    >
                      <option>Dag</option>
                      {this.renderDays()}
                    </Input>
                  </div>
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
                Vi kommer att följa Hensmåla Triathlons{" "}
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
            grenarna. För mer information om sträckorna och tävlingsregler kan
            du gå in{" "}
            <RRNavLink tag={RRNavLink} to="/om-ht/hem">
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
