import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  Card,
  CardBody,
  FormText,
  Button
} from "reactstrap";
import { Link } from "react-router-dom";
import Consent from "../../../components/Consent";
import ShirtSelect from "./ShirtSelect";
import CapSelect from "./CapSelect";
import ExtraDonation from "./ExtraDonation";
import { DayPicker, MonthPicker, YearPicker } from "./TimeAndDate";
import { FormType, RegisterFormTeamState } from "../models";
import { AboutPaths } from "../../about/pages/AboutHT";
import { CAP_PRICE, SHIRT_PRICE_COTTON, SHIRT_PRICE_FUNCTIONAL } from "../service/registerService";
import { calcShirtPrice, scrollToInfo } from "../utils";
import { handleCheckout } from "../service/checkoutService";
import { useErrorModal } from "../../../context/ErrorModalContext";

const LATE_REGISTER_FEE = 700;
const REGISTER_FEE = LATE_REGISTER_FEE;

interface RegisterFormTeamProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    formType: FormType,
    formData: RegisterFormTeamState,
    totalCost: number
  ) => void;
  loading: boolean;
}

export const RegisterFormTeam = (props: RegisterFormTeamProps) => {
  const [formState, setFormState] = useState<RegisterFormTeamState>({
    teamName: "",
    name1: "",
    email1: "",
    year1: "",
    month1: "",
    day1: "",
    city1: "",
    name2: "",
    email2: "",
    year2: "",
    month2: "",
    day2: "",
    city2: "",
    name3: "",
    email3: "",
    year3: "",
    month3: "",
    day3: "",
    city3: "",
    info: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false,
    isCheckboxThreeTicked: false,
    shirts: [],
    numCaps: 0,
    extraDonation: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleConsent = (checkbox: 1 | 2 | 3) => {
    setFormState(prevState => {
      if (checkbox === 1) {
        return { ...prevState, isCheckboxOneTicked: !prevState.isCheckboxOneTicked };
      } else if (checkbox === 2) {
        return { ...prevState, isCheckboxTwoTicked: !prevState.isCheckboxTwoTicked };
      } else {
        return { ...prevState, isCheckboxThreeTicked: !prevState.isCheckboxThreeTicked };
      }
    });
  };

  const isAllowedCompanyEntered = () => {
    const allowedCompany = import.meta.env.VITE_ALLOWED_COMPANY?.toLowerCase();
    return (
      allowedCompany &&
      [formState.city1, formState.city2, formState.city3].some((city) => city.toLowerCase().includes(allowedCompany))
    );
  };
  const calcTotalCost = () => {
    const shirtCost = calcShirtPrice(formState.shirts);
    const capCost = formState.numCaps * CAP_PRICE;
    if (isAllowedCompanyEntered()) {
      return formState.extraDonation + shirtCost + capCost
    }
    return REGISTER_FEE + formState.extraDonation + shirtCost + capCost;
  };

  const renderMemberFields = () => {
    return [1, 2, 3].map((num) => {
      return (
        <div key={num} style={{ marginBottom: "20px" }}>
          <Label for={`teamMember${num}`}>Lagmedlem {num}</Label>
          {num === 3 ? <i> (Ej för lag med endast två deltagare)</i> : null}
          <Card id={`teamMember${num}`} style={{ backgroundColor: `#dfeff${num * 3}` }}>
            <CardBody>
              <FormGroup>
                <Label for={`name${num}`}>Namn*</Label>
                <Input
                  required={num !== 3}
                  type="text"
                  name={`name${num}`}
                  id={`name${num}`}
                  placeholder="Förnamn Efternamn"
                  value={formState[`name${num}` as keyof RegisterFormTeamState] as string}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`email${num}`}>Epost*</Label>
                <Input
                  required={num !== 3}
                  type="email"
                  name={`email${num}`}
                  id={`email${num}`}
                  placeholder="din.email@gmail.com"
                  value={formState[`email${num}` as keyof RegisterFormTeamState] as string}
                  onChange={handleChange}
                />
              </FormGroup>
              <FormGroup>
                <Label for={`birthdayID${num}`}>Födelsedatum*</Label>
                <div style={{ display: "flex" }}>
                  <YearPicker
                    required={num !== 3}
                    handleChange={handleChange}
                    elemName={`year${num}`}
                  />
                  <MonthPicker
                    required={num !== 3}
                    handleChange={handleChange}
                    elemName={`month${num}`}
                  />
                  <DayPicker
                    required={num !== 3}
                    handleChange={handleChange}
                    elemName={`day${num}`}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <Label for={`city${num}`}> Ort (klubb)</Label>
                <Input
                  type="text"
                  name={`city${num}`}
                  id={`city${num}`}
                  placeholder="Hensmåla löparförening"
                  value={formState[`city${num}` as keyof RegisterFormTeamState] as string}
                  onChange={handleChange}
                />
              </FormGroup>
            </CardBody>
          </Card>
        </div>
      )
    })
  }

  const { showErrorModal } = useErrorModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCheckout("registration-fee-solo", formState.shirts, formState.numCaps, showErrorModal);
  };

  return (
    <Row>
      <Col style={{ marginTop: "2vh" }} md={6}>
        <Form
          onSubmit={onSubmit}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Anmälan 2024 Lag</h3>
            <div onClick={() => scrollToInfo("info-text")} className="scroll-to-info-btn">
              Visa info<i className="fas fa-angle-down angle-down"></i>
            </div>
          </div>
          <p>
            <b>
              <i>Sista dag för beställning av t-shirt och keps är 12:e juni</i>
            </b>
          </p>
          <FormGroup>
            <Label for="teamName">Lagnamn*</Label>
            <Input
              required={true}
              type="text"
              name="teamName"
              id="teamName"
              placeholder="Gubbaflås"
              value={formState.teamName}
              onChange={handleChange}
            />
          </FormGroup>
          {renderMemberFields()}
          <FormGroup>
            <Label for="info">Information</Label>
            <Input
              type="textarea"
              name="info"
              id="info"
              placeholder="T.ex. vilka du vill köra samtidigt som eller övrig info"
              value={formState.info}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="clothes-select">Lägg till t-shirt (Bomull {SHIRT_PRICE_COTTON}kr, Funktion {SHIRT_PRICE_FUNCTIONAL}kr)</Label>
            <div className="clothes-select">
              <ShirtSelect updateShirtSelection={(newShirts) => setFormState(prev => ({ ...prev, shirts: newShirts }))} />
            </div>
            <Label className="mt-2">Lägg till keps ({CAP_PRICE}kr)</Label>
            <div className="clothes-select">
              <CapSelect updateCapSelection={(numCaps) => setFormState(prev => ({ ...prev, numCaps: numCaps }))} />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="extra-donation">Extra donation till ALS-forskningen</Label>
            <ExtraDonation setDonation={(donationAmount) => setFormState(prev => ({ ...prev, extraDonation: donationAmount }))} />
          </FormGroup>
          <FormGroup>
            <FormText color="bold">* obligatoriska fält.</FormText>
          </FormGroup>
          <FormGroup check>
            <Label for="checkbox1Team" className="consent-checkbox">
              <Input
                id="checkbox1Team"
                type="checkbox"
                onClick={() => toggleConsent(1)}
              />{" "}
              Jag accepterar att Hensmåla Triathlon sparar data om mig.
            </Label>
            <Consent
              buttonText="Vad betyder detta?"
              title="Information om sparad data"
            />
          </FormGroup>
          <FormGroup check>
            <Label for="checkbox2Team">
              <Input
                id="checkbox2Team"
                type="checkbox"
                onClick={() => toggleConsent(2)}
              />{" "}
              Jag kommer att följa Hensmåla Triathlons{" "}
              <Link
                target="_blank"
                rel="noopener noreferrer"
                to={"/om-ht/" + AboutPaths.rules}
              >
                regler
              </Link>{" "}
              och den anmälningsinformation som finns på denna sida.
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label for="checkbox3Team">
              <Input
                id="checkbox3Team"
                type="checkbox"
                onClick={() => toggleConsent(3)}
              />{" "}
              Jag accepterar att bilder och filmer sparas och kan användas på
              internet.
            </Label>
          </FormGroup>
          {isAllowedCompanyEntered() ?
            <div className="allowed-company-text-bg">
              <small>
                Du har anget <b style={{ color: "#007fa8" }}>{import.meta.env.VITE_ALLOWED_COMPANY}</b> som klubb och får därför anmälningsavgiften betald.
              </small>
            </div>
            : null}
          <FormGroup>
            <Label for="totalAmountToPay">Totalt att betala:</Label>
            <h5>{calcTotalCost()}kr</h5>
          </FormGroup>

          <FormGroup>
            <Button
              type="submit"
              disabled={
                !(
                  formState.isCheckboxOneTicked &&
                  formState.isCheckboxTwoTicked &&
                  formState.isCheckboxThreeTicked
                ) || props.loading
              }
              loading={props.loading}
            >Betala dirr hörredu </Button>
          </FormGroup>

        </Form>
        <small>
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
          <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
          apply.
        </small>
      </Col>
      <Col id="info-text" style={{ marginTop: "2vh" }}>
        <hr className="register-divider"></hr>
        <h3>Anmäl er som Lag (2-3 pers.)</h3>
        <b>Datum: 20 juli</b>
        <p>
          När ni anmäler er som lag får sträckorna delas upp hur ni vill inom laget. Detta
          kan innebära att ni är tre personer som deltar där alla kör en gren var, eller ett lag med 2 personer där en av er kör 2 grenar. För mer information om sträckorna och tävlingsregler kan
          du gå in{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            to="/om-ht/hem">
            HÄR
          </Link>.
        </p>
        <p>
          Du kommer få ett bekräftelse-email med din angiva information och{" "}
          <b>betalningsuppgifter</b> då anmälan är gjord. Betala gärna direkt i samband med anmälan. När tävlingen närmar
          sig kommer yttligare information skickas ut via mail till alla
          deltagare.
        </p>
        <p>Första start sker 15.00.</p>
        <b>
          Fotografering och videofilmning förekommer, meddela om du inte vill
          vara med.
        </b>
        <br></br>
        <br></br>
        <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
        <b style={{ fontSize: 20 }}>Startavgift: {REGISTER_FEE}kr</b>
      </Col>
    </Row>
  );
}
