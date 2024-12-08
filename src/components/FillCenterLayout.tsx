import { PropsWithChildren } from "react";
import { styled } from "styled-components";

interface LayoutProps {
  direction?: "row" | "column"
}

export const FillCenterLayout: React.FC<PropsWithChildren & LayoutProps> = ({children, direction = "column"}) => {
  return <StyledLayout direction={direction}>{children}</StyledLayout>
}

export const StyledLayout = styled.div<{ direction?: string; }>`
  display: flex;
  flex-direction: ${props => props.direction};
  flex: 1;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-wrap: wrap;
  padding: 10px;
`;
