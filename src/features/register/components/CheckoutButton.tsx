import { Button, ButtonProps, Spinner } from "reactstrap";
import { Shirt } from '../models';
import { handleCheckout } from '../service/checkoutService';
import { useErrorModal } from "../../../context/ErrorModalContext";

interface CheckoutButtonProps extends ButtonProps {
  registrationType: "registration-fee-solo" | "registration-fee-team"
  shirts: Shirt[],
  numCaps: number,
  text: string,
  loading: boolean,
  disabled: boolean
}
//#TODO ta bort?
const CheckoutButton = (props: CheckoutButtonProps) => {
  const { registrationType, shirts, numCaps, text, loading, disabled } = props;

  const handleCheckoutClick = () => {
    handleCheckout(registrationType, shirts, numCaps, useErrorModal);
  }

  return (
    <div>
      <Button
        onClick={handleCheckoutClick}
        className="mt-2"
        style={{ minWidth: "140px", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
        disabled={disabled}
      >
        {loading ? (
          <Spinner size="sm" color="light" />
        ) : (text)}
      </Button>
    </div>
  );
};

export default CheckoutButton;
