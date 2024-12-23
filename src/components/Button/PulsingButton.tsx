import styled, { keyframes } from "styled-components";
import { PrimaryButton } from "./PrimaryButton";

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(17, 153, 158, 0.7);
  }
  70% {
    box-shadow: 0 0 20px 20px rgba(17, 153, 158, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(17, 153, 158, 0);
  }
`;

// Styled button with the pulsing outer glow effect
export const PulsingButton = styled(PrimaryButton)`
  font-weight: bold;
  animation: ${pulse} 2s infinite;
`;
