import { useEffect } from "react";
import { ElevatedButton } from "../../../components/Button/ElevatedButton";
import { FillCenterLayout } from "../../../components/FillCenterLayout";

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
    <FillCenterLayout
    >
      <h2>{props.type === "register" ? "Tack för din anmälan!" : "Tack för din beställning!"}</h2>
      <ElevatedButton isSecondary
        onClick={() => {
          props.onGoBack();
        }}
      >
        {props.type === "register" ? "Registrera fler" : "Beställ mer"}
      </ElevatedButton>
    </FillCenterLayout>
  );
}
