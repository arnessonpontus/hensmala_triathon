import styled, { keyframes } from "styled-components";

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
export const PulsingButton = styled.button`
  background-color: #11999e;
  color: white;
  border: none;
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  animation: ${pulse} 2s infinite;

  &:hover {
    background-color: #0f8a8d;
  }

  &:active {
    transform: scale(0.98);
  }
`;
