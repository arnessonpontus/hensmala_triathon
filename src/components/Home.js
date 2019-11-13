import React, { Component } from "react";
import * as firebase from "firebase";

const encode = data => {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
};

class Home extends Component {
  state = {
    name: "",
    email: "",
    birthday: "",
    info: "",
    city: "",
    hasPayed: "",
    isAnmald: false
  };

  constructor(props) {
    super(props);

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "register", ...this.state })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));

    e.preventDefault();
  };

  handleChange = e => this.setState({ [e.target.name]: e.target.value });
  /*
  handleInputChange = e => {
    //const input = document.querySelector(".nameInput");
    //input.setAttribute("style", "background-color: gray;");
    e.preventDefault();

    const name = e.target.name;
    let value = e.target.value;

    if (e.target.name === "sex") {
      console.log(e.target.name);

      var element = document.getElementById("sexSelection");
      value = element.options[element.selectedIndex].value;
    }

    this.setState({ [name]: value });
  };
  

  handleSubmit = e => {
    e.preventDefault();

    var now = new Date();
    var date =
      now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate();
    var time = now.getHours() + ":" + now.getMinutes() + ":" + now.getSeconds();
    var dateTime = date + " " + time;

    firebase
      .database()
      .ref("/registrations")
      .push({
        name: this.state.name,
        email: this.state.email,
        birthday: this.state.birthday,
        sex: this.state.sex,
        city: this.state.city,
        info: this.state.info,
        hasPayed: "Nej",
        time: dateTime
      })
      .then(
        this.setState({
          name: "",
          email: "",
          birthday: "",
          sex: "",
          city: "",
          info: ""
        }),
        this.setState({ isAnmald: true })
      );
  };
  */

  render() {
    if (this.state.isAnmald === false) {
      return (
        <div className="home">
          <h1>HENSMÅLA TRIATHLON 2020</h1>
          <h3>Anmälan</h3>
          <form onSubmit={this.handleSubmit}>
            <label>
              Namn:
              <br />
              <input
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Epost:
              <br />
              <input
                type="text"
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Födelsedatum:
              <br />
              <input
                type="text"
                name="birthday"
                value={this.state.birthday}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Ort(klubb):
              <br />
              <input
                type="text"
                name="city"
                value={this.state.city}
                onChange={this.handleInputChange}
              />
            </label>
            <label>
              Information:
              <br />
              <input
                type="text"
                name="info"
                value={this.state.info}
                onChange={this.handleInputChange}
              />
            </label>
            <br />
            <br />
            <button type="submit">Send data!</button>
          </form>
        </div>
      );
    } else {
      return (
        <div className="home">
          <h1>HENSMÅLA TRIATHLON 2020</h1>
          <h3>TACK FÖR DIN ANMÄLAN</h3>
        </div>
      );
    }
  }
}

export default Home;
