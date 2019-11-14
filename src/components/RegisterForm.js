import React, { Component } from "react";

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
      .then(() => this.props.handleRegSuccess())
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
      <div className="home">
        <h3>Anmälan</h3>
        <form className="registrationForm" onSubmit={this.handleSubmit}>
          <label>
            Namn:
            <br />
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Epost:
            <br />
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Födelsedatum:
            <br />
            <input
              type="text"
              name="birthday"
              value={this.state.birthday}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Ort(klubb):
            <br />
            <input
              type="text"
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Information:
            <br />
            <input
              type="text"
              name="info"
              value={this.state.info}
              onChange={this.handleChange}
            />
          </label>
          <br />
          <br />
          <button type="submit">Send data!</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
