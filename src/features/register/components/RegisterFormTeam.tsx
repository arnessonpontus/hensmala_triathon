import React, { useMemo, useState } from "react";
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
} from "reactstrap";
import ShirtSelect from "./ShirtSelect";
import CapSelect from "./CapSelect";
import ExtraDonation from "./ExtraDonation";
import { DayPicker, MonthPicker, YearPicker } from "./TimeAndDate";
import { FormType, RegisterFormTeamState } from "../models";
import { calcTotalRegisterPrice, getInverseDiscountFromPercentOff, scrollToInfo } from "../utils";
import { handleCheckout } from "../service/checkoutService";
import { useErrorModal } from "../../../context/ErrorModalContext";
import usePrices from "../hooks/usePrices";
import { ErrorBanner } from "../../../components/ErrorBanner";
import { RegisterInfo } from "./RegisterInfo";
import RegisterButton from "./RegisterButton";
import { ConsentCheckboxes } from "./ConsentCheckboxes";
import { ScrollToInfoButton } from "../pages/Register";
import Stripe from "stripe";
import { CouponCodeInput } from "../../../components/CouponCodeInput";

export const RegisterFormTeam = () => {
  const { loading: priceLoading, getPriceByName } = usePrices();
  const [loading, setLoading] = useState(false);
  const [allConsentsChecked, setAllConsentsChecked] = useState(false);
  const [coupon, setCoupon] = useState<Stripe.Coupon | undefined>();

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
    shirts: [],
    numCaps: 0,
    extraDonation: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value }));
  };


  const totalCost = useMemo(() => {
    const discount = getInverseDiscountFromPercentOff(coupon?.percent_off);
    return calcTotalRegisterPrice(
      getPriceByName("bomull"),
      getPriceByName("funktion"),
      getPriceByName("keps"),
      getPriceByName("registration-fee-team"),
      formState.numCaps,
      formState.shirts,
      formState.extraDonation,
      discount)
  }, [priceLoading, formState, coupon]);

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    await handleCheckout(FormType.Team, {...formState, coupon}, showErrorModal);
    setLoading(false)
  };

  return (
    <Row>
      <Col style={{ marginTop: "2vh" }} md={6}>
        <Form
          onSubmit={onSubmit}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h3>Anmälan 2025 Lag</h3>
            <ScrollToInfoButton onClick={() => scrollToInfo("info-text")}>
              Visa info<i className="fas fa-angle-down angle-down"></i>
            </ScrollToInfoButton>
          </div>
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
            <Label for="clothes-select">Lägg till t-shirt (Bomull {getPriceByName("bomull")}kr, Funktion {getPriceByName("funktion")}kr)</Label>
            <div className="clothes-select">
              <ShirtSelect updateShirtSelection={(newShirts) => setFormState(prev => ({ ...prev, shirts: newShirts }))} />
            </div>
            <Label className="mt-2">Lägg till keps ({[getPriceByName("keps")]}kr)</Label>
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
          <ConsentCheckboxes onAllChecked={(allChecked) => setAllConsentsChecked(allChecked)}/>
          <FormGroup>
            <Label for="totalAmountToPay">Totalt att betala:</Label>
            {totalCost != null ? <h5>{totalCost}kr</h5> : <ErrorBanner text="Kunde inte hämta priser" />}
          </FormGroup>

          <CouponCodeInput enteredCoupon={coupon} onCouponEntered={(coupon) => setCoupon(coupon)}/>
          <RegisterButton
              type="submit"
              disabled={!allConsentsChecked || loading}
              loading={loading}
            />
        </Form>
      </Col>
      <RegisterInfo type={"team"}/>
    </Row>
  );
}
