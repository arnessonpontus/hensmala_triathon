import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input, Row, Col } from "reactstrap";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class RegisterFormTeam extends Component {
  state = {
    name: "",
    email: "",
    birthday: "",
    info: "",
    city: ""
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
    /*
    if (e.target.name === "sex") {
      var element = document.getElementById("sexSelection");
      value = element.options[element.selectedIndex].value;
    }
*/
    this.setState({ [name]: value });
  };

  render() {
    return (
      <Row>
        <Col style={{ marginTop: "5vh" }} md={6}>
          <Form onSubmit={this.handleSubmit}>
            <h3>Anmälan Lag</h3>
            <FormGroup>
              <Label for="name">Namn</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Gubbaflås"
                value={this.state.name}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Epost</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="din.email@gmail.com"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <Label for="birthdayID">Födelsedatum</Label>
              <Input
                type="text"
                name="birthday"
                id="birthday"
                placeholder="1986-06-10"
                value={this.state.birthday}
                onChange={this.handleChange}
              />
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

            <FormGroup>
              <Label for="info">Information</Label>
              <Input
                type="textarea"
                name="info"
                id="info"
                placeholder="Jag skulle vilja..."
                value={this.state.info}
                onChange={this.handleChange}
              />
            </FormGroup>
            <Button>Amnäl mig!</Button>
          </Form>
        </Col>
        <Col style={{ marginTop: "5vh" }}>
          <h3>Anmäl er som Lag</h3>
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
