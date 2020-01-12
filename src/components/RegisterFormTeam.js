import React, { Component } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody
} from "reactstrap";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class RegisterFormTeam extends Component {
  state = {
    teamName: "",
    email1: "",
    birthday1: "",
    city1: "",
    email2: "",
    birthday2: "",
    city2: "",
    email3: "",
    birthday3: "",
    city3: "",
    info: "",
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
      body: encode({ "form-name": "registerTeam", ...this.state })
    })
      .then(() => this.props.handleRegistration())
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => {
    e.preventDefault();

    const name = e.target.name;
    let value = e.target.value;

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
            <h3>Anmälan Lag</h3>
            <FormGroup>
              <Label for="teamName">Lagnamn</Label>
              <Input
                required="true"
                type="text"
                name="teamName"
                id="teamName"
                placeholder="Gubbaflås"
                value={this.state.teamName}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Label for="teamMember1">Lagmedlem 1</Label>
            <Card id="teamMember1" style={{ backgroundColor: "#dfeff0" }}>
              <CardBody>
                <FormGroup>
                  <Label for="email1">Epost</Label>
                  <Input
                    required="true"
                    type="email"
                    name="email1"
                    id="email1"
                    placeholder="din.email@gmail.com"
                    value={this.state.email1}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="birthdayID1">Födelsedatum</Label>
                  <Input
                    required="true"
                    type="date"
                    name="birthday1"
                    id="birthday1"
                    placeholder="date placeholder"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city1"> Ort (klubb)</Label>
                  <Input
                    type="text"
                    name="city1"
                    id="city1"
                    placeholder="Hensmåla löparförening"
                    value={this.state.city1}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </CardBody>
            </Card>
            <Label className="mt-4" for="teamMember1">
              Lagmedlem 2
            </Label>
            <Card id="teamMember1" style={{ backgroundColor: "#cee7e9" }}>
              <CardBody>
                <FormGroup>
                  <Label for="email2">Epost</Label>
                  <Input
                    required="true"
                    type="email"
                    name="email2"
                    id="email2"
                    placeholder="din.email@gmail.com"
                    value={this.state.email2}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="birthdayID2">Födelsedatum</Label>
                  <Input
                    required="true"
                    type="date"
                    name="birthday2"
                    id="birthday2"
                    placeholder="date placeholder"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city2"> Ort (klubb)</Label>
                  <Input
                    type="text"
                    name="city2"
                    id="city2"
                    placeholder="Hensmåla löparförening"
                    value={this.state.city2}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </CardBody>
            </Card>
            <Label className="mt-4" for="teamMember1">
              Lagmedlem 3
            </Label>
            <Card id="teamMember1" style={{ backgroundColor: "#b6dcdf" }}>
              <CardBody>
                <FormGroup>
                  <Label for="email3">Epost</Label>
                  <Input
                    type="email"
                    name="email3"
                    id="email3"
                    placeholder="din.email@gmail.com"
                    value={this.state.email3}
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="birthdayID3">Födelsedatum</Label>
                  <Input
                    type="date"
                    name="birthday3"
                    id="birthday3"
                    placeholder="date placeholder"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city3"> Ort (klubb)</Label>
                  <Input
                    type="text"
                    name="city3"
                    id="city3"
                    placeholder="Hensmåla löparförening"
                    value={this.state.city3}
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </CardBody>
            </Card>

            <FormGroup>
              <Label className="mt-4" for="info">
                Information
              </Label>
              <Input
                type="textarea"
                name="info"
                id="info"
                placeholder="Vi skulle vilja..."
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
              Anmäl oss!
            </Button>
          </Form>
        </Col>
        <Col style={{ marginTop: "5vh" }}>
          <h3>Anmäl er som Lag</h3>
          <b>Startavgift: 500kr </b>
          <i style={{ fontSize: 12 }}>
            Priset kommer höjas den 30e juni till 600kr
          </i>
          <p>
            När ni anmäler er som lag får sträckorna delas upp inom laget. Detta
            kan innebära att ni är tre som deltar där alla kör en gren var.
            Eller innefattar laget endast två personer och en person kör två av
            grenarna. För mer information om sträckorna och regler kan du gå in
            HÄR.
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

export default RegisterFormTeam;
