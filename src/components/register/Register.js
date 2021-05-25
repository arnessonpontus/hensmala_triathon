import React, { Component } from "react";
import RegSuccess from "./RegSuccess";

import { Container } from "reactstrap";
import RegisterForm2021 from "./RegisterForm2021";

class Register extends Component {
  state = {
    hasRegisterd: false,
    loading: false,
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
            "Kunde inte slutföra anmälan. Försök igen eller kontakta hensmaltriathlon@gmail.com."
          );
        }
      })
      .catch((error) => alert(error))
      .finally(() => this.setState({ loading: false }));
  };

  handleSubmit = (e, formType, data) => {
    e.preventDefault();
    this.setState({ loading: true });

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
                    this.sendRegistration(formType, data);
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
          <div className="card-box" style={{ marginTop: 20 }}>
            <div>
              <RegisterForm2021
                handleSubmit={this.handleSubmit}
                loading={this.state.loading}
              />
            </div>
          </div>
        ) : (
          <RegSuccess toggleDoneRegistration={this.toggleDoneRegistration} />
        )}
      </Container>
    );
  }
}
export default Register;
