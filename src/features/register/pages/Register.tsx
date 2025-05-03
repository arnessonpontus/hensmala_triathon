import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import classnames from "classnames";
import { DEFAULT_CONTACT_EMAIL, NAVBAR_HEIGHT } from "../../../Constants";
import { FillCenterLayout } from "../../../components/FillCenterLayout";
import { getViteEnvVariable } from "../../../utils";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { BaseButton } from "../../../components/Button/BaseButton";
import { FormType } from "../models";
import { RegisterForm } from "../components/RegisterForm";

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
  const [activeTab, setActiveTab] = useState<FormType>(FormType.Solo);
  const [searchParams, setSearchParams] = useSearchParams();
  const registerType = searchParams.get("typ");

  useEffect(() => {
    if (registerType === "lag" || registerType === "barn") {
      setActiveTab(registerType === "lag" ? FormType.Team : FormType.Kids);
    } else {
      setSearchParams({ typ: "individuell" }, { replace: true });
      setActiveTab(FormType.Solo);
    }
  }, [registerType])

  const handleTabChange = (tab: FormType) => {
    if (tab === FormType.Solo) {
      setSearchParams({ typ: "individuell" }, { replace: true });
    } else if (tab === FormType.Kids) {
      setSearchParams({ typ: "barn" }, { replace: true });
    } else {
      setSearchParams({ typ: "lag" }, { replace: true });
    }
    setActiveTab(tab);
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
          <TabButton onClick={() => handleTabChange(FormType.Solo)}>
            Individuell
          </TabButton>
          <TabButton onClick={() => handleTabChange(FormType.Team)}>
            Lag
          </TabButton>
          <TabButton onClick={() => handleTabChange(FormType.Kids)}>
            Barn
          </TabButton>
          <div className={classnames("tab-underline", { second: activeTab === FormType.Team, third: activeTab === FormType.Kids})}></div>
        </Tabs>
        <RegisterForm type={activeTab} />
      </div>
    </Container>
  );
}
