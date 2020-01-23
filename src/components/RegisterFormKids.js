import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class RegisterFormKids extends Component {
  state = {
    nameKID: "",
    emailKID: "",
    birthdayKID: "",
    infoKID: "",
    cityKID: "",
    sexKID: "",
    guardianName: "",
    guardianPhone: "",
    guardianEmail: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "registerKids", ...this.state })
    })
      .then(() => this.props.handleRegistration())
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => {
    e.preventDefault();

    const name = e.target.name;
    let value = e.target.value;

    if (e.target.name === "sexKID") {
      let element = document.getElementById("sexSelectionKID");
      value = element.options[element.selectedIndex].value;
    }

    this.setState({ [name]: value });
  };

  toggleConsent = checkbox => {
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
          <Form onSubmit={this.handleSubmit}>
            <h3>Anmälan Barn</h3>
            <FormGroup>
              <Label for="nameKID">Namn</Label>
              <Input
                required={true}
                type="text"
                name="nameKID"
                id="nameKID"
                placeholder="Förnamn Efternamn"
                value={this.state.nameKID}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="emailKID">Epost</Label>
              <Input
                required={true}
                type="emailKID"
                name="emailKID"
                id="emailKID"
                placeholder="din.email@gmail.com"
                value={this.state.emailKID}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthdayIDKID">Födelsedatum</Label>
              <Input
                required={true}
                type="date"
                name="birthdayKID"
                id="birthdayIDKID"
                placeholder="date placeholder"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="sexSelectionKID">Kön</Label>
              <Input
                required={true}
                type="select"
                name="sexKID"
                id="sexSelectionKID"
                onChange={this.handleChange}
              >
                <option></option>
                <option>Man</option>
                <option>Kvinna</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="cityKID"> Ort (klubb)</Label>
              <Input
                type="text"
                name="cityKID"
                id="cityKID"
                placeholder="Hensmåla löparförening"
                value={this.state.cityKID}
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
                placeholder="Lars Svensson"
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
                placeholder="0704554432"
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
                placeholder="lars.svensson@gmail.com"
                value={this.state.guardianEmail}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="infoKID">Information</Label>
              <Input
                type="textarea"
                name="infoKID"
                id="infoKID"
                placeholder="t.ex. önskemål att starta i någon speciell
                startgrupp"
                value={this.state.infoKID}
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
              </Label>
            </FormGroup>
            <FormGroup check>
              <Label for="checkbox2">
                <Input
                  className="checkbox2"
                  type="checkbox"
                  onClick={() => this.toggleConsent(2)}
                />{" "}
                Jag kommer följa den information och de tävlingsregler som finns
                på denna sida.
              </Label>
            </FormGroup>
            <Button
              className="mt-4"
              disabled={
                !(
                  this.state.isCheckboxOneTicked &&
                  this.state.isCheckboxTwoTicked
                )
              }
            >
              Anmäl mig!
            </Button>
          </Form>
        </Col>
        <Col style={{ marginTop: "5vh" }}>
          <h3>Anmäl dig för de lite kortare sträckorna</h3>
          <b>Startavgift: 100kr </b>
          <i style={{ fontSize: 12 }}>
            Priset kommer höjas den 30e juni till 200kr
          </i>
          <p>
            När du anmäler sig till Hensmåla Triathlon som barn utför du alla
            tre grenar individuellt, men där alla grenar är förkortade. För mer
            information om sträckorna och regler kan du gå in{" "}
            <RRNavLink tag={RRNavLink} to="/AboutHT">
              HÄR
            </RRNavLink>
          </p>
          <b>
            Alla som deltar måste kunna simma 200m. Det är föräldrarnas ansvar
            att detta uppfylls.
          </b>
          <br></br>
          <br></br>
          <p>
            Hensmåla Triathlon har länge Lorem ipsum dolor sit amet, consectetur
            adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo
            consequat. Duis aute irure dolor in reprehenderit in voluptate velit
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident, sunt in culpa qui officia deserunt mollit
            anim id est laborum.
          </p>
          <b>
            Fotografering och videofilmning förekommer, meddela om du inte vill
            vara med.
          </b>
        </Col>
      </Row>
    );
  }
}

export default RegisterFormKids;
