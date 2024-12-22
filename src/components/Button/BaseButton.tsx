import styled, { css } from "styled-components";

export const BaseButton = styled.button<{
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  fullWidth?: boolean;
}>`
  border: none;
  background-color: transparent;
  padding: 12px 24px;
  font-size: 1rem;
  border-radius: 8px;
  cursor: pointer;
  outline: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  gap: 10px;
  width: ${props => (props.fullWidth ? "100%" : "auto")};

  &:focus {
    outline: 3px solid rgba(50, 150, 250, 0.8);
    outline-offset: 3px;
  }

  &:disabled {
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
    background-color: #e0e0e0;
    color: #a0a0a0;

    &:hover,
    &:active {
      box-shadow: none;
      transform: none;
      background-color: #e0e0e0;
      color: #a0a0a0;
    }
  }

  ${props =>
    props.small &&
    css`
      padding: 5px;
    `}

  ${props =>
    props.medium &&
    css`
      padding: 10px;
    `}
`;
