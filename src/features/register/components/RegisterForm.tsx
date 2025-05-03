import React, { useEffect, useMemo, useState } from "react";
import { FormGroup, Label, Collapse, FormText, Form } from "reactstrap";
import ExtraDonation from "./ExtraDonation";
import { AnyFormstate, FormType, productType } from "../models";
import { calcTotalProductPrice, getEmptyFormState, scrollToInfo } from "../utils";
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
import { RegisterFormTeam } from "./RegisterFormTeam";
import { RegisterFormKids } from "./RegisterFormKids";
import { RegisterFormSolo } from "./RegisterFormSolo";
import { RegisterInfoKids } from "./RegisterInfoKids";

type Props = {
  type: FormType
}

export type FormElementsProps = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const formTypeToProductType = (type: FormType): productType => {
  switch (type) {
    case FormType.Kids:
      return "registration-fee-kids"
    case FormType.Team:
      return "registration-fee-team"
    default:
      return "registration-fee-solo"
  }
}

const getFormTitle = (type: FormType): string => {
  switch (type) {
    case FormType.Kids:
      return "Anmälan 2025 Barn"
    case FormType.Team:
      return "Anmälan 2025 Lag"
    default:
      return "Anmälan 2025 Individuell"
  }
}
export const RegisterForm = ({ type }: Props) => {
  const { loading: productsLoading, products, getProductByName } = useProducts();
  const { cart, addToCart, emptyCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [allConsentsChecked, setAllConsentsChecked] = useState(false);
  const [coupon, setCoupon] = useState<Stripe.Coupon | undefined>();
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  const [formState, setFormState] = useState<AnyFormstate>(getEmptyFormState(type));

  useEffect(() => {
    setFormState(getEmptyFormState(type))
    const productType = formTypeToProductType(type)
    const registerProduct = getProductByName(productType);
    if (!productsLoading && registerProduct && !cart.some(i => i.metadata.data_id === productType)) {
      addToCart(registerProduct, 1)
    }
    return () => {
      emptyCart();
    }
  }, [productsLoading, type])

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
    await handleCheckout(type, { ...formState, coupon }, cart, showErrorModal);
    setLoading(false)
  };

  return (
    <FormContainer>
      <LeftColumn>
        <Form onSubmit={onSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>{getFormTitle(type)}</h3>
            <ScrollToInfoButton type="button" onClick={() => scrollToInfo("info-text")}>
              Visa info <i className="fas fa-angle-down angle-down"></i>
            </ScrollToInfoButton>
          </div>
          {type === FormType.Team ? <RegisterFormTeam handleChange={handleChange} />
            : type === FormType.Kids ? <RegisterFormKids handleChange={handleChange} />
              : <RegisterFormSolo handleChange={handleChange} />
          }
          <FormGroup>
            <SelectableProductListToggle items={products} isProductsOpen={isProductsOpen} setIsProductsOpen={setIsProductsOpen} />
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
         {type !== FormType.Kids &&  <CouponCodeInput enteredCoupon={coupon} onCouponEntered={(coupon) => setCoupon(coupon)} />}
          <RegisterButton
            type="submit"
            disabled={!allConsentsChecked || loading}
            loading={loading}
          />
        </Form>
      </LeftColumn>
      {type === FormType.Team || type === FormType.Solo  ? <RegisterInfo type={type} /> : <RegisterInfoKids />}
    </FormContainer>
  );
};
