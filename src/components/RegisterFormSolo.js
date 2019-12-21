import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormText
} from "reactstrap";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class RegisterFormSolo extends Component {
  state = {
    name: "",
    email: "",
    birthday: "",
    info: "",
    city: "",
    sex: "",
    isButtonDisabled: true
  };

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "registerSolo", ...this.state })
    })
      .then(() => this.props.handleRegistration())
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => {
    e.preventDefault();

    const name = e.target.name;
    let value = e.target.value;

    if (e.target.name === "sexSOLO") {
      let element = document.getElementById("sexSelectionSOLO");
      value = element.options[element.selectedIndex].value;
    }

    this.setState({ [name]: value });
  };

  toggleConsent = () => {
    this.setState({ isButtonDisabled: !this.state.isButtonDisabled });
  };

  render() {
    return (
      <Row>
        <Col style={{ marginTop: "5vh" }} md={6}>
          <Form onSubmit={this.handleSubmit}>
            <h3>Anmälan Individuell</h3>
            <FormGroup>
              <Label for="name">Namn</Label>
              <Input
                required="true"
                type="text"
                name="name"
                id="nameSOLO"
                placeholder="Förnamn Efternamn"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Epost</Label>
              <Input
                required="true"
                type="email"
                name="email"
                id="emailSOLO"
                placeholder="din.email@gmail.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="birthdayID">Födelsedatum</Label>
              <Input
                required="true"
                type="date"
                name="birthday"
                id="birthdaySOLO"
                placeholder="date placeholder"
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="sexSelection">Kön</Label>
              <Input
                required="true"
                type="select"
                name="sex"
                id="sexSelectionSOLO"
                onChange={this.handleChange}
              >
                <option></option>
                <option>Man</option>
                <option>Kvinna</option>
              </Input>
              <FormText>Du kommer tävla mot de med samma kön</FormText>
            </FormGroup>

            <FormGroup>
              <Label for="city"> Ort (klubb)</Label>
              <Input
                type="text"
                name="city"
                id="citySOLO"
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
                id="infoSOLO"
                placeholder="Jag skulle vilja..."
                value={this.state.info}
                onChange={this.handleChange}
              />
            </FormGroup>
            <FormGroup check>
              <Label check>
                <Input type="checkbox" onClick={this.toggleConsent} /> Jag
                accepterar att Hensmåla Triathlon sparar data om mig
              </Label>
            </FormGroup>
            <Button className="mt-4" disabled={this.state.isButtonDisabled}>
              Anmäl mig!
            </Button>
          </Form>
        </Col>
        <Col style={{ marginTop: "5vh" }}>
          <h3>Anmäl dig som indiviuell deltagare</h3>
          <p>
            När du anmälder sig som indiviuell deltagare utför du alla tre
            grenar individuellt. För mer information om sträckorna och regler
            kan du gå in HÄR.
          </p>
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
        </Col>
      </Row>
    );
  }
}

export default RegisterFormSolo;
