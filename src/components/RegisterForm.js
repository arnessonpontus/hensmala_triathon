import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class RegisterForm extends Component {
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
      body: encode({ "form-name": "register", ...this.state })
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
      <Form onSubmit={this.handleSubmit}>
        <h3>Anmälan</h3>
        <FormGroup>
          <Label for="name">Namn</Label>
          <Input
            type="text"
            name="name"
            id="name"
            placeholder="Förnamn Efternamn"
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
    );
  }
}

export default RegisterForm;
