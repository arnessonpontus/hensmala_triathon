import styled from "styled-components";
import { BaseButton } from "./BaseButton";

export const SecondaryButton = styled(BaseButton)`
  background-color: white;
  color: black;
  
  &:hover {
    background-color: #f2f2f2;
  }

  &:active {
    transform: scale(0.98);
  }
`;
