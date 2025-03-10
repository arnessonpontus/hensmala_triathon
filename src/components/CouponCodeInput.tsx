import React from "react";
import { Input, Label } from "reactstrap";
import styled from "styled-components";
import { matchCoupon } from "../features/register/service/priceService";
import Stripe from "stripe";
import _ from 'lodash';
import { PRIMARY_COLOR } from "../Constants";

export const CouponInputWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-end;
  padding-bottom: 10px;
`;

interface CouponCodeInputProps {
  onCouponEntered: (coupon: Stripe.Coupon) => void;
  enteredCoupon?: Stripe.Coupon;
}

export const CouponCodeInput: React.FC<CouponCodeInputProps> = ({ onCouponEntered, enteredCoupon }: CouponCodeInputProps) => {
  const searchCode = _.debounce(async (code: string) => {
    const validCouponCode = await matchCoupon(code);

    if (validCouponCode) {
      onCouponEntered(validCouponCode);
    }
  }, 400)

  return (
    <>
      <CouponInputWrapper>
        <div>
          <Label for="couponInput">Företagskod</Label>
          <Input
            type="text"
            name="coupon"
            id="couponInput"
            onChange={(e) => searchCode(e.target.value)}
          />
        </div>
      </CouponInputWrapper>
      {enteredCoupon && enteredCoupon.name &&
        <p><strong style={{ color: PRIMARY_COLOR }}>{enteredCoupon.name}</strong> ger dig rabatt med <strong>{enteredCoupon.percent_off}%</strong></p>
      }
    </>
  );
}
