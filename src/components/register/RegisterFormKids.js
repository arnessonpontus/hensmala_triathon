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

class RegisterForms extends Component {
  state = {
    name: "",
    email: "",
    year: "",
    month: "",
    day: "",
    info: "",
    city: "",
    gender: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false,
    isCheckboxThreeTicked: false,
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
    } else if (checkbox === 2) {
      this.setState({ isCheckboxTwoTicked: !this.state.isCheckboxTwoTicked });
    } else {
      this.setState({
        isCheckboxThreeTicked: !this.state.isCheckboxThreeTicked,
      });
    }
  };

  render() {
    return (
      <Row>
        <Col style={{ marginTop: "5vh" }} md={6}>
          <Form
            onSubmit={(e) => this.props.handleSubmit(e, "kids", this.state)}
          >
            <h3>Anmälan Barn</h3>
            <FormGroup>
              <Label for="name">Barnets namn</Label>
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
              <Label for="email">Barnets epost (valfritt)</Label>
              <Input
                required={false}
                type="email"
                name="email"
                id="email"
                placeholder="din.email@gmail.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthdayID">Barnets födelsedatum</Label>
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
              <Label for="genderSelection">Barnets kön</Label>
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
              <Label for="info">Information</Label>
              <Input
                type="textarea"
                name="info"
                id="info"
                placeholder=""
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
              style={{ minWidth: "140px" }}
              disabled={
                !(
                  this.state.isCheckboxOneTicked &&
                  this.state.isCheckboxTwoTicked &&
                  this.state.isCheckboxThreeTicked
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
          <h3>Nyhet! Intresseanmälan för dig upp till 15 år</h3>

          <p>
            Detta är en intresseanmälan till Hensmåla Triathlon 2021. När du
            anmäler sig till Hensmåla Triathlon som barn utför du de två
            grenarna simning och löpning individuellt, men där grenarna är
            förkortade. För mer information om sträckorna och tävlingsregler kan
            du gå in{" "}
            <RRNavLink tag={RRNavLink} to="/om-ht/hem">
              HÄR
            </RRNavLink>
            .
          </p>
          <b>
            Alla som deltar måste kunna simma 200m. Det är föräldrarnas ansvar
            att detta uppfylls.
          </b>
          <br></br>
          <br></br>
          <p>
            När vi vet närmare om evenemanget kommer bli av kommer yttligare
            information skickas ut via mail till alla deltagare för att kolla om
            intresset fortfarande är kvar för att delta.
          </p>
          <b>
            Fotografering och videofilmning kommer att förekomma, meddela om du
            inte vill vara med.
          </b>
          <br></br>
          <br></br>
          <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
          <i style={{ fontSize: 12 }}>Startavgift: 100kr</i>
        </Col>
      </Row>
    );
  }
}

export default RegisterForms;
