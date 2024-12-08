import { useState, useEffect } from "react";
import styled from "styled-components";
import { getDaysFromNow } from "../../register/utils";

export const BannerTime = ({ showDaysLeft = false, showDateAndDaysLeft = false }: { showDaysLeft?: boolean, showDateAndDaysLeft?: boolean }) => {
  const [daysLeft, setDaysLeft] = useState(0);
  const START_DAY = "2025-07-12";

  useEffect(() => {
    setDaysLeft(getDaysFromNow(START_DAY));

    const intervalID = setInterval(() => {
      setDaysLeft(getDaysFromNow(START_DAY));
    }, 1000)

    return () => {
      clearInterval(intervalID)
    }
  }, [])
  
  if (showDateAndDaysLeft) {
    return  (
      <>
        <MainTime>12 juli 2025</MainTime>
        <SecondaryTime>{Math.abs(daysLeft)} dagar kvar</SecondaryTime>
      </>
    )
  }

  if (!showDaysLeft) {
    return  <MainTime>12 juli 2025</MainTime>;
  }
  return <MainTime>{Math.abs(daysLeft)} dagar kvar</MainTime>;
}

export const BaseTime = styled.div`
  font-size: calc(2em + 3vw);
  font-weight: bold;
  color: white;
  text-shadow: 4px 4px 4px #000000;
`;

export const MainTime = styled(BaseTime)`
  font-size: calc(2em + 3vw);
`;

export const SecondaryTime = styled(BaseTime)`
  font-size: calc(0.5em + 1vw);
`;
