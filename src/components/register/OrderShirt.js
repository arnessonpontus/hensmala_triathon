import React, { Component } from "react";
import {
    Form,
    FormGroup,
    Label,
    Input,
    Col,
    Container,
    Row,
    Button,
    Spinner
  } from "reactstrap";
import ShirtSelect from "./ShirtSelect";
import ExtraDonation from "./ExtraDonation";
import Consent from "../Consent";
import { shirtArrayToString } from "./Utils"
import RegSuccess from "./RegSuccess";

const SHIRT_PRICE = 250;

class OrderShirt extends Component {
    state = {
        loading: false,
        name: "",
        email: "",
        extraDonation: 0,
        shirts: [],
        info: "",
        consent: false,
        hasOrderd: false
    }

    calcTotalCost = () => {
        return this.state.extraDonation + this.state.shirts.reduce((prevVal, shirt) => prevVal + (shirt.size && shirt.amount ? shirt.amount : 0), 0) * SHIRT_PRICE;
    }

    handleChange = (e) => {
        e.preventDefault();
    
        const name = e.target.name;
        let value = e.target.value;
    
        this.setState({ [name]: value });
    };

    // Checks if at lease on shirt is selected
    isShirtSelected = () => {
        for (let shirt of this.state.shirts) {
            if (shirt.size !== null && shirt.amount !== null){
                return true;
            }
        }
        return false
    }

    toggleDone = (e) => {
      this.setState({ hasOrderd: !this.state.hasOrderd });
    };

    // TODO: Extract to other file
    sendOrder = (type, data) => {
        fetch(`/.netlify/functions/writeToSpreadsheet/?type=${type}`, {
          method: "POST",
          body: JSON.stringify(data),
        })
          .then((res) => {
            if (res.status === 200) {
              this.toggleDone();
              this.setState({});
            } else {
              alert(
                "Kunde inte slutföra anmälan. Försök igen eller kontakta hensmalatriathlon@gmail.com."
              );
            }
          })
          .catch((error) => alert(error))
          .finally(() => this.setState({ loading: false }));
      };

    // TODO: Extract to other file
    handleSubmit = (e, type, data, totalToPay) => {
        e.preventDefault();
        this.setState({ loading: true });
    
        // Deep copy and replace shirts array to string for easier handling
        const dataToSend = JSON.parse(JSON.stringify(data));
        dataToSend.shirts = shirtArrayToString(dataToSend.shirts);
    
        // Add total cost to easier see correct payment has been made
        dataToSend["totalToPay"] = totalToPay;
        delete dataToSend.loading;

        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute("6LcKIqQZAAAAAK88TdJkAsZAOZ4YLSf7VFqtXMNz", {
              action: "submit",
            })
            .then((token) => {
              fetch(`/.netlify/functions/handleRecaptcha/`, {
                method: "POST",
                body: JSON.stringify(token),
              })
                .then((res) => {
                  if (res.status === 200) {
                    res.json().then((res) => {
                      if (res.data.score > 0.5) {
                        this.sendOrder(type, dataToSend);
                      } else {
                        alert("Är du en robot? Testa igen.");
                        this.setState({ loading: false });
                      }
                    });
                  } else {
                    alert("Något gick fel.");
                    this.setState({ loading: false });
                  }
                })
                .catch((err) => {
                  this.setState({ loading: false });
                  console.log(err);
                });
            });
        });
      };

    render() {
        return (
            <Container style={{display: "flex", justifyContent: "center", minHeight: "90vh"}}>
              {!this.state.hasOrderd ? (
                <div className="card-box" style={{ marginTop: 40, width: "90%" }}>
                <Row>
                    <Col style={{ marginTop: "2vh" }} md={6}>
                        <h3>Beställ tshirt</h3>
                        <b>Kostnad {SHIRT_PRICE}kr</b>
                        <p>Vill du inte delta i årets lopp men ändå ha en superfin tshirt från Hensmåla Triathlon? Gör då en beställning på tshirt här och var med och stöd ALS-forskningen!</p>

                        <p>Betalning görs via swish på nummret <b>1234048781</b> (eller scanna QR-koden), när vi ser din beställning och verifierar att betalningen kommit in lägger vi undan dina tshirts.</p>
                        <p>Upphämtning görs på plats i Hensmåla via dig själv eller någon bekant, vi skickar alltså tyvärr inte tshirtarna.</p>

                        <p>Donera gärna en extra slant on du känner för det! Isåfall lägger du enkelt till det i din swish-betalning.</p>
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
                        <Form onSubmit={(e) => this.handleSubmit(e, "tshirt_order", this.state, this.calcTotalCost())}>
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
                                <Label for="totalAmountToPay">Totalt att betala:</Label>
                                <h5>{this.calcTotalCost()}kr</h5>
                            </FormGroup>
                            <FormGroup check>
                                <Label for="checkbox1">
                                <Input
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
                            <Button
                                className="mt-4"
                                style={{ minWidth: "140px" }}
                                disabled={!(this.state.consent && this.isShirtSelected()) || this.state.loading}
                            >
                            {this.state.loading ? (
                                <Spinner size="sm" color="info" />
                            ) : (
                                "Beställ!"
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
                </Row>
            </div>
              ) : (
                <RegSuccess type="order" toggleDone={this.toggleDone} />
              )}
            </Container>
        )
    }
}

export default OrderShirt;
