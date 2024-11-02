import React from "react";
import { Link } from "react-router-dom";
import {
  NavLink,
  Navbar,
  NavbarToggler,
  Collapse,
  NavbarBrand,
  Button,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
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
      <Navbar expand="xl" sticky="top" style={{ backgroundColor: "#11999E", zIndex: 10 }}>
        <NavbarBrand
          tag={Link}
          color="light"
          className="inactive nav-title brand-title"
          activeClassName="active"
          exact={true}
          to="/"
          onClick={() => {this.setState({ isHamburgerOpen: false }); window.scrollTo(0, 0);}}
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
            tag={Link}
            className="inactive nav-title"
            activeClassName="active"
            to="/anmalan"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            ANMÄLAN
          </NavLink>
          <NavLink
            tag={Link}
            className="inactive nav-title"
            activeClassName="active"
            to="/bestall-klader"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            BESTÄLL KLÄDER
          </NavLink>
          <NavLink
            tag={Link}
            className="inactive nav-title"
            activeClassName="active"
            to="/corona-edition"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            CORONA EDITION
          </NavLink>
          <NavLink
            tag={Link}
            className="inactive nav-title"
            activeClassName="active"
            to="/hentrampet"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            HENTRAMPET
          </NavLink>
          <UncontrolledDropdown nav inNavbar className="inactive nav-title">
            <DropdownToggle nav caret className="inactive nav-title">
              OM
            </DropdownToggle>
            <DropdownMenu left>
              <DropdownItem>
                <NavLink
                  className="dropdown-item"
                  tag={Link}
                  activeClassName="active"
                  to="/om-als"
                  onClick={() => this.setState({ isHamburgerOpen: false })}
                >
                OM ALS
                </NavLink>
              </DropdownItem>
              <DropdownItem>
                <NavLink
                  tag={Link}
                  className="dropdown-item"
                  activeClassName="active"
                  to="/om-ht/hem"
                  onClick={() => this.setState({ isHamburgerOpen: false })}
                >
                OM HENSMÅLA TRIATHLON
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
          <NavLink
            tag={Link}
            className="inactive nav-title"
            activeClassName="active"
            to="/media"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            MEDIA
          </NavLink>
          <NavLink
            tag={Link}
            className="inactive nav-title"
            activeClassName="active"
            to="/sponsorer"
            onClick={() => this.setState({ isHamburgerOpen: false })}
          >
            SPONSORER
          </NavLink>
          <div class="donations-button-container">
            <a
              className="donate nav-title"
              target="_blank"
              rel="noopener noreferrer"
              href="https://egnainsamlingar.neuro.se/projects/neuro-10"
              >
              <Button color="light">Insamlingar</Button>
            </a>
          </div>
        </Collapse>
      </Navbar>
    );
  }
}

export default Navigation;
