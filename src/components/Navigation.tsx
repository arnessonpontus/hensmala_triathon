import { useState } from "react";
import { NavLink as RNNavLink } from "react-router-dom";
import {
  NavLink,
  Navbar,
  NavbarToggler,
  Collapse,
  NavbarBrand,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu
} from "reactstrap";
import { useMediaQuery } from 'react-responsive';
import { NAVBAR_HEIGHT } from "../Constants";
import { SecondaryButton } from "./Button/SecondaryButton";
import styled from "styled-components";

export const DonationsButtonContainer = styled.div`
  display: flex;
  flex-grow: 1;
  justify-content: flex-end;

  @media (max-width: 1400px) {
    justify-content: flex-start;
    padding-left: 16px;
  }
`;

export const Logo = styled.img`
  width: 20px;
  margin-right: 10px;

  @media (max-width: 350px) {
    display: none;
  }
`;


export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const shouldCollapse = useMediaQuery({ query: `(min-width: 1400px)` });

  const toggleHamburger = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Navbar expand={shouldCollapse} sticky="top" style={{ backgroundColor: "#11999E", zIndex: 10, minHeight: NAVBAR_HEIGHT }}>
      <NavbarBrand
        tag={RNNavLink}
        color="light"
        className="inactive nav-title brand-title"
        activeClassName="active"
        to="/"
        onClick={() => { setIsMenuOpen(false); window.scrollTo(0, 0); }}
      >
        <Logo src="/images/nav_hona.png"
          alt="hona" />
        Hensmåla Triathlon
      </NavbarBrand>
      <NavbarToggler onClick={toggleHamburger}>
        <img
          style={{ width: 30 }}
          src="/images/menu.png"
          alt="hamburger-menu"
        ></img>
      </NavbarToggler>
      <Collapse isOpen={isMenuOpen} navbar>
        <NavLink
          tag={RNNavLink}
          className="inactive nav-title"
          activeClassName="active"
          to="/anmalan"
          onClick={() => setIsMenuOpen(false)}
        >
          ANMÄLAN
        </NavLink>
        <NavLink
          tag={RNNavLink}
          className="inactive nav-title"
          activeClassName="active"
          to="/bestall-klader"
          onClick={() => setIsMenuOpen(false)}
        >
          BESTÄLL KLÄDER
        </NavLink>
        <NavLink
          tag={RNNavLink}
          className="inactive nav-title"
          activeClassName="active"
          to="/corona-edition"
          onClick={() => setIsMenuOpen(false)}
        >
          CORONA EDITION
        </NavLink>
        <NavLink
          tag={RNNavLink}
          className="inactive nav-title"
          activeClassName="active"
          to="/hentrampet"
          onClick={() => setIsMenuOpen(false)}
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
                tag={RNNavLink}
                activeClassName="active"
                to="/om-als"
                onClick={() => setIsMenuOpen(false)}
              >
                OM ALS
              </NavLink>
            </DropdownItem>
            <DropdownItem>
              <NavLink
                tag={RNNavLink}
                className="dropdown-item"
                activeClassName="active"
                to="/om-ht/hem"
                onClick={() => setIsMenuOpen(false)}
              >
                OM HENSMÅLA TRIATHLON
              </NavLink>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
        <NavLink
          tag={RNNavLink}
          className="inactive nav-title"
          activeClassName="active"
          to="/media"
          onClick={() => setIsMenuOpen(false)}
        >
          ARKIV & MEDIA
        </NavLink>
        <NavLink
          tag={RNNavLink}
          className="inactive nav-title"
          activeClassName="active"
          to="/sponsorer"
          onClick={() => setIsMenuOpen(false)}
        >
          SPONSORER
        </NavLink>
        <DonationsButtonContainer>
          <a
            className="donate nav-title"
            target="_blank"
            rel="noopener noreferrer"
            href="https://egnainsamlingar.neuro.se/projects/neuro-10"
          >
            <SecondaryButton medium color="light">Insamlingar</SecondaryButton>
          </a>
        </DonationsButtonContainer>
      </Collapse>
    </Navbar>
  );
}
