import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FillCenterLayout } from "../../../components/FillCenterLayout";

const StyledLink = styled(Link)`
  font-size: 1rem;
  color: #11999e;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const NotFound: React.FC = () => (
  <FillCenterLayout>
    <h1>Kunde inte hittas</h1>
    <p>Sidan du sökte kunde inte hittas.</p>
    <StyledLink to="/">Gå tillbaka till hemsidan</StyledLink>
  </FillCenterLayout>
);

export default NotFound;
