import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import RegSuccess from "./RegSuccess";
import classnames from "classnames";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane
} from "reactstrap";

class Register extends Component {
  state = {
    hasRegisterd: false,
    activeTab: "1"
  };

  constructor(props) {
    super(props);

    this.handleRegistration = this.handleRegistration.bind(this);
    this.changeTab = this.changeTab.bind(this);
  }

  changeTab = tab => {
    if (this.state.activeTab !== tab) this.setState({ activeTab: tab });
  };

  handleRegistration = e => {
    this.setState({ hasRegisterd: !this.state.hasRegisterd });
  };

  render() {
    return (
      <Container>
        <Card className="mt-5">
          <CardBody>
            {!this.state.hasRegisterd ? (
              <div>
                <Nav tabs>
                  <NavItem>
                    <NavLink
                      className={classnames({
                        tabLink: true,
                        active: this.state.activeTab === "1"
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
                        active: this.state.activeTab === "2"
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
                        active: this.state.activeTab === "3"
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
                    <Row>
                      <Col style={{ marginTop: "5vh" }} md={6}>
                        <RegisterForm
                          typeOfRegister="individual"
                          handleRegistration={this.handleRegistration}
                        />
                      </Col>
                      <Col style={{ marginTop: "5vh" }}>
                        <h3>Om oss</h3>
                        <p>
                          Hensmåla Triathlon har länge Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut
                          enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non
                          proident, sunt in culpa qui officia deserunt mollit
                          anim id est laborum.
                        </p>
                        <p>
                          Hensmåla Triathlon har länge Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut
                          enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non
                          proident, sunt in culpa qui officia deserunt mollit
                          anim id est laborum.
                        </p>
                      </Col>
                    </Row>
                  </TabPane>

                  <TabPane tabId="2">
                    <Row>
                      <Col style={{ marginTop: "5vh" }} md={6}>
                        <RegisterForm
                          typeOfRegister="team"
                          handleRegistration={this.handleRegistration}
                        />
                      </Col>
                      <Col style={{ marginTop: "5vh" }}>
                        <h3>Om Dig</h3>
                        <p>
                          Hensmåla Triathlon har länge Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut
                          enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non
                          proident, sunt in culpa qui officia deserunt mollit
                          anim id est laborum.
                        </p>
                        <p>
                          Hensmåla Triathlon har länge Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut
                          enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non
                          proident, sunt in culpa qui officia deserunt mollit
                          anim id est laborum.
                        </p>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col style={{ marginTop: "5vh" }} md={6}>
                        <RegisterForm
                          typeOfRegister="team"
                          handleRegistration={this.handleRegistration}
                        />
                      </Col>
                      <Col style={{ marginTop: "5vh" }}>
                        <h3>Om Barn</h3>
                        <p>
                          Hensmåla Triathlon har länge Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut
                          enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non
                          proident, sunt in culpa qui officia deserunt mollit
                          anim id est laborum.
                        </p>
                        <p>
                          Hensmåla Triathlon har länge Lorem ipsum dolor sit
                          amet, consectetur adipiscing elit, sed do eiusmod
                          tempor incididunt ut labore et dolore magna aliqua. Ut
                          enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat. Duis aute irure dolor in reprehenderit in
                          voluptate velit esse cillum dolore eu fugiat nulla
                          pariatur. Excepteur sint occaecat cupidatat non
                          proident, sunt in culpa qui officia deserunt mollit
                          anim id est laborum.
                        </p>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </div>
            ) : (
              <RegSuccess handleRegistration={this.handleRegistration} />
            )}
          </CardBody>
        </Card>
      </Container>
    );
  }
}
export default Register;
