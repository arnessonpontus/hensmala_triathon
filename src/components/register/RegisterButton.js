import React from "react";
import { Button, Spinner } from "reactstrap";

const RegisterButton = (props) => {
    const {text, loading, disabled} = props;
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
    )}

export default RegisterButton;