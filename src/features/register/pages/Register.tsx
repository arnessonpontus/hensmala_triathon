import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import classnames from "classnames";
import { RegSuccess } from "../components/RegSuccess";
import { RegisterFormSolo } from "../components/RegisterFormSolo";
import { RegisterFormTeam } from "../components/RegisterFormTeam";
import { DEFAULT_CONTACT_EMAIL } from "../../../Constants";
import { FillCenterLayout } from "../../../components/FillCenterLayout";
import { getViteEnvVariable } from "../../../utils";
import { useSearchParams } from "react-router-dom";

enum Tab {
  SOLO = 0,
  TEAM = 1
}

export const Register = () => {
  const [hasRegisterd, setHasRegistered] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const registerType = searchParams.get("typ");

  useEffect(() => {
    if (registerType === "lag") {
      setActiveTab(Tab.TEAM);
    } else {
      setSearchParams({ typ: "individuell" });
      setActiveTab(Tab.SOLO);
    }
  }, [registerType])

  const handleTabChange = (tabIndex: number) => {
    if (tabIndex === Tab.SOLO) {
      setSearchParams({ typ: "individuell" });
    } else {
      setSearchParams({ typ: "lag" });
    }
    setActiveTab(tabIndex);
  }

  const toggleDone = () => {
    setHasRegistered(!hasRegisterd)
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
      {!hasRegisterd ? (
        <div className="card-box" style={{ marginTop: 40 }}>
          <div className="register-tabs">
            <div onClick={() => handleTabChange(0)} className="register-tab">
              Individuell
            </div>
            <div onClick={() => handleTabChange(1)} className="register-tab">
              Lag
            </div>
            <div className={classnames("tab-underline", { second: activeTab === 1 })}></div>
          </div>
          {
            activeTab === 0 ?
              <RegisterFormSolo/>
              :
              <RegisterFormTeam/>
          }
        </div>
      ) : (
        <RegSuccess type="register" onGoBack={toggleDone} />
      )}
    </Container>
  );
}
