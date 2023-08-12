import React from "react";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  NavLink,
  Navbar,
  NavbarToggler,
  Collapse,
  NavbarBrand,
  Button,
} from "reactstrap";

class Navigation extends React.Component {
  state = {
    isHamburgerOpen: false,
  };

  constructor(props) {
    super(props);

    this.toggleHamburger = this.toggleHamburger.bind(this);
  }

  toggleHamburger = () => {
    this.setState({ isHamburgerOpen: !this.state.isHamburgerOpen });
  };

  render() {
    return (
      <Navbar expand="xl" sticky="top" style={{ backgroundColor: "#11999E", zIndex: 1 }}>
        <NavbarBrand
          tag={RRNavLink}
          color="light"
          className="inactive nav-title brand-title"
          activeClassName="active"
          exact={true}
          to="/"
          onClick={() => this.setState({ isHamburgerOpen: false })}
        >
          <img
            src="/images/nav_hona.png"
            alt="hona"
            style={{ width: 20, marginRight: 10 }}
          ></img>
          Hensmåla Triathlon
        </NavbarBrand>
        <NavbarToggler onClick={this.toggleHamburger}>
          <img
            style={{ width: 30 }}
            src="/images/menu.png"
            alt="hamburger-menu"
          ></img>
        </NavbarToggler>
        <Collapse isOpen={this.state.isHamburgerOpen} navbar>
          <NavLink
            tag={RRNavLink}
            className="inactive nav-title"
            activeClassName="active"
            to="/anmalan"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            ANMÄLAN
          </NavLink>
          <NavLink
            tag={RRNavLink}
            className="inactive nav-title"
            activeClassName="active"
            to="/corona-edition"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            CORONA EDITION
          </NavLink>
          <NavLink
            tag={RRNavLink}
            className="inactive nav-title"
            activeClassName="active"
            to="/hentrampet"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            HENTRAMPET
          </NavLink>
          <NavLink
            tag={RRNavLink}
            className="inactive nav-title"
            activeClassName="active"
            to="/om-als"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            OM ALS
          </NavLink>
          <NavLink
            tag={RRNavLink}
            className="inactive nav-title"
            activeClassName="active"
            to="/om-ht/hem"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            OM HENSMÅLA TRIATHLON
          </NavLink>

          <NavLink
            tag={RRNavLink}
            className="inactive nav-title"
            activeClassName="active"
            to="/media"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            MEDIA
          </NavLink>
          <NavLink
            tag={RRNavLink}
            className="inactive nav-title"
            activeClassName="active"
            to="/sponsorer"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            SPONSORER
          </NavLink>
        </Collapse>
        <a
          className="donate"
          style={{ position: "absolute", right: 20 }}
          target="_blank"
          rel="noopener noreferrer"
          href="https://egnainsamlingar.neuro.se/projects/neuro-10"
        >
          <Button color="light">DONERA</Button>
        </a>
      </Navbar>
    );
  }
}

export default Navigation;
