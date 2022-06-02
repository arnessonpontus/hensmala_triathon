import React, { Component } from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Container,
    Row,
    FormText,
  } from "reactstrap";
import ShirtSelect from "./ShirtSelect";
import ExtraDonation from "./ExtraDonation";
import Consent from "../Consent";
import { handleSubmit, isShirtSelected } from "./Utils"
import RegSuccess from "./RegSuccess";
import RegisterButton from "./RegisterButton";

const SHIRT_PRICE = 250;

class OrderShirt extends Component {
  defaultState = {
    loading: false,
    name: "",
    email: "",
    extraDonation: 0,
    shirts: [],
    info: "",
    consent: false,
    hasOrderd: false
  }
    state = {
        ...this.defaultState
    }

    componentDidMount() {
      window.scrollTo(0, 0);
    }

    calcTotalCost = () => {
      const shirtAmount = this.state.shirts.filter((shirt) => shirt.size && shirt.type).length;
      return this.state.extraDonation + shirtAmount * SHIRT_PRICE;
    }

    handleChange = (e) => {
        e.preventDefault();
    
        const name = e.target.name;
        let value = e.target.value;
    
        this.setState({ [name]: value });
    };

    toggleDone = () => {
      this.setState({hasOrderd: !this.state.hasOrderd});
    };

    resetState = () => {
      this.setState({...this.defaultState});
    }

    render() {
        return (
            <Container style={{display: "flex", justifyContent: "center", minHeight: "90vh"}}>
              {!this.state.hasOrderd ? (
                <div className="card-box" style={{ marginTop: 40, width: "90%" }}>
                <Row>
                    <Col style={{ marginTop: "2vh" }} md={6}>
                        <p>
                          <h3>
                            <i>Sista beställningsdag var 1:e juni!</i>
                          </h3>
                        </p>
                        <p>Kontakta oss om du har frågor.</p>
                        <b>Kostnad {SHIRT_PRICE}kr</b>
                        <p>Vill du inte delta i årets lopp men ändå ha en superfin t-shirt från Hensmåla Triathlon? Gör då en beställning här och var med och stöd ALS-forskningen!</p>

                        <p>Betalning görs via swish på nummret <b>1234048781</b> (eller scanna QR-koden), när vi ser din beställning och verifierar att betalningen kommit in lägger vi undan dina t-shirts.</p>
                        <p>Upphämtning görs på plats i Hensmåla via dig själv eller någon bekant, <b>vi skickar alltså tyvärr inte t-shirtarna.</b></p>

                        <p>Donera gärna en extra slant om du känner för det! Isåfall lägger du enkelt till det i din swish-betalning.</p>
                        <div style={{display: "flex", justifyContent: "center"}}>
                        <img
                            width="200px"
                            src="/images/qr_swish.svg"
                            alt="hensmala_triathlon"
                        />
                        </div>
                    </Col>
                    <Col style={{ marginTop: "2vh" }}>
                        <hr className="register-divider"></hr>
                        <Form onSubmit={(e) => handleSubmit(e, "tshirt_order", this.state, this.calcTotalCost(), (val) => this.setState({loading: val}), () => this.toggleDone())}>
                            <FormGroup>
                                <Label for="shirt-select">Välj antal och storlek</Label>
                                <div className="shirt-select">
                                    <ShirtSelect updateShirtSelection={(newShirts) => this.setState({shirts: newShirts})}/>
                                </div>
                            </FormGroup>
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
                                <Label for="name">Email*</Label>
                                <Input
                                    required={true}
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="din@email.com"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="extra-donation">Extra donation till ALS-forskningen</Label>
                                <ExtraDonation setDonation={(donationAmount) => this.setState({extraDonation: donationAmount})}/>
                            </FormGroup>
                            <FormGroup>
                            <Label for="info">Information</Label>
                            <Input
                              type="textarea"
                              name="info"
                              id="info"
                              placeholder="T.ex. info om upphämtning"
                              value={this.state.info}
                              onChange={this.handleChange}
                            />
                          </FormGroup>
                          <FormGroup>
                            <FormText color="bold">* obligatoriska fält.</FormText>
                          </FormGroup>
                            <FormGroup>
                                <Label for="totalAmountToPay">Totalt att betala:</Label>
                                <h5>{this.calcTotalCost()}kr</h5>
                            </FormGroup>
                            <FormGroup check>
                                <Label for="checkbox1">
                                  <Input
                                  id="checkbox1"
                                  className="checkbox1"
                                  type="checkbox"
                                  onClick={() => this.setState({consent: !this.state.consent})}
                                  />{" "}
                                  Jag accepterar att Hensmåla Triathlon sparar data om mig.
                                  <Consent
                                  buttonText="Vad betyder detta?"
                                  title="Information om sparad data"
                                  />
                                </Label>
                            </FormGroup>
                            <RegisterButton text="Beställning ej möjlig!" disabled={true} />
                        </Form>
                        <small>
                          This site is protected by reCAPTCHA and the Google{" "}
                          <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
                          <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
                          apply.
                        </small>
                    </Col>
                </Row>
            </div>
              ) : (
                <RegSuccess type="order" onGoBack={this.resetState} />
              )}
            </Container>
        )
    }
}

export default OrderShirt;
