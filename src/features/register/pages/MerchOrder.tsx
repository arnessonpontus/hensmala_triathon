import React, { useEffect, useMemo, useState } from "react";
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
import ExtraDonation from "../components/ExtraDonation";
import ConsentModal from "../../consent/components/ConsentModal";
import RegisterButton from "../components/RegisterButton";

import { BaseOrderType, FormType } from "../models";
import { calcTotalProductPrice } from "../utils";
import { ErrorBanner } from "../../../components/ErrorBanner";
import { DEFAULT_CONTACT_EMAIL } from "../../../Constants";
import { FillCenterLayout } from "../../../components/FillCenterLayout";
import { handleCheckout } from "../service/checkoutService";
import { useErrorModal } from "../../../context/ErrorModalContext";
import { getViteEnvVariable } from "../../../utils";
import { SwishQrImage } from "../components/SwishQrImage";
import Stripe from "stripe";
import { CouponCodeInput } from "../../../components/CouponCodeInput";
import useProducts from "../hooks/useProducts";
import { useCart } from "../../../context/CartContext";
import PurchaseItem, { PurchaseItemsContainer } from "../components/PurchaseItem";
import { CartItemList } from "../components/CartItemList";

export const MerchOrder: React.FC = () => {
  const { loading: productsLoading, products } = useProducts();
  const { cart, emptyCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [hasGivenConsent, setHasGivenConsent] = useState(false);
  const [coupon, setCoupon] = useState<Stripe.Coupon | undefined>();

  const defaultState: BaseOrderType = {
    name1: "",
    email1: "",
    extraDonation: 0,
    info: "",
  }

  const [formState, setFormState] = useState<BaseOrderType>(defaultState);

  useEffect(() => {
    return (() => {
      emptyCart();
    })
  }, [])

  const totalCost = useMemo((): number | null => {
    return calcTotalProductPrice(cart, formState.extraDonation, coupon)
  }, [productsLoading, formState, coupon, cart]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };

  if (getViteEnvVariable("VITE_ALLOW_REGISTRATION") !== "true") {
    return (
      <FillCenterLayout>
        <h2>Beställning av kläder är inte öppnad än.</h2>
        <p>Vi öppnar snart. Vid frågor är det bara att höra av sig till {DEFAULT_CONTACT_EMAIL} </p>
      </FillCenterLayout>
    )
  }

  const { showErrorModal } = useErrorModal();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await handleCheckout(FormType.MerchOrder, { ...formState, coupon: coupon }, cart, showErrorModal);
    setLoading(false)
  };

  return (
    <Container style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <div className="card-box" style={{ marginTop: 40 }}>
        <Row>
          <Col style={{ marginTop: "2vh" }} md={6}>
            <h3>Beställ t-shirt och keps </h3>
            <p>
              <b>
                <i>Sista beställningsdag är 12:e juni</i>
              </b>
            </p>
            <p>Ska du inte delta i årets lopp men ändå ha en superfin t-shirt eller keps från Hensmåla Triathlon? Gör då en beställning här och var med och stöd ALS-forskningen! Beställning kan även göras via anmälan om du ska delta.</p>

            <p>
              När din beställning kommer in noterar vi det och lägger undan kläder till dig.
            </p>
            <p>Upphämtning görs på plats i Hensmåla via dig själv eller någon bekant, <b>vi skickar alltså tyvärr inte kläderna.</b></p>
            <p>Vid frågor kontakta hensmala.triathlon@gmail.com</p>
            <p>Donera gärna även en slant via Swish om du känner för det!</p>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <SwishQrImage />
            </div>
          </Col>
          <Col style={{ marginTop: "2vh" }}>
            <hr className="register-divider"></hr>
            <Form onSubmit={onSubmit}>
              <FormGroup>
                <PurchaseItemsContainer>
                  {products.map(p => p.metadata.selectable ? <PurchaseItem product={p} /> : null)}
                </PurchaseItemsContainer>
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
              <CartItemList items={cart} />
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
                    checked={hasGivenConsent}
                    onClick={() => setHasGivenConsent(prev => !prev)}
                  />{" "}
                  Jag accepterar att Hensmåla Triathlon sparar data om mig.
                  <ConsentModal
                    buttonText="Vad betyder detta?"
                    title="Information om sparad data"
                  />
                </Label>
              </FormGroup>
              <CouponCodeInput enteredCoupon={coupon} onCouponEntered={(coupon) => setCoupon(coupon)} />
              <RegisterButton
                type="submit"
                disabled={!hasGivenConsent || cart.length < 1 || loading}
                loading={loading}
              />
            </Form>
          </Col>
        </Row>
      </div>
    </Container>
  )
}
