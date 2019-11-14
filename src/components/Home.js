import React, { Component } from "react";
import RegisterForm from "./RegisterForm";
import RegSuccess from "./RegSuccess";

class Home extends Component {
  state = {
    hasRegisterd: false
  };

  constructor(props) {
    super(props);

    this.handleRegSuccess = this.handleRegSuccess.bind(this);
  }

  handleRegSuccess = e => {
    this.setState({ hasRegisterd: true });
  };

  render() {
    return (
      <div className="home">
        <h1>HENSMÅLA TRIATHLON 2020</h1>
        {!this.state.hasRegisterd ? (
          <RegisterForm handleRegSuccess={this.handleRegSuccess} />
        ) : (
          <RegSuccess />
        )}
      </div>
    );
  }
}

export default Home;
