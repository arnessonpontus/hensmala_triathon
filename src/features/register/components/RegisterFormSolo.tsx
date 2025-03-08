import React, { useEffect, useMemo, useState } from "react";
import { FormGroup, Label, Input, Collapse, FormText, Form } from "reactstrap";
import ExtraDonation from "./ExtraDonation";
import { DayPicker, MonthPicker, YearPicker } from "./TimeAndDate";
import { FormType, RegisterFormSoloState } from "../models";
import { calcTotalProductPrice, scrollToInfo } from "../utils";
import { handleCheckout } from "../service/checkoutService";
import { useErrorModal } from "../../../context/ErrorModalContext";
import useProducts from "../hooks/useProducts";
import { ErrorBanner } from "../../../components/ErrorBanner";
import { RegisterInfo } from "./RegisterInfo";
import RegisterButton from "./RegisterButton";
import { ConsentCheckboxes } from "./ConsentCheckboxes";
import { FormContainer, LeftColumn, ScrollToInfoButton } from "../pages/Register";
import Stripe from "stripe";
import { CouponCodeInput } from "../../../components/CouponCodeInput";
import PurchaseItem, { PurchaseItemsContainer } from "./PurchaseItem";
import { useCart } from "../../../context/CartContext";
import SelectableProductListToggle from "./SelectableProductListToggle";
import { CartItemList } from "./CartItemList";

export const RegisterFormSolo = () => {
  const { loading: productsLoading, products, getProductByName } = useProducts();
  const { cart, addToCart, emptyCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [allConsentsChecked, setAllConsentsChecked] = useState(false);
  const [coupon, setCoupon] = useState<Stripe.Coupon | undefined>();
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  const [formState, setFormState] = useState<RegisterFormSoloState>({
    name1: "",
    email1: "",
    year1: "",
    month1: "",
    day1: "",
    info: "",
    gender: "",
    city1: "",
    extraDonation: 0,
  });

  useEffect(() => {
    const registerProduct = getProductByName("registration-fee-solo");
    if (!productsLoading && registerProduct && !cart.some(i => i.metadata.data_id == "registration-fee-solo")) {
      addToCart(registerProduct, 1)
    }
    return () => {
      emptyCart();
    }
  }, [productsLoading])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormState(prevState => ({ ...prevState, [name]: value }));
  };

  const totalCost = useMemo((): number | null => {
    return calcTotalProductPrice(cart, formState.extraDonation, coupon)
  }, [productsLoading, formState, coupon, cart]);

  const { showErrorModal } = useErrorModal();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await handleCheckout(FormType.Solo, { ...formState, coupon }, cart, showErrorModal);
    setLoading(false)
  };

  return (
    <FormContainer>
      <LeftColumn>
        <Form onSubmit={onSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Anmälan 2025 Individuell</h3>
            <ScrollToInfoButton type="button" onClick={() => scrollToInfo("info-text")}>
              Visa info <i className="fas fa-angle-down angle-down"></i>
            </ScrollToInfoButton>
          </div>
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
                required
                handleChange={handleChange}
                elemName="year1" />
              <MonthPicker
                required
                handleChange={handleChange}
                elemName="month1"
              />
              <DayPicker
                required
                handleChange={handleChange}
                elemName="day1" />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="genderSelection">Kön*</Label>
            <Input
              required
              type="select"
              name="gender"
              id="genderSelection"
              defaultValue={""}
              onChange={handleChange}
            >
              <option disabled value="">
                Välj kön
              </option>
              <option value="Herr">Herr</option>
              <option value="Dam">Dam</option>
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
            <SelectableProductListToggle items={products} isProductsOpen={isProductsOpen} setIsProductsOpen={setIsProductsOpen}/>
            <Collapse isOpen={isProductsOpen}>
              <PurchaseItemsContainer>
                {products.map(p => p.metadata.selectable ? <PurchaseItem product={p} /> : null)}
              </PurchaseItemsContainer>
            </Collapse>
          </FormGroup>
          <FormGroup>
            <Label for="extra-donation">Extra donation till ALS-forskningen</Label>
            <ExtraDonation setDonation={(donationAmount) => setFormState(prev => ({ ...prev, extraDonation: donationAmount }))} />
          </FormGroup>
          <FormGroup>
            <FormText color="bold">* obligatoriska fält.</FormText>
          </FormGroup>
          <ConsentCheckboxes onAllChecked={(allChecked) => setAllConsentsChecked(allChecked)} />
         <CartItemList items={cart} />
          <FormGroup>
            <Label for="totalAmountToPay">Totalt att betala:</Label>
            {totalCost != null ? <h5>{totalCost}kr</h5> : <ErrorBanner text="Kunde inte hämta priser" />}
          </FormGroup>
          <CouponCodeInput enteredCoupon={coupon} onCouponEntered={(coupon) => setCoupon(coupon)} />
          <RegisterButton
            type="submit"
            disabled={!allConsentsChecked || loading}
            loading={loading}
          />
        </Form>
      </LeftColumn>
      <RegisterInfo type="solo" />
    </FormContainer>
  );
};
