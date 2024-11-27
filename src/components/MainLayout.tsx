import { PropsWithChildren } from "react";
import { styled } from "styled-components";
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from "../Constants";

export const MainLayout: React.FC<PropsWithChildren> = ({children}) => {
  return <StyledLayout>{children}</StyledLayout>
}

export const StyledLayout = styled.div`
  min-height: calc(100vh - ${NAVBAR_HEIGHT}px - ${FOOTER_HEIGHT}px);
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
`;
