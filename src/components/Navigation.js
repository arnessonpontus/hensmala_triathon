import React from "react";
//import { Link } from "react-router-dom";
import { NavLink as RRNavLink } from "react-router-dom";
import {
  NavLink,
  Navbar,
  NavbarToggler,
  Collapse,
  NavbarBrand,
  Dropdown,
  DropdownItem,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";

class Navigation extends React.Component {
  state = {
    isHamburgerOpen: false,
    isDropdownOpen: false
  };

  constructor(props) {
    super(props);

    this.toggleHamburger = this.toggleHamburger.bind(this);
  }

  toggleHamburger = () => {
    this.setState({ isHamburgerOpen: !this.state.isHamburgerOpen });
  };

  toggleDropdown = () => {
    this.setState({ isDropdownOpen: !this.state.isDropdownOpen });
  };

  render() {
    const result_years = [2019, 2018, 2017, 2016, 2015, 2014, 2013, 2012];

    return (
      <Navbar expand="md" sticky="top" style={{ backgroundColor: "#11999E" }}>
        <NavbarBrand
          tag={RRNavLink}
          color="light"
          className="inactive"
          activeClassName="active"
          exact={true}
          to="/"
          onClick={() => this.setState({ isHamburgerOpen: false })}
        >
          <img
            src="/images/nav_hona.png"
            alt="hona"
            style={{ width: 30, marginRight: 10 }}
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
            className="inactive"
            activeClassName="active"
            to="/Register"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            ANMÄLAN
          </NavLink>
          <NavLink
            tag={RRNavLink}
            className="inactive"
            activeClassName="active"
            to="/aboutALS"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            OM ALS
          </NavLink>
          <NavLink
            tag={RRNavLink}
            className="inactive"
            activeClassName="active"
            to="/aboutHT"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            OM HENSMÅLA TRIATLON
          </NavLink>

          <NavLink
            tag={RRNavLink}
            className="inactive"
            activeClassName="active"
            to="/media"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            MEDIA
          </NavLink>
          <Dropdown
            isOpen={this.state.isDropdownOpen}
            toggle={this.toggleDropdown}
          >
            <DropdownToggle caret color="none" style={{ color: "#ebebeb" }}>
              RESULTAT
            </DropdownToggle>
            <DropdownMenu>
              {result_years.map(year => {
                return (
                  <DropdownItem>
                    <a
                      style={{ color: "black" }}
                      href={
                        "/results/" + year + "_resultat_hensmala_triathlon.pdf"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {year}
                    </a>
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;