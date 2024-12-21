import styled, {css} from "styled-components";
import { BaseButton } from "./BaseButton";
import { PRIMARY_COLOR } from "../../Constants";

export const ElevatedButton = styled(BaseButton)<{selected?: boolean; isSecondary?: boolean; }>`
  background-color: white;
  display: flex;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  border-radius: 10px;
  transition: all 0.2s ease-out;
  cursor: pointer;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  will-change: transform;

  &:hover {
    box-shadow: 0px 6px 10px rgba(38, 38, 38, 0.2);
    transform: scale(1.05) translate3d(0, 0, 0) perspective(1px);
  }

  &:active {
    transition: none;
    filter: brightness(85%);
  }

    ${props =>
    props.selected &&
    css`
      background-color: rgb(50, 165, 50);
      color: white
    `}

    ${props =>
    props.isSecondary &&
    css`
      background-color: ${PRIMARY_COLOR};
      color: white
    `}
`;
