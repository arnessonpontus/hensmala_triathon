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

  render() {
    return (
      <Row>
        <Col style={{ marginTop: "5vh" }} md={6}>
          <Form
            onSubmit={(e) => this.props.handleSubmit(e, "solo", this.state)}
          >
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
              style={{ minWidth: "140px" }}
              disabled={
                !(
                  this.state.isCheckboxOneTicked &&
                  this.state.isCheckboxTwoTicked
                )
              }
            >
              {this.props.loading ? (
                <Spinner size="sm" color="info" />
              ) : (
                "Anmäl mig!"
              )}
            </Button>
          </Form>
        </Col>
        <Col style={{ marginTop: "5vh" }}>
          <h3>Intresseanmäl dig som indiviuell deltagare</h3>
          <b>
            Detta är en intresseanmälan till Hensmåla Triathlon 2021. Du behöver
            inte betala i samband med denna intresseanmälan.
          </b>
          <br></br>
          <br></br>

          <p>
            När du anmäler sig som indiviuell deltagare utför du alla tre grenar
            individuellt. För mer information om sträckorna och tävlingsregler
            kan du gå in{" "}
            <RRNavLink tag={RRNavLink} to="/om-ht/hem">
              HÄR
            </RRNavLink>
            .
          </p>
          <p>
            När vi vet närmare om evenemanget kommer bli av kommer yttligare
            information skickas ut via mail till alla deltagare för att kolla om
            intresset fortfarande är kvar för att delta.
          </p>
          <b>
            Fotografering och videofilmning förekommer, meddela om du inte vill
            vara med.
          </b>
          <br></br>
          <br></br>
          <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
          <i style={{ fontSize: 12 }}>Startavgift: 300kr</i>
        </Col>
      </Row>
    );
  }
}

export default RegisterFormSolo;
