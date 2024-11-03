import React from "react";
import { Button, ButtonProps, Spinner } from "reactstrap";

interface RegisterButtonProps extends ButtonProps {
  text: string,
  loading: boolean,
  disabled: boolean
}

const RegisterButton = (props: RegisterButtonProps) => {
  const { text, loading, disabled } = props;
  return (
    <Button
      className="mt-2"
      style={{ minWidth: "140px", minHeight: "40px", display: "flex", alignItems: "center", justifyContent: "center" }}
      disabled={disabled}
    >
      {loading ? (
        <Spinner size="sm" color="light" />
      ) : (text)}
    </Button>
  )
}

export default RegisterButton;