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
  CardBody,
  Spinner,
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "./Consent";
import { DayPicker, MonthPicker, YearPicker } from "../FormUtils";

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
            onSubmit={(e) => this.props.handleSubmit(e, "team", this.state)}
          >
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
                    <YearPicker
                      handleChange={this.handleChange}
                      elemName="year1"
                    />
                    <MonthPicker
                      handleChange={this.handleChange}
                      elemName="month1"
                    />
                    <DayPicker
                      handleChange={this.handleChange}
                      elemName="day1"
                    />
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
                    <YearPicker
                      handleChange={this.handleChange}
                      elemName="year2"
                    />
                    <MonthPicker
                      handleChange={this.handleChange}
                      elemName="month2"
                    />
                    <DayPicker
                      handleChange={this.handleChange}
                      elemName="day2"
                    />
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
                    required={false}
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
                    <YearPicker
                      handleChange={this.handleChange}
                      elemName="year3"
                    />
                    <MonthPicker
                      handleChange={this.handleChange}
                      elemName="month3"
                    />
                    <DayPicker
                      handleChange={this.handleChange}
                      elemName="day3"
                    />
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
        </Col>
        <Col style={{ marginTop: "5vh" }}>
          <h3>Intresseanmäl er som Lag</h3>
          <b>
            Detta är en intresseanmälan till Hensmåla Triathlon 2021. Du behöver
            inte betala i samband med denna intresseanmälan.
          </b>
          <br></br>
          <br></br>
          <p>
            När ni anmäler er som lag får sträckorna delas upp inom laget. Detta
            kan innebära att ni är tre som deltar där alla kör en gren var.
            Eller innefattar laget endast två personer och en person kör två av
            grenarna. För mer information om sträckorna och tävlingsregler kan
            du gå in{" "}
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
          <i style={{ fontSize: 12 }}>Startavgift: 500kr</i>
        </Col>
      </Row>
    );
  }
}

export default RegisterFormTeam;
