import React, { Component } from "react";
import RegSuccess from "./RegSuccess";
import { Container } from "reactstrap";
import RegisterFormSolo from "./RegisterFormSolo";
import RegisterFormTeam from "./RegisterFormTeam";
import classnames from "classnames";

class Register extends Component {
  state = {
    hasRegisterd: false,
    loading: false,
    activeTab: 0
  };

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendRegistration = this.sendRegistration.bind(this);
    this.toggleDoneRegistration = this.toggleDoneRegistration.bind(this);
  }

  toggleDoneRegistration = (e) => {
    this.setState({ hasRegisterd: !this.state.hasRegisterd });
  };

    // Stringify the shirt selection for easier storage
    shirtArrayToString = (shirts) => {
      let shirtStr = ""
      let numConverted = 0;
      shirts.forEach((shirt) => {
        if (shirt.size !== null && shirt.amount !== null) {
          if (numConverted++ === 0) {
            shirtStr += shirt.amount + shirt.size;
          } else {
            shirtStr += ", " + shirt.amount + shirt.size;
          }
        }
      });
      return shirtStr;
    }

  sendRegistration = (formType, data) => {
    fetch(`/.netlify/functions/writeToSpreadsheet/?type=${formType}`, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then((res) => {
        if (res.status === 200) {
          this.toggleDoneRegistration();
        } else {
          alert(
            "Kunde inte slutföra anmälan. Försök igen eller kontakta hensmalatriathlon@gmail.com."
          );
        }
      })
      .catch((error) => alert(error))
      .finally(() => this.setState({ loading: false }));
  };

  handleSubmit = (e, formType, data, totalToPay) => {
    e.preventDefault();
    this.setState({ loading: true });

    // Deep copy and replace shirts array to string for easier handling
    const dataToSend = JSON.parse(JSON.stringify(data));
    dataToSend.shirts = this.shirtArrayToString(dataToSend.shirts);

    // Add total cost to easier see correct payment has been made
    dataToSend["totalToPay"] = totalToPay;

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
                    this.sendRegistration(formType, dataToSend);
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
      <Container>
        {!this.state.hasRegisterd ? (
          <div className="card-box" style={{ marginTop: 40 }}>
            <div className="register-tabs">
              <div onClick={() => this.setState({ activeTab: 0 })} className="register-tab">
                Individuell
              </div>
              <div onClick={() => this.setState({ activeTab: 1 })} className="register-tab">
                Lag
              </div>
              <div className={classnames("tab-underline", {second: this.state.activeTab === 1})}></div>
            </div>
            {
              this.state.activeTab === 0 ?
                <RegisterFormSolo
                  handleSubmit={this.handleSubmit}
                  loading={this.state.loading}
                />
                :
                <RegisterFormTeam
                  handleSubmit={this.handleSubmit}
                  loading={this.state.loading}
                />
            }
          </div>
        ) : (
          <RegSuccess toggleDoneRegistration={this.toggleDoneRegistration} />
        )}
      </Container>
    );
  }
}
export default Register;
