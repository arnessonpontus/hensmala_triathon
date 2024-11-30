import React, { useMemo, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormText,
  Button
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "../../../components/Consent";
import ExtraDonation from "./ExtraDonation";
import { DayPicker, MonthPicker, YearPicker } from "./TimeAndDate";
import ShirtSelect from "./ShirtSelect";
import CapSelect from "./CapSelect";
import { AboutPaths } from "../../about/pages/AboutHT";
import { Link } from "react-router-dom";
import { FormType, RegisterFormSoloState, RegisterFormTeamState } from "../models";
import { calcTotalRegisterPrice, scrollToInfo } from "../utils";
import { handleCheckout } from "../service/checkoutService";
import { useErrorModal } from "../../../context/ErrorModalContext";
import usePrices from "../hooks/usePrices";
import { ErrorBanner } from "../../../components/ErrorBanner";

interface RegisterFormSoloProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    formType: FormType,
    formData: RegisterFormSoloState,
    totalCost: number) => void;
  loading: boolean;
}

export const RegisterFormSolo = (props: RegisterFormSoloProps) => {
  const { loading, getPriceByName } = usePrices();

  const [formState, setFormState] = useState<RegisterFormSoloState>({
    name1: "",
    email1: "",
    year1: "",
    month1: "",
    day1: "",
    info: "",
    gender: "",
    city1: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false,
    isCheckboxThreeTicked: false,
    shirts: [],
    numCaps: 0,
    extraDonation: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const toggleConsent = (checkbox: 1 | 2 | 3) => {
    setFormState(prevState => {
      if (checkbox === 3) {
        return { ...prevState, isCheckboxOneTicked: !prevState.isCheckboxOneTicked };
      } else if (checkbox === 2) {
        return { ...prevState, isCheckboxTwoTicked: !prevState.isCheckboxTwoTicked };
      } else {
        return { ...prevState, isCheckboxThreeTicked: !prevState.isCheckboxThreeTicked };
      }
    });
  };

  const isAllowedCompanyEntered = () => {
    return (
      import.meta.env.VITE_ALLOWED_COMPANY &&
      formState.city1.toLowerCase().includes(import.meta.env.VITE_ALLOWED_COMPANY.toLowerCase())
    );
  };

  const totalCost = useMemo((): number | null => {
    return calcTotalRegisterPrice(getPriceByName("bomull"),
      getPriceByName("funktion"),
      getPriceByName("keps"),
      getPriceByName("registration-fee-solo"),
      formState.numCaps,
      formState.shirts,
      formState.extraDonation,
      isAllowedCompanyEntered())
  }, [loading, formState]);

  const { showErrorModal } = useErrorModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCheckout(FormType.Solo, formState.shirts, formState.numCaps, formState, showErrorModal);
  };

  return (
    <Row>
      <Col style={{ marginTop: "2vh" }} md={6}>
        <Form
          onSubmit={onSubmit}
        // #TODO födelsedagsdatum och gender blir inte validerat
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Anmälan 2024 Individuell</h3>

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
            <Label for="name">Namn*</Label>
            <Input
              required={true}
              type="text"
              name="name1"
              id="name1"
              placeholder="Förnamn Efternamn"
              value={formState.name1}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="email">Epost*</Label>
            <Input
              required={true}
              type="email"
              name="email1"
              id="email1"
              placeholder="din.email@gmail.com"
              value={formState.email1}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthdayID">Födelsedatum*</Label>
            <div style={{ display: "flex" }}>
              <YearPicker
                required={true}
                handleChange={handleChange}
                elemName="year1" />
              <MonthPicker
                required={true}
                handleChange={handleChange}
                elemName="month1"
              />
              <DayPicker
                required={true}
                handleChange={handleChange}
                elemName="day1" />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="genderSelection">Kön*</Label>
            <Input
              required={true}
              type="select"
              name="gender"
              id="genderSelection"
              onChange={handleChange}
            >
              <option disabled selected>
                Välj kön
              </option>
              <option value="Man">Man</option>
              <option value="Kvinna">Kvinna</option>
            </Input>
          </FormGroup>

          <FormGroup>
            <Label for="city"> Ort (klubb)</Label>
            <Input
              type="text"
              name="city1"
              id="city1"
              placeholder="Hensmåla löparförening"
              value={formState.city1}
              onChange={handleChange}
            />
          </FormGroup>
          {isAllowedCompanyEntered() ?
            <div className="allowed-company-text-bg">
              <small>
                Du har anget <b style={{ color: "#007fa8" }}>{import.meta.env.VITE_ALLOWED_COMPANY}</b> som klubb och får därför anmälningsavgiften betald.
              </small>
            </div>
            : null}
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
            <Label>Lägg till t-shirt (Bomull {getPriceByName("bomull")}kr, Funktion {getPriceByName("funktion")}kr)</Label>
            <div className="clothes-select">
              <ShirtSelect updateShirtSelection={(newShirts) => setFormState(prev => ({ ...prev, shirts: newShirts }))} />
            </div>
            <Label className="mt-2">Lägg till keps ({getPriceByName("keps")}kr)</Label>
            <div className="clothes-select">
              <CapSelect updateCapSelection={(numCaps) => setFormState(prev => ({ ...prev, numCaps }))} />
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
            <Label for="checkbox1" className="consent-checkbox">
              <Input
                id="checkbox1"
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
            <Label for="checkbox2">
              <Input
                id="checkbox2"
                type="checkbox"
                onClick={() => toggleConsent(2)}
              />{" "}
              Jag kommer att följa Hensmåla Triathlons{" "}
              <RRNavLink
                target="_blank"
                rel="noopener noreferrer"
                to={"/om-ht/" + AboutPaths.rules}
              >
                regler
              </RRNavLink>{" "}
              och den anmälningsinformation som finns på denna sida.
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label for="checkbox3">
              <Input
                id="checkbox3"
                type="checkbox"
                onClick={() => toggleConsent(3)}
              />{" "}
              Jag accepterar att bilder och filmer sparas och kan användas på
              internet.
            </Label>
          </FormGroup>
          <FormGroup>
            <Label for="totalAmountToPay">Totalt att betala:</Label>
            {totalCost != null ? <h5>{totalCost}kr</h5> : <ErrorBanner text="Kunde inte hämta priser" />}
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
        <h3>Anmäl dig till Hensmåla Triathlon 2024</h3>
        <b>Datum: 20 juli</b>
        <p>
          Ett motionslopp för alla, motionär som elit. Få en härlig dag i Hensmålas vackra natur med simning (340m), cykling (9.2km), löpning (6.5km) och samtidigt bidra till ALS-forskningen.
        </p>
        <p>
          När du anmälder sig som individuell deltagare utför du alla tre
          grenar på egen hand. För mer information om sträckorna och
          tävlingsregler kan du gå in{" "}
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
        <b style={{ fontSize: 20 }}>Startavgift: {getPriceByName("registration-fee-solo")}kr</b>

      </Col>
    </Row>
  );
}
