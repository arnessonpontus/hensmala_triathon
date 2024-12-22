import styled from 'styled-components';

export const Card = styled.div`
  position: relative;
  box-shadow: 0px 4px 8px rgba(38, 38, 38, 0.2);
  background-color: white;
  border-radius: 10px;
  padding: 32px 24px;
  text-decoration: none;
  border: none;
`;

export const CardHoverable = styled(Card)`
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
`;
