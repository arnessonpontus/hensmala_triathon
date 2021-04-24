import React, { Component } from "react";
import RegisterFormSolo from "./RegisterFormSolo";
import RegisterFormTeam from "./RegisterFormTeam";
import RegisterFormKids from "./RegisterFormKids";
import RegSuccess from "./RegSuccess";
import classnames from "classnames";

import {
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

class Register extends Component {
  state = {
    hasRegisterd: false,
    activeTab: "1",
    loading: false,
  };

  constructor(props) {
    super(props);

    this.changeTab = this.changeTab.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDoneRegistration = this.toggleDoneRegistration.bind(this);
  }

  changeTab = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  toggleDoneRegistration = (e) => {
    this.setState({ hasRegisterd: !this.state.hasRegisterd });
  };

  handleSubmit = (e, formType, data) => {
    e.preventDefault();
    this.setState({ loading: true });

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

  render() {
    return (
      <Container>
        {!this.state.hasRegisterd ? (
          <div className="card-box">
            <div>
              <Nav tabs>
                <NavItem>
                  <NavLink
                    className={classnames({
                      tabLink: true,
                      active: this.state.activeTab === "1",
                    })}
                    onClick={() => {
                      this.changeTab("1");
                    }}
                  >
                    Indivuduell
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      tabLink: true,
                      active: this.state.activeTab === "2",
                    })}
                    onClick={() => {
                      this.changeTab("2");
                    }}
                  >
                    Lag
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      tabLink: true,
                      active: this.state.activeTab === "3",
                    })}
                    onClick={() => {
                      this.changeTab("3");
                    }}
                  >
                    Barn
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={this.state.activeTab}>
                <TabPane tabId="1">
                  <RegisterFormSolo
                    handleSubmit={this.handleSubmit}
                    loading={this.state.loading}
                  />
                </TabPane>

                <TabPane tabId="2">
                  <RegisterFormTeam
                    handleSubmit={this.handleSubmit}
                    loading={this.state.loading}
                  />
                </TabPane>
                <TabPane tabId="3">
                  <RegisterFormKids
                    handleSubmit={this.handleSubmit}
                    loading={this.state.loading}
                  />
                </TabPane>
              </TabContent>
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
