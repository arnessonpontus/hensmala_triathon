import { useState } from "react";
import { Container } from "reactstrap";
import classnames from "classnames";
import { RegSuccess } from "../components/RegSuccess";
import { RegisterFormSolo } from "../components/RegisterFormSolo";
import { RegisterFormTeam } from "../components/RegisterFormTeam";
import { DEFAULT_CONTACT_EMAIL } from "../../../Constants";
import { FillCenterLayout } from "../../../components/FillCenterLayout";

export const Register = () => {
  const [hasRegisterd, setHasRegistered] = useState(false);
  const [loading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const toggleDone = () => {
    setHasRegistered(!hasRegisterd)
  }

  if (import.meta.env.VITE_ALLOW_REGISTRATION !== "true") {
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
            <div onClick={() => setActiveTab(0)} className="register-tab">
              Individuell
            </div>
            <div onClick={() => setActiveTab(1)} className="register-tab">
              Lag
            </div>
            <div className={classnames("tab-underline", { second: activeTab === 1 })}></div>
          </div>
          {
            activeTab === 0 ?
              <RegisterFormSolo
                loading={loading}
              />
              :
              <RegisterFormTeam
                loading={loading}
              />
          }
        </div>
      ) : (
        <RegSuccess type="register" onGoBack={toggleDone} />
      )}
    </Container>
  );
}
