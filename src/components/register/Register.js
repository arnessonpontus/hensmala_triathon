import React, { Component } from "react";
import RegSuccess from "./RegSuccess";
import { Container } from "reactstrap";
import RegisterFormSolo from "./RegisterFormSolo";
import RegisterFormTeam from "./RegisterFormTeam";
import classnames from "classnames";
import { handleSubmit } from "./Utils"
class Register extends Component {
  state = {
    hasRegisterd: false,
    loading: false,
    activeTab: 0
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggleDone = (e) => {
    this.setState({ hasRegisterd: !this.state.hasRegisterd });
  }

  handleRegSubmit = (e, type, data, totalToPay) => {
    handleSubmit(e, type, data, totalToPay, (val) => this.setState({loading: val}), () => this.toggleDone());
  }

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
                  handleSubmit={this.handleRegSubmit}
                  loading={this.state.loading}
                />
                :
                <RegisterFormTeam
                  handleSubmit={this.handleRegSubmit}
                  loading={this.state.loading}
                />
            }
          </div>
        ) : (
          <RegSuccess type="register" onGoBack={this.toggleDone} />
        )}
      </Container>
    );
  }
}
export default Register;
