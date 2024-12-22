import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import classnames from "classnames";
import { RegisterFormSolo } from "../components/RegisterFormSolo";
import { RegisterFormTeam } from "../components/RegisterFormTeam";
import { DEFAULT_CONTACT_EMAIL } from "../../../Constants";
import { FillCenterLayout } from "../../../components/FillCenterLayout";
import { getViteEnvVariable } from "../../../utils";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { BaseButton } from "../../../components/Button/BaseButton";

enum Tab {
  SOLO = 0,
  TEAM = 1
}

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


export const Register = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const registerType = searchParams.get("typ");

  useEffect(() => {
    if (registerType === "lag") {
      setActiveTab(Tab.TEAM);
    } else {
      setSearchParams({ typ: "individuell" }, { replace: true });
      setActiveTab(Tab.SOLO);
    }
  }, [registerType])

  const handleTabChange = (tabIndex: number) => {
    if (tabIndex === Tab.SOLO) {
      setSearchParams({ typ: "individuell" }, { replace: true });
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
      <div className="card-box" style={{ marginTop: 40 }}>
        <Tabs>
          <TabButton onClick={() => handleTabChange(0)}>
            Individuell
          </TabButton>
          <TabButton onClick={() => handleTabChange(1)}>
            Lag
          </TabButton>
          <div className={classnames("tab-underline", { second: activeTab === 1 })}></div>
        </Tabs>
        {
          activeTab === 0 ?
            <RegisterFormSolo />
            :
            <RegisterFormTeam />
        }
      </div>
    </Container>
  );
}
