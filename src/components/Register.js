import React, { Component } from "react";
import RegisterFormSolo from "./RegisterFormSolo";
import RegisterFormTeam from "./RegisterFormTeam";
import RegisterFormKids from "./RegisterFormKids";
import RegSuccess from "./RegSuccess";
import classnames from "classnames";
import {
  Container,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";

class Register extends Component {
  // TODO: Form validation
  state = {
    hasRegisterd: false,
    activeTab: "1",
  };

  constructor(props) {
    super(props);

    this.handleRegistration = this.handleRegistration.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab = (tab) => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  handleRegistration = (e) => {
    this.setState({ hasRegisterd: !this.state.hasRegisterd });
  };

  render() {
    return (
      <Container>
        {!this.state.hasRegisterd ? (
          <Card className="mt-5">
            <CardBody>
              <div
                style={{
                  minHeight: "50vh",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h1>Anmälan är för närvarande stängd. Avvaktar beslut.</h1>
              </div>
              {/* 
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
                      handleRegistration={this.handleRegistration}
                    />
                  </TabPane>

                  <TabPane tabId="2">
                    <RegisterFormTeam
                      handleRegistration={this.handleRegistration}
                    />
                  </TabPane>
                  <TabPane tabId="3">
                    <RegisterFormKids
                      handleRegistration={this.handleRegistration}
                    />
                  </TabPane>
                </TabContent>
              </div>
              */}
            </CardBody>
          </Card>
        ) : (
          <RegSuccess handleRegistration={this.handleRegistration} />
        )}
      </Container>
    );
  }
}
export default Register;
