import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import classnames from "classnames";
import { FormType, RegisterFormSoloState, RegisterFormTeamState } from "./models";
import { RegSuccess } from "./RegSuccess";
import { RegisterFormSolo } from "./RegisterFormSolo";
import { RegisterFormTeam } from "./RegisterFormTeam";
import { handleSubmit } from "./registerService";

export const Register = () => {
  const [hasRegisterd, setHasRegistered] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])


const toggleDone = () => {
   setHasRegistered(!hasRegisterd)
  }

  const handleRegSubmit = (e: React.FormEvent<HTMLFormElement>, formType: FormType, formData: RegisterFormSoloState | RegisterFormTeamState, totalCost: number) => {
    handleSubmit(e, formType, formData, totalCost, (val) => setLoading(val), () => toggleDone());
  }

  return (
    <Container>
      {!hasRegisterd ? (
          <div className="card-box" style={{ marginTop: 40, minHeight: '70vh' }}>
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
                handleSubmit={handleRegSubmit}
                loading={loading}
              />
              :
              <RegisterFormTeam
                handleSubmit={handleRegSubmit}
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