import { ButtonProps, Spinner } from "reactstrap";
import { PrimaryButton } from "../../../components/Button/PrimaryButton";

interface RegisterButtonProps extends ButtonProps {
  loading: boolean,
  disabled: boolean
}

const RegisterButton = (props: RegisterButtonProps) => {
  const { loading, disabled } = props;
  return (
    <PrimaryButton
      style={{minWidth: 150}}
      disabled={disabled}
    >
      {loading ? (
        <Spinner size="sm" color="light" />
      ) : "Gå till betalning"}
    </PrimaryButton>
  )
}

export default RegisterButton;
