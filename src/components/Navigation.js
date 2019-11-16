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
              <DropdownItem>
                <a
                  href="/results/2019_resultat_hensmala_triathlon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2019
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href="/results/2018_resultat_hensmala_triathlon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2018
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href="/results/2017_resultat_hensmala_triathlon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2017
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href="/results/2016_resultat_hensmala_triathlon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2016
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href="/results/2015_resultat_hensmala_triathlon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2015
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href="/results/2014_resultat_hensmala_triathlon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2014
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href="/results/2013_resultat_hensmala_triathlon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2013
                </a>
              </DropdownItem>
              <DropdownItem>
                <a
                  href="/results/2012_resultat_hensmala_triathlon.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  2012
                </a>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
