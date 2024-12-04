import React, { useMemo, useState } from "react";
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
import ShirtSelect from "../components/ShirtSelect";
import CapSelect from "../components/CapSelect";
import ExtraDonation from "../components/ExtraDonation";
import Consent from "../../../components/Consent";
import RegisterButton from "../components/RegisterButton";

import { FormType, OrderShirtState } from "../models";
import { RegSuccess } from "../components/RegSuccess";
import { calcShirtPrice, hasValidShirt } from "../utils";
import usePrices from "../hooks/usePrices";
import { ErrorBanner } from "../../../components/ErrorBanner";
import { DEFAULT_CONTACT_EMAIL } from "../../../Constants";
import { FillCenterLayout } from "../../../components/FillCenterLayout";
import { handleCheckout } from "../service/checkoutService";
import { useErrorModal } from "../../../context/ErrorModalContext";

export const OrderShirt: React.FC = () => {
  const { loading, getPriceByName } = usePrices();

  const defaultState: OrderShirtState = {
    name1: "",
    email1: "",
    extraDonation: 0,
    shirts: [],
    numCaps: 0,
    info: "",
    consent: false,
    hasOrdered: false,
    loading: false,
  }

  const [formState, setFormState] = useState<OrderShirtState>(defaultState);

  const totalCost = useMemo(() => {
    const cottonPrice = getPriceByName("bomull");
    const functionPrice = getPriceByName("funktion");
    const capPrice = getPriceByName("keps");

    if (!cottonPrice || !functionPrice || !capPrice) {
      return null
    }

    return (
      formState.extraDonation +
      calcShirtPrice(formState.shirts, cottonPrice, functionPrice) +
      formState.numCaps * capPrice
    );
  }, [formState, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  const resetState = () => {
    setFormState(defaultState);
  };

  if (!import.meta.env.VITE_ALLOW_REGISTRATION) {
    return (
      <FillCenterLayout>
        <h2>Beställning av kläder är inte öppnad än.</h2>
        <p>Vi öppnar snart. Vid frågor är det bara att höra av sig till {DEFAULT_CONTACT_EMAIL} </p>
      </FillCenterLayout>
    )
  }

  const { showErrorModal } = useErrorModal();

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleCheckout(FormType.TShirtOrder, formState, showErrorModal);
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
              <Form onSubmit={onSubmit}>
                <FormGroup>
                  <Label for="clothes-select">Välj antal och storlek (Bomull {getPriceByName("bomull")}kr, Funktion {getPriceByName("funktion")}kr)</Label>
                  <div className="clothes-select">
                    <ShirtSelect updateShirtSelection={(newShirts) => { setFormState(prev => ({ ...prev, shirts: newShirts })) }} />
                  </div>
                  <Label className="mt-2">Lägg till keps ({getPriceByName("keps")}kr)</Label>
                  <div className="clothes-select">
                    <CapSelect updateCapSelection={(numCaps) => setFormState(prev => ({ ...prev, numCaps: numCaps }))} />
                  </div>
                </FormGroup>
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
                  <Label for="name">Email*</Label>
                  <Input
                    required={true}
                    type="email"
                    name="email1"
                    id="email1"
                    placeholder="din@email.com"
                    value={formState.email1}
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
                  {totalCost != null ? <h5>{totalCost}kr</h5> : <ErrorBanner text="Kunde inte hämta priser" />}
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
                <RegisterButton
                type="submit"
                disabled={!formState.consent || !(hasValidShirt(formState.shirts) || formState.numCaps > 0) || formState.loading}
                loading={formState.loading}
              />
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
