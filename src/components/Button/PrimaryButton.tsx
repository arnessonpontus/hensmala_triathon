import styled from "styled-components";
import { BaseButton } from "./BaseButton";

export const PrimaryButton = styled(BaseButton)`
  background-color: #11999e;
  color: white;
  
  &:hover {
    background-color: #0f8a8d;
  }

  &:active {
    transform: scale(0.98);
  }
`;
