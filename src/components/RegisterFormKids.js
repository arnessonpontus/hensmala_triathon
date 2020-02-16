import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "./Consent";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class RegisterFormKids extends Component {
  state = {
    nameKID: "",
    emailKID: "",
    yearKID: "",
    monthKID: "",
    dayKID: "",
    infoKID: "",
    cityKID: "",
    genderKID: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false,
    isCheckboxThreeTicked: false
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "registerKids", ...this.state })
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
    } else if (checkbox === 2) {
      this.setState({ isCheckboxTwoTicked: !this.state.isCheckboxTwoTicked });
    } else {
      this.setState({
        isCheckboxThreeTicked: !this.state.isCheckboxThreeTicked
      });
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
            <h3>Anmälan Barn</h3>
            <FormGroup>
              <Label for="nameKID">Namn</Label>
              <Input
                required={true}
                type="text"
                name="nameKID"
                id="nameKID"
                placeholder="Förnamn Efternamn"
                value={this.state.nameKID}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="emailKID">Epost</Label>
              <Input
                required={true}
                type="emailKID"
                name="emailKID"
                id="emailKID"
                placeholder="din.email@gmail.com"
                value={this.state.emailKID}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthdayIDKID">Födelsedatum</Label>
              <div style={{ display: "flex" }}>
                <Input
                  className="mr-2"
                  required={true}
                  type="select"
                  name="yearKID"
                  id="yearSelectionKID"
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
                  name="monthKID"
                  id="monthSelectionKID"
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
                  name="dayKID"
                  id="daySelectionKID"
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
              <Label for="genderSelectionKID">Kön</Label>
              <Input
                required={true}
                type="select"
                name="genderKID"
                id="genderSelectionKID"
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
              <Label for="cityKID"> Ort (klubb)</Label>
              <Input
                type="text"
                name="cityKID"
                id="cityKID"
                placeholder="Hensmåla löparförening"
                value={this.state.cityKID}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="guardianName"> Målsmans namn</Label>
              <Input
                type="text"
                required={true}
                name="guardianName"
                id="guardianName"
                placeholder="Förnamn Efternamn"
                value={this.state.guardianName}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="guardianPhone"> Målsmans telefonnummer</Label>
              <Input
                type="tel"
                required={true}
                name="guardianPhone"
                id="guardianPhone"
                placeholder=""
                value={this.state.guardianPhone}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="guardianEmail"> Målsmans epost</Label>
              <Input
                type="email"
                required={true}
                name="guardianEmail"
                id="guardianEmail"
                placeholder="malsman.email@gmail.com"
                value={this.state.guardianEmail}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="infoKID">Information</Label>
              <Input
                type="textarea"
                name="infoKID"
                id="infoKID"
                placeholder=""
                value={this.state.infoKID}
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
            <FormGroup check>
              <Label for="checkbox3">
                <Input
                  className="checkbox3"
                  type="checkbox"
                  onClick={() => this.toggleConsent(3)}
                />{" "}
                Jag kan simma minst 200 meter och kommer ha en vuxen anhörig på
                plats.
              </Label>
            </FormGroup>
            <Button
              className="mt-4"
              disabled={
                !(
                  this.state.isCheckboxOneTicked &&
                  this.state.isCheckboxTwoTicked &&
                  this.state.isCheckboxThreeTicked
                )
              }
            >
              Anmäl mig!
            </Button>
          </Form>
        </Col>
        <Col style={{ marginTop: "5vh" }}>
          <h3>Nyhet! Anmälan för dig upp till 15 år</h3>
          <b>Startavgift: 100kr </b>
          <i style={{ fontSize: 12 }}>
            Priset kommer höjas den 15e juli till 200kr
          </i>
          <p>
            När du anmäler sig till Hensmåla Triathlon som barn utför du de två
            grenarna simmning och löpning individuellt, men där grenarna är
            förkortade. För mer information om sträckorna och tävlingsregler kan
            du gå in{" "}
            <RRNavLink tag={RRNavLink} to="/om-ht/hem">
              HÄR
            </RRNavLink>
          </p>
          <b>
            Alla som deltar måste kunna simma 200m. Det är föräldrarnas ansvar
            att detta uppfylls.
          </b>
          <br></br>
          <br></br>
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

export default RegisterFormKids;
