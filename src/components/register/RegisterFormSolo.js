import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormText
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "../Consent";
import ExtraDonation from "./ExtraDonation";
import { DayPicker, MonthPicker, YearPicker } from "../TimeUtils";
import ShirtSelect from "./ShirtSelect";
import CapSelect from "./CapSelect";
import RegisterButton from "./RegisterButton";
import { scrollToInfo, calcShirtPrice, SHIRT_PRICE_COTTON, SHIRT_PRICE_FUNCTIONAL, CAP_PRICE } from './Utils';

const LATE_REGISTER_FEE = 400;
const REGISTER_FEE = LATE_REGISTER_FEE;

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
    numCaps: 0,
    extraDonation: 0
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
    } else if (checkbox === 2) {
      this.setState({ isCheckboxTwoTicked: !this.state.isCheckboxTwoTicked });
    } else {
      this.setState({
        isCheckboxThreeTicked: !this.state.isCheckboxThreeTicked,
      });
    }
  };

  isAllowedCompanyEntered = () => {
    return process.env.REACT_APP_ALLOWED_COMPANY && this.state.city.toLowerCase().includes(process.env.REACT_APP_ALLOWED_COMPANY.toLowerCase());
  }

  calcTotalCost = () => {
    if (this.isAllowedCompanyEntered()) {
      return this.state.extraDonation + Math.max(0, (calcShirtPrice(this.state.shirts) - SHIRT_PRICE_FUNCTIONAL)) + this.state.numCaps * CAP_PRICE;
    } 
    return REGISTER_FEE + this.state.extraDonation + calcShirtPrice(this.state.shirts) + this.state.numCaps * CAP_PRICE;
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
              <h3>Anmälan 2024 Individuell</h3>
              
              <div onClick={() => scrollToInfo("info-text")} className="scroll-to-info-btn">
                Visa info<i className="fas fa-angle-down angle-down"></i>
              </div>
            </div>
            <p>
              <b>
                <i>Sista dag för beställning av t-shirt och keps är 12:e juni</i>
              </b>
            </p>
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
            {this.isAllowedCompanyEntered() ? 
            <div className="allowed-company-text-bg">
              <small>
              Du har anget <b style={{color: "#007fa8"}}>{process.env.REACT_APP_ALLOWED_COMPANY}</b> som klubb och får därför en t-shirt och anmälningsavgiften betald.
              </small>
            </div>
            : null}
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
                <Label>Lägg till t-shirt (Bomull {SHIRT_PRICE_COTTON}kr, Funktion {SHIRT_PRICE_FUNCTIONAL}kr)</Label>
              <div className="clothes-select">
                <ShirtSelect updateShirtSelection={(newShirts) => this.setState({shirts: newShirts})}/>
              </div>
              <Label className="mt-2">Lägg till keps ({CAP_PRICE}kr)</Label>
              <div className="clothes-select">
                <CapSelect updateCapSelection={(numCaps) => this.setState({numCaps: numCaps})}/>
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
              <Label for="checkbox1" className="consent-checkbox">
                <Input
                  id="checkbox1"
                  type="checkbox"
                  onClick={() => this.toggleConsent(1)}
                />{" "}
                Jag accepterar att Hensmåla Triathlon sparar data om mig.
              </Label>
              <Consent
                buttonText="Vad betyder detta?"
                title="Information om sparad data"
              />
            </FormGroup>
            <FormGroup check>
              <Label for="checkbox2">
                <Input
                  id="checkbox2"
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
                  id="checkbox3"
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
          <RegisterButton
            text="Anmäl mig!" 
            disabled={
              !(
                this.state.isCheckboxOneTicked &&
                this.state.isCheckboxTwoTicked &&
                this.state.isCheckboxThreeTicked
              ) || this.props.loading
            }
            loading={this.props.loading}
          />
          </Form>
          <small>
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
            <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
            apply.
          </small>
        </Col>
        <Col id="info-text" style={{ marginTop: "2vh" }}>
          <hr className="register-divider"></hr>
          <h3>Anmäl dig till Hensmåla Triathlon 2024</h3>
          <b>Datum: 20 juli</b>
          <p>
            Ett motionslopp för alla, motionär som elit. Få en härlig dag i Hensmålas vackra natur med simning (340m), cykling (9.2km), löpning (6.5km) och samtidigt bidra till ALS-forskningen.
          </p>
          <p>
            När du anmälder sig som individuell deltagare utför du alla tre
            grenar på egen hand. För mer information om sträckorna och
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
            Du kommer få ett bekräftelse-email med din angiva information och{" "}
            <b>betalningsuppgifter</b> då anmälan är gjord. Betala gärna direkt i samband med anmälan. När tävlingen närmar
            sig kommer yttligare information skickas ut via mail till alla
            deltagare.
          </p>
          <p>Första start sker 15.00.</p>
          <b>
            Fotografering och videofilmning förekommer, meddela om du inte vill
            vara med.
          </b>
          <br></br>
          <br></br>
          <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
          <b style={{ fontSize: 20 }}>Startavgift: {REGISTER_FEE}kr</b>
        </Col>
      </Row>
    );
  }
}

export default RegisterFormSolo;
