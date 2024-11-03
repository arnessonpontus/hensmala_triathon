import React, { useEffect, useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Col,
  Container,
  Row,
  FormText,
} from "reactstrap";
import ShirtSelect from "./ShirtSelect";
import CapSelect from "./CapSelect";
import ExtraDonation from "./ExtraDonation";
import Consent from "../Consent";
import { isShirtSelected } from "../../Utils"
import RegisterButton from "./RegisterButton";
import { calcShirtPrice, SHIRT_PRICE_COTTON, SHIRT_PRICE_FUNCTIONAL, CAP_PRICE } from '../../Utils';

import { OrderShirtState } from "./models";
import { RegSuccess } from "./RegSuccess";
import { handleSubmit } from "./registerService";

export const OrderShirt: React.FC = () => {
  const defaultState: OrderShirtState = {
    name: "",
    email: "",
    extraDonation: 0,
    shirts: [],
    numCaps: 0,
    info: "",
    consent: false,
    hasOrdered: false,
    loading: false,
  }

  const [formState, setFormState] = useState<OrderShirtState>(defaultState);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const calcTotalCost = () => {
    return (
      formState.extraDonation +
      calcShirtPrice(formState.shirts) +
      formState.numCaps * CAP_PRICE
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const toggleDone = () => {
    setFormState((prevState) => ({
      ...prevState,
      hasOrdered: !prevState.hasOrdered,
    }));
  };

  const resetState = () => {
    setFormState(defaultState);
  };
  return (
    <Container style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "90vh" }}>
      {!formState.hasOrdered ? (
        <div className="card-box" style={{ marginTop: 40, width: "90%" }}>
          <Row>
            <Col style={{ marginTop: "2vh" }} md={6}>
              <h3>Beställ t-shirt och keps </h3>
              <p>
                <b>
                  <i>Sista beställningsdag är 12:e juni</i>
                </b>
              </p>
              <p>Kontakta oss om du har frågor.</p>
              <p>Ska du inte delta i årets lopp men ändå ha en superfin t-shirt eller keps från Hensmåla Triathlon? Gör då en beställning här och var med och stöd ALS-forskningen! Beställning kan även göras via anmälan om du ska delta.</p>

              <p>Betalning görs via swish på nummret <b>1234048781</b> (eller scanna QR-koden), när vi ser din beställning och verifierar att betalningen kommit in lägger vi undan dina kläder.</p>
              <p>Upphämtning görs på plats i Hensmåla via dig själv eller någon bekant, <b>vi skickar alltså tyvärr inte kläderna.</b></p>

              <p>Donera gärna en extra slant om du känner för det! Isåfall lägger du enkelt till det i din swish-betalning.</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img
                  width="200px"
                  src="/images/qr_swish.svg"
                  alt="hensmala_triathlon"
                />
              </div>
            </Col>
            <Col style={{ marginTop: "2vh" }}>
              <hr className="register-divider"></hr>
              <Form onSubmit={(e) => handleSubmit(e, "tshirt_order", formState, calcTotalCost(), (val) => setFormState(prev => ({ ...prev, loading: val })), () => toggleDone())}>
                <FormGroup>
                  <Label for="clothes-select">Välj antal och storlek (Bomull {SHIRT_PRICE_COTTON}kr, Funktion {SHIRT_PRICE_FUNCTIONAL}kr)</Label>
                  <div className="clothes-select">
                    <ShirtSelect updateShirtSelection={(newShirts) =>{ setFormState(prev => ({ ...prev, shirts: newShirts }))}} />
                  </div>
                  <Label className="mt-2">Lägg till keps ({CAP_PRICE}kr)</Label>
                  <div className="clothes-select">
                    <CapSelect updateCapSelection={(numCaps) => setFormState(prev => ({ ...prev, numCaps: numCaps }))} />
                  </div>
                </FormGroup>
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
                  <Label for="name">Email*</Label>
                  <Input
                    required={true}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="din@email.com"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="extra-donation">Extra donation till ALS-forskningen</Label>
                  <ExtraDonation setDonation={(donationAmount) => setFormState(prev => ({ ...prev, extraDonation: donationAmount }))} />
                </FormGroup>
                <FormGroup>
                  <Label for="info">Information</Label>
                  <Input
                    type="textarea"
                    name="info"
                    id="info"
                    placeholder="T.ex. info om upphämtning"
                    value={formState.info}
                    onChange={handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <FormText color="bold">* obligatoriska fält.</FormText>
                </FormGroup>
                <FormGroup>
                  <Label for="totalAmountToPay">Totalt att betala:</Label>
                  <h5>{calcTotalCost()}kr</h5>
                </FormGroup>
                <FormGroup check>
                  <Label for="checkbox1">
                    <Input
                      id="checkbox1"
                      className="checkbox1"
                      type="checkbox"
                      onClick={() => setFormState(prev => ({ ...prev, consent: !formState.consent }))}
                    />{" "}
                    Jag accepterar att Hensmåla Triathlon sparar data om mig.
                    <Consent
                      buttonText="Vad betyder detta?"
                      title="Information om sparad data"
                    />
                  </Label>
                </FormGroup>
                <RegisterButton text="Beställ!" disabled={!formState.consent || !(isShirtSelected(formState.shirts) || formState.numCaps > 0) || formState.loading} loading={formState.loading} />
              </Form>
              <small>
                This site is protected by reCAPTCHA and the Google{" "}
                <a href="https://policies.google.com/privacy">Privacy Policy</a> and{" "}
                <a href="https://policies.google.com/terms">Terms of Service</a>{" "}
                apply.
              </small>
            </Col>
          </Row>
        </div>
      ) : (
        <RegSuccess type="order" onGoBack={resetState} />
      )}
    </Container>
  )
}
