import { useEffect } from "react";
import { Container } from "reactstrap";

interface RegSuccessProps {
  type: "register" | "order",
  onGoBack: () => void
}

export const RegSuccess = (props: RegSuccessProps) => {
  useEffect(() => {
    // Remove Lastpass element bug
    document.querySelector('div[data-lastpass-root]')?.remove();
  }, [])

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <h2>{props.type === "register" ? "Tack för din anmälan!" : "Tack för din beställning!"}</h2>
      <div
        className="button-style"
        style={{
          textDecoration: "none",
          backgroundColor: "#11999E",
          color: "white",
        }}
        onClick={() => {
          props.onGoBack();
        }}
      >
        {props.type === "register" ? "Registrera fler" : "Beställ mer"}
      </div>
    </Container>
  );
}
