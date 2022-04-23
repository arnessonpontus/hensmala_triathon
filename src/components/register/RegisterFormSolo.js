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
import ShirtSelect from "./ShirtSelect";
import ExtraDonation from "./ExtraDonation";
import { DayPicker, MonthPicker, YearPicker } from "../TimeUtils";
import RegisterButton from "./RegisterButton";
import { scrollToInfo } from './Utils';

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

  calcTotalCost = () => {
    if (process.env.REACT_APP_ALLOWED_COMPANY && process.env.REACT_APP_ALLOWED_COMPANY.toLowerCase() === this.state.city.toLowerCase()) {
      return this.state.extraDonation + this.state.shirts.reduce((prevVal, shirt, i) => prevVal + (i > 0 && shirt.size && shirt.type ? 1 : 0), 0) * SHIRT_PRICE;
    } else {
      return REGISTER_FEE + this.state.extraDonation + this.state.shirts.reduce((prevVal, shirt) => prevVal + (shirt.size && shirt.type ? 1 : 0), 0) * SHIRT_PRICE;
    }
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
              
              <div onClick={() => scrollToInfo("info-text")} className="scroll-to-info-btn">
                Visa info<i className="fas fa-angle-down angle-down"></i>
              </div>
            </div>
            <p>
              <b>
                <i>Sista dag för beställning av t-shirt är 23:e maj</i>
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
            {process.env.REACT_APP_ALLOWED_COMPANY && this.state.city.toLowerCase() === process.env.REACT_APP_ALLOWED_COMPANY.toLowerCase() ? 
            <div className="allowed-company-text-bg">
              <small>
              Du har anget <b style={{color: "#007fa8"}}>{process.env.REACT_APP_ALLOWED_COMPANY}</b> som klubb och får därför en t-shirt och anmälningsavgiften betald.
              </small>
            </div>
            : null}
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
                <Label for="shirt-select">Lägg till t-shirt ({SHIRT_PRICE}kr st)</Label>
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
                  id="checkbox1"
                  type="checkbox"
                  onClick={() => this.toggleConsent(1)}
                />{" "}
                Jag accepterar att Hensmåla Triathlon sparar data om mig.
                <Consent
                  buttonText="Vad betyder detta?"
                  title="Information om sparad data"
                />
              </Label>
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
          <h3>Anmäl dig till Hensmåla Triathlon 2022</h3>
          <b>Datum: 23 juli</b>
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
              Priset kommer höjas till {REGISTER_FEE+50}kr från och med 31:e maj.
            </i>
          </p>
        </Col>
      </Row>
    );
  }
}

export default RegisterFormSolo;
