import { useEffect, useMemo, useState } from "react";
import { useCart } from "../../../context/CartContext";
import useProducts from "../hooks/useProducts";
import { FormContainer, LeftColumn, ScrollToInfoButton } from "../pages/Register";
import { RegisterInfoKids } from "./RegisterInfoKids";
import { FormType, RegisterFormKidsState } from "../models";
import { calcTotalProductPrice, scrollToInfo } from "../utils";
import { useErrorModal } from "../../../context/ErrorModalContext";
import { handleCheckout } from "../service/checkoutService";
import { Form, FormGroup, Label, Input, Collapse, FormText } from "reactstrap";
import { ErrorBanner } from "../../../components/ErrorBanner";
import { CartItemList } from "./CartItemList";
import { ConsentCheckboxes } from "./ConsentCheckboxes";
import ExtraDonation from "./ExtraDonation";
import PurchaseItem, { PurchaseItemsContainer } from "./PurchaseItem";
import RegisterButton from "./RegisterButton";
import SelectableProductListToggle from "./SelectableProductListToggle";
import { YearPicker } from "./TimeAndDate";

export const RegisterFormKids = () => {
  const { loading: productsLoading, products, getProductByName } = useProducts();
  const { cart, addToCart, emptyCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [allConsentsChecked, setAllConsentsChecked] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(true);

  const [formState, setFormState] = useState<RegisterFormKidsState>({
    name1: "",
    email1: "",
    year1: "",
    info: "",
    extraDonation: 0,
  });

  useEffect(() => {
    const registerProduct = getProductByName("registration-fee-kids");
    if (!productsLoading && registerProduct && !cart.some(i => i.metadata.data_id == "registration-fee-kids")) {
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
    return calcTotalProductPrice(cart, formState.extraDonation, undefined)
  }, [productsLoading, formState, cart]);

  const { showErrorModal } = useErrorModal();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await handleCheckout(FormType.Kids, { ...formState }, cart, showErrorModal);
    setLoading(false)
  };

  return (
    <FormContainer>
      <LeftColumn>
        <Form onSubmit={onSubmit}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Anmälan 2025 Barn</h3>
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
            <Label>Ålder vid genomförandet</Label>
            <div style={{ display: "flex" }}>
              <YearPicker
                kidsMode
                required
                handleChange={handleChange}
                elemName="year1" />
            </div>
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
          <RegisterButton
            type="submit"
            disabled={!allConsentsChecked || loading}
            loading={loading}
          />
        </Form>
      </LeftColumn>
      <RegisterInfoKids />
    </FormContainer>
  );
};
