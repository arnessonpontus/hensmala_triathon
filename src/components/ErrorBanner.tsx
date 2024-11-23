import { styled } from "styled-components";

export const ErrorBanner = ({ text }: { text: string }) => {
  return <StyledBanner>{text}</StyledBanner>
}

export const StyledBanner = styled.div`
  border-radius: 5px;
  margin: 5px;
  padding-right: 10px;
  padding-left: 10px;
  padding-top: 20px;
  padding-bottom: 20px;
  background-color: #ffbdbd;
  width: 100%;
`;
