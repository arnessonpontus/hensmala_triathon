import React from "react";
//import { Link } from "react-router-dom";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  NavLink,
  Navbar,
  NavbarToggler,
  Collapse,
  NavbarBrand
} from "reactstrap";

class Navigation extends React.Component {
  state = {
    isOpen: false
  };

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  render() {
    return (
      <Navbar expand="md" sticky="top" style={{ backgroundColor: "#11999E" }}>
        <NavbarBrand
          tag={RRNavLink}
          color="light"
          className="inactive"
          activeClassName="active"
          exact={true}
          to="/"
          onClick={() => this.setState({ isOpen: false })}
        >
          <img
            src="/images/nav_hona.png"
            alt="hona"
            style={{ width: 30, marginRight: 10 }}
          ></img>
          Hensmåla Triathlon
        </NavbarBrand>
        <NavbarToggler onClick={this.toggle}>
          <img
            style={{ width: 30 }}
            src="/images/menu.png"
            alt="hamburger-menu"
          ></img>
        </NavbarToggler>
        <Collapse isOpen={this.state.isOpen} navbar>
          <NavLink
            tag={RRNavLink}
            className="inactive"
            activeClassName="active"
            to="/Register"
            onClick={() => this.setState({ isOpen: false })}
          >
            ANMÄLAN
          </NavLink>
          <NavLink
            tag={RRNavLink}
            className="inactive"
            activeClassName="active"
            to="/aboutALS"
            onClick={() => this.setState({ isOpen: false })}
          >
            OM ALS
          </NavLink>
          <NavLink
            tag={RRNavLink}
            className="inactive"
            activeClassName="active"
            to="/aboutHT"
            onClick={() => this.setState({ isOpen: false })}
          >
            OM HENSMÅLA TRIATLON
          </NavLink>
          <NavLink
            tag={RRNavLink}
            className="inactive"
            activeClassName="active"
            to="/media"
            onClick={() => this.setState({ isOpen: false })}
          >
            MEDIA
          </NavLink>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
