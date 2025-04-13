import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import classnames from "classnames";
import { RegisterFormSolo } from "../components/RegisterFormSolo";
import { RegisterFormTeam } from "../components/RegisterFormTeam";
import { DEFAULT_CONTACT_EMAIL, NAVBAR_HEIGHT } from "../../../Constants";
import { FillCenterLayout } from "../../../components/FillCenterLayout";
import { getViteEnvVariable } from "../../../utils";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { BaseButton } from "../../../components/Button/BaseButton";
import { RegisterFormKids } from "../components/RegisterFormKids";

enum Tab {
  SOLO = 0,
  TEAM = 1,
  KIDS = 2
}

export const ImageList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex;
`;
export const FormContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
`;

export const LeftColumn = styled.div`
  flex: 1;
`;

export const ScrollToInfoButton = styled(BaseButton)`
  flex-direction: column;
  text-align: center;
  color: #11999e;
  font-weight: bold;
  padding: 0;
  gap: 0;

  @media (min-width: 770px) {
    display: none;
  }
`;

export const TabButton = styled(BaseButton)`
  background-color: transparent;
  padding: 10px;
  width: 100px;

  &:hover {
    background-color: aliceblue;
  }
`;

export const Tabs = styled.div`
  display: flex;
  position: relative;
  align-self: start;
`;

export const StickyContainer = styled.div<{isFullwidth?: boolean}>`
  position: sticky;
  top: calc(${NAVBAR_HEIGHT}px + 20px);
  align-self: flex-start;
  max-width: ${props => props.isFullwidth ? "100%" : "50%"};
  min-width: 250px;
`;


export const Register = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const registerType = searchParams.get("typ");

  useEffect(() => {
    if (registerType === "lag" || registerType === "barn") {
      setActiveTab(registerType === "lag" ? Tab.TEAM : Tab.KIDS);
    } else {
      setSearchParams({ typ: "individuell" }, { replace: true });
      setActiveTab(Tab.SOLO);
    }
  }, [registerType])

  const handleTabChange = (tabIndex: number) => {
    if (tabIndex === Tab.SOLO) {
      setSearchParams({ typ: "individuell" }, { replace: true });
    } else if (tabIndex === Tab.KIDS) {
      setSearchParams({ typ: "barn" }, { replace: true });
    } else {
      setSearchParams({ typ: "lag" }, { replace: true });
    }
    setActiveTab(tabIndex);
  }

  if (getViteEnvVariable("VITE_ALLOW_REGISTRATION") !== "true") {
    return (
      <FillCenterLayout>
        <h2>Anmälan är inte öppnad än.</h2>
        <p>Vi öppnar snart. Vid frågor är det bara att höra av sig till {DEFAULT_CONTACT_EMAIL} </p>
      </FillCenterLayout>
    )
  }

  return (
    <Container>
      <div className="card-box" style={{ marginTop: 40, flexDirection: "column" }}>
        <Tabs>
          <TabButton onClick={() => handleTabChange(0)}>
            Individuell
          </TabButton>
          <TabButton onClick={() => handleTabChange(1)}>
            Lag
          </TabButton>
          <TabButton onClick={() => handleTabChange(2)}>
            Barn
          </TabButton>
          <div className={classnames("tab-underline", { second: activeTab === 1, third: activeTab === 2 })}></div>
        </Tabs>
        {
          activeTab === Tab.SOLO ?
            <RegisterFormSolo />
            : activeTab === Tab.KIDS  ? <RegisterFormKids /> :
            <RegisterFormTeam />
        }
      </div>
    </Container>
  );
}
