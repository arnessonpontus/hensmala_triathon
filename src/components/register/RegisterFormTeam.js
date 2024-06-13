import React, { Component } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  FormText
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "../Consent";
import ShirtSelect from "./ShirtSelect";
import CapSelect from "./CapSelect";
import ExtraDonation from "./ExtraDonation";
import { DayPicker, MonthPicker, YearPicker } from "../TimeUtils";
import RegisterButton from "./RegisterButton";
import { scrollToInfo, calcShirtPrice, SHIRT_PRICE_COTTON, SHIRT_PRICE_FUNCTIONAL, CAP_PRICE} from './Utils';

const LATE_REGISTER_FEE = 700;
const REGISTER_FEE = LATE_REGISTER_FEE;

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
    return process.env.REACT_APP_ALLOWED_COMPANY && 
      (this.state.city1.toLowerCase().includes(process.env.REACT_APP_ALLOWED_COMPANY.toLowerCase()) ||
      this.state.city2.toLowerCase().includes(process.env.REACT_APP_ALLOWED_COMPANY.toLowerCase()) ||
      this.state.city3.toLowerCase().includes(process.env.REACT_APP_ALLOWED_COMPANY.toLowerCase()));
  }

  calcTotalCost = () => {
    if (this.isAllowedCompanyEntered()) {
      return this.state.extraDonation + calcShirtPrice(this.state.shirts) + this.state.numCaps * CAP_PRICE;
    } 
    return REGISTER_FEE + this.state.extraDonation + calcShirtPrice(this.state.shirts) + this.state.numCaps * CAP_PRICE;
  }

  renderMemberFields = () => {
    return [1, 2, 3].map((num) => {
      return(
      <div key={num} style={{marginBottom: "20px"}}>
        <Label for={`teamMember${num}`}>Lagmedlem {num}</Label>
        {num === 3 ? <i> (Ej för lag med endast två deltagare)</i> : null} 
        <i></i>
          <Card id={`teamMember${num}`} style={{ backgroundColor: `#dfeff${num*3}` }}>
            <CardBody>
              <FormGroup>
                <Label for={`name${num}`}>Namn*</Label>
                <Input
                  required={num !== 3}
                  type="text"
                  name={`name${num}`}
                  id={`name${num}`}
                  placeholder="Förnamn Efternamn"
                  value={this.state[`name${num}`]}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`email${num}`}>Epost*</Label>
                <Input
                  required={num !== 3}
                  type="email"
                  name={`email${num}`}
                  id={`email${num}`}
                  placeholder="din.email@gmail.com"
                  value={this.state[`email${num}`]}
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`birthdayID${num}`}>Födelsedatum*</Label>
                <div style={{ display: "flex" }}>
                  <YearPicker
                    required={num !== 3}
                    handleChange={this.handleChange}
                    elemName={`year${num}`}
                  />
                  <MonthPicker
                    required={num !== 3}
                    handleChange={this.handleChange}
                    elemName={`month${num}`}
                  />
                  <DayPicker
                    required={num !== 3}
                    handleChange={this.handleChange}
                    elemName={`day${num}`}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <Label for={`city${num}`}> Ort (klubb)</Label>
                <Input
                  type="text"
                  name={`city${num}`}
                  id={`city${num}`}
                  placeholder="Hensmåla löparförening"
                  value={this.state[`city${num}`]}
                  onChange={this.handleChange}
                />
              </FormGroup>
            </CardBody>
          </Card>
        </div>
        )
    })
  }
            

  render() {
    return (
      <Row>
        <Col style={{ marginTop: "2vh" }} md={6}>
          <Form
            onSubmit={(e) =>
              this.props.handleSubmit(e, "team", this.state, this.calcTotalCost())
            }
          >
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>Anmälan 2024 Lag</h3>
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
              <Label for="teamName">Lagnamn*</Label>
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
            {this.renderMemberFields()}
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
                <Label for="clothes-select">Lägg till t-shirt (Bomull {SHIRT_PRICE_COTTON}kr, Funktion {SHIRT_PRICE_FUNCTIONAL}kr)</Label>
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
              <Label for="checkbox1Team" className="consent-checkbox">
                <Input
                  id="checkbox1Team"
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
              <Label for="checkbox2Team">
                <Input
                  id="checkbox2Team"
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
              <Label for="checkbox3Team">
                <Input
                  id="checkbox3Team"
                  type="checkbox"
                  onClick={() => this.toggleConsent(3)}
                />{" "}
                Jag accepterar att bilder och filmer sparas och kan användas på
                internet.
              </Label>
            </FormGroup>
            {this.isAllowedCompanyEntered() ? 
            <div className="allowed-company-text-bg">
              <small>
              Du har anget <b style={{color: "#007fa8"}}>{process.env.REACT_APP_ALLOWED_COMPANY}</b> som klubb och får därför anmälningsavgiften betald.
              </small>
            </div>
            : null}
            <FormGroup>
              <Label for="totalAmountToPay">Totalt att betala:</Label>
              <h5>{this.calcTotalCost()}kr</h5>
            </FormGroup>
            <RegisterButton 
              id="submitButton"
              text="Anmäl oss!" 
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
          <h3>Anmäl er som Lag (2-3 pers.)</h3>
          <b>Datum: 20 juli</b>
          <p>
            När ni anmäler er som lag får sträckorna delas upp hur ni vill inom laget. Detta
            kan innebära att ni är tre personer som deltar där alla kör en gren var, eller ett lag med 2 personer där en av er kör 2 grenar. För mer information om sträckorna och tävlingsregler kan
            du gå in{" "}
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

export default RegisterFormTeam;
