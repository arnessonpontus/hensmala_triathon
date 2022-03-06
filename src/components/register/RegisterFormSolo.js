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
  FormText
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "../Consent";
import ShirtSelect from "./ShirtSelect";
import ExtraDonation from "./ExtraDonation";
import { DayPicker, MonthPicker, YearPicker } from "../TimeUtils";

const SHIRT_PRICE = 250;
const REGISTER_FEE = 250;

class RegisterFormSolo extends Component {
  state = {
    name: "",
    email: "",
    year: "",
    month: "",
    day: "",
    info: "",
    gender: "",
    city: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false,
    isCheckboxThreeTicked: false,
    shirts: [],
    extraDonation: 0
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

  calcTotalCost = () => {
    return REGISTER_FEE + this.state.extraDonation + this.state.shirts.reduce((prevVal, shirt) => prevVal + (shirt.size && shirt.amount ? shirt.amount : 0), 0) * SHIRT_PRICE;
  }

  render() {
    return (
      <Row>
        <Col style={{ marginTop: "2vh" }} md={6}>
          <Form
            onSubmit={(e) =>
              this.props.handleSubmit(e, "solo", this.state, this.calcTotalCost())
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Anmälan 2022 Individuell</h3>
              <div onClick={this.scrollToInfo} className="scroll-to-info-btn">
                Visa info<i className="fas fa-angle-down angle-down"></i>
              </div>
            </div>

            <FormGroup>
              <Label for="name">Namn*</Label>
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
              <Label for="email">Epost*</Label>
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
              <Label for="birthdayID">Födelsedatum*</Label>
              <div style={{ display: "flex" }}>
                <YearPicker 
                  reqired={true} 
                  handleChange={this.handleChange} 
                  elemName="year" />
                <MonthPicker
                  reqired={true}
                  handleChange={this.handleChange}
                  elemName="month"
                />
                <DayPicker 
                reqired={true} 
                handleChange={this.handleChange} 
                elemName="day" />
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="genderSelection">Kön*</Label>
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
            <FormGroup>
                <Label for="shirt-select">Lägg till tshirt ({SHIRT_PRICE}kr st)</Label>
              <div className="shirt-select">
                <ShirtSelect updateShirtSelection={(newShirts) => this.setState({shirts: newShirts})}/>
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="extra-donation">Extra donation till ALS-forskningen</Label>
              <ExtraDonation setDonation={(donationAmount) => this.setState({extraDonation: donationAmount})}/>
            </FormGroup>
            <FormGroup>
              <FormText color="bold">* obligatoriska fält.</FormText>
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
            <FormGroup>
              <Label for="totalAmountToPay">Totalt att betala:</Label>
              <h5>{this.calcTotalCost()}kr</h5>
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
          <h3>Anmäl dig som individuell deltagare</h3>      
          <p>
            När du anmälder sig som individuell deltagare utför du alla tre
            grenar individuellt. För mer information om sträckorna och
            tävlingsregler kan du gå in{" "}
            <RRNavLink 
              target="_blank"
              rel="noopener noreferrer" 
              tag={RRNavLink} 
              to="/om-ht/hem">
              HÄR
            </RRNavLink>.
          </p>
          <p>
            Du kommer få ett mail ett bekräftelse-email med din angiva information och{" "}
            <b>betalningsuppgifter</b> då anmälan är gjord. Betala gärna direkt i samband med anmälan. När tävlingen närmar
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
          <b style={{ fontSize: 20 }}>Startavgift: {REGISTER_FEE}kr</b>
          <p>
            <i style={{ fontSize: 12 }}>
              Priset kommer höjas till 400 kr från och med 15:e juli.
            </i>
          </p>
        </Col>
      </Row>
    );
  }
}

export default RegisterFormSolo;
