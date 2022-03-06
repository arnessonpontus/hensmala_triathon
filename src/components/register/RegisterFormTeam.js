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
  Card,
  CardBody,
  FormText
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "../Consent";
import ShirtSelect from "./ShirtSelect";
import ExtraDonation from "./ExtraDonation";
import { DayPicker, MonthPicker, YearPicker } from "../TimeUtils";

const SHIRT_PRICE = 250;
const REGISTER_FEE = 450;

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

  renderMemberFields = () => {
    return [1, 2, 3].map((num) => {
      return(
      <div style={{marginBottom: "20px"}}>
        <Label for={`teamMember${num}`}>Lagmedlem {num}</Label>
        {num === "3" ? <i> (Ej för lag med endast två deltagare)</i> : null} 
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
              <h3>Anmälan 2022 Lag</h3>
              <div onClick={this.scrollToInfo} className="scroll-to-info-btn">
                Visa info<i className="fas fa-angle-down angle-down"></i>
              </div>
            </div>

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
          <h3>Anmäl er som Lag</h3>
          <p>
            När ni anmäler er som lag får sträckorna delas upp inom laget. Detta
            kan innebära att ni är tre som deltar där alla kör en gren var.
            Eller innefattar laget endast två personer och en person kör två av
            grenarna. För mer information om sträckorna och tävlingsregler kan
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
            Du kommer få ett mail ett bekräftelse-email med din angiva information och{" "}
            <b>betalningsuppgifter</b> då anmälan är gjord. Betala gärna direkt i samband med anmälan. När tävlingen närmar
            sig kommer yttligare information skickas ut via mail till alla
            deltagare.
          </p>
          <br></br>
          <br></br>

          <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
          <b style={{ fontSize: 20 }}>Startavgift: {REGISTER_FEE}kr</b>
          <p>
            <i style={{ fontSize: 12 }}>
              Priset kommer höjas till 600 kr från och med 15:e juli.
            </i>
          </p>
        </Col>
      </Row>
    );
  }
}

export default RegisterFormTeam;
