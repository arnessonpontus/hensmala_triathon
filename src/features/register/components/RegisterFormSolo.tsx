import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Row,
  Col,
  FormText
} from "reactstrap";
import { NavLink as RRNavLink } from "react-router-dom";
import Consent from "../../../components/Consent";
import ExtraDonation from "./ExtraDonation";
import { DayPicker, MonthPicker, YearPicker } from "./TimeAndDate";
import ShirtSelect from "./ShirtSelect";
import CapSelect from "./CapSelect";
import { AboutPaths } from "../../about/pages/AboutHT";
import { Link } from "react-router-dom";
import RegisterButton from "./RegisterButton";
import CheckoutButton from "./CheckoutButton";
import { FormType, RegisterFormSoloState } from "../models";
import { calcShirtPrice, oreToSek, scrollToInfo } from "../utils";
import { CAP_PRICE, SHIRT_PRICE_COTTON, SHIRT_PRICE_FUNCTIONAL } from "../service/registerService";
import stripe from "stripe";

const LATE_REGISTER_FEE = 400;
const REGISTER_FEE = LATE_REGISTER_FEE;

interface RegisterFormSoloProps {
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    formType: FormType,
    formData: RegisterFormSoloState,
    totalCost: number) => void;
  loading: boolean;
}

export const RegisterFormSolo = (props: RegisterFormSoloProps) => {
  const [formState, setFormState] = useState<RegisterFormSoloState>({
    name: "",
    email: "",
    year: "",
    month: "",
    day: "",
    info: "",
    gender: "",
    city: "",
    isCheckboxOneTicked: false,
    isCheckboxTwoTicked: false,
    isCheckboxThreeTicked: false,
    shirts: [],
    numCaps: 0,
    extraDonation: 0
  });

  const [testPriceInCents, setTestPriceInCents] = useState(0);

  // TODO: Get all prices and not only bomull
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/.netlify/functions/getPrice', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productName: "bomull" }),
        })
        const price: stripe.Price = await res.json()

        if (price && price.unit_amount != null) {
          setTestPriceInCents(oreToSek(price.unit_amount));
        } else {
          console.log("couldnt find price:/")
        }
      } catch (error) {
        console.error("Error fetching price details:", error)
      }
    }

    fetchData()
  }, []);

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
      formState.city.toLowerCase().includes(import.meta.env.VITE_ALLOWED_COMPANY.toLowerCase())
    );
  };

  const calcTotalCost = () => {
    const shirtsCost = calcShirtPrice(formState.shirts);
    const capsCost = formState.numCaps * CAP_PRICE;
    const extraDonation = formState.extraDonation;

    if (isAllowedCompanyEntered()) {
      return extraDonation + shirtsCost + capsCost;
    }
    return REGISTER_FEE + extraDonation + shirtsCost + capsCost;
  };

  return (
    <Row>
      <Col style={{ marginTop: "2vh" }} md={6}>
        <Form
          onSubmit={(e) =>
            props.handleSubmit(e, "solo", formState, calcTotalCost())
          }
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
              name="name"
              id="name"
              placeholder="Förnamn Efternamn"
              value={formState.name}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label for="email">Epost*</Label>
            <Input
              required={true}
              type="email"
              name="email"
              id="email"
              placeholder="din.email@gmail.com"
              value={formState.email}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label for="birthdayID">Födelsedatum*</Label>
            <div style={{ display: "flex" }}>
              <YearPicker
                required={true}
                handleChange={handleChange}
                elemName="year" />
              <MonthPicker
                required={true}
                handleChange={handleChange}
                elemName="month"
              />
              <DayPicker
                required={true}
                handleChange={handleChange}
                elemName="day" />
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
              name="city"
              id="city"
              placeholder="Hensmåla löparförening"
              value={formState.city}
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
            <Label>Lägg till t-shirt (Bomull {SHIRT_PRICE_COTTON}kr, Funktion {SHIRT_PRICE_FUNCTIONAL}kr)</Label>
            <div className="clothes-select">
              <ShirtSelect updateShirtSelection={(newShirts) => setFormState(prev => ({ ...prev, shirts: newShirts }))} />
            </div>
            <Label className="mt-2">Lägg till keps ({CAP_PRICE}kr)</Label>
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
            <h5>{calcTotalCost()}kr</h5>
            <Label for="totalAmountToPay">Totalt att betala FRÅN STRIPE:</Label>
            <h5>{testPriceInCents}kr</h5>
          </FormGroup>

          <CheckoutButton
            registrationType="registration-fee-solo"
            shirts={formState.shirts}
            numCaps={formState.numCaps}
            text="Betala med stripe!"
            disabled={
              !(
                formState.isCheckboxOneTicked &&
                formState.isCheckboxTwoTicked &&
                formState.isCheckboxThreeTicked
              ) || props.loading
            }
            loading={props.loading}
          />

          <RegisterButton
            text="Anmäl mig!"
            disabled={
              !(
                formState.isCheckboxOneTicked &&
                formState.isCheckboxTwoTicked &&
                formState.isCheckboxThreeTicked
              ) || props.loading
            }
            loading={props.loading}
          />


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
        <b style={{ fontSize: 20 }}>Startavgift: {REGISTER_FEE}kr</b>

      </Col>
    </Row>
  );
}
