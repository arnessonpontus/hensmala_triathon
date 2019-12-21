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

class RegisterFormKids extends Component {
  state = {
    nameKID: "",
    emailKID: "",
    birthdayKID: "",
    infoKID: "",
    cityKID: "",
    sexKID: "",
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

  toggleConsent = () => {
    this.setState({ isButtonDisabled: !this.state.isButtonDisabled });
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
                required="true"
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
                required="true"
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
                required="true"
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
                required="true"
                type="select"
                name="sexKID"
                id="sexSelectionKID"
                onChange={this.handleChange}
              >
                <option></option>
                <option>Man</option>
                <option>Kvinna</option>
              </Input>
              <FormText>Du kommer tävla mot de med samma kön</FormText>
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
              <Label for="infoKID">Information</Label>
              <Input
                type="textarea"
                name="infoKID"
                id="infoKID"
                placeholder="Jag skulle vilja..."
                value={this.state.infoKID}
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
          <h3>Anmäl dig för de lite kortare sträckorna</h3>
          <p>
            När du anmäler sig till Hensmåla Triathlon som barn utför du alla
            tre grenar individuellt, men där alla grenar är förkortade. För mer
            information om sträckorna och regler kan du gå in HÄR.
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

export default RegisterFormKids;
