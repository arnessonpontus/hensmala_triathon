import React from "react";
import styled from "styled-components";

interface ChipProps {
  label: string;
  color?: string;
  variant?: "filled" | "outlined";
}

const ChipContainer = styled.div<{ color: string; variant: "filled" | "outlined" }>`
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  border-radius: 16px;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) => (props.variant === "outlined" ? props.color : "#fff")};
  background-color: ${(props) => (props.variant === "filled" ? props.color : "transparent")};
  border: ${(props) => (props.variant === "outlined" ? `1px solid ${props.color}` : "none")};
  cursor: default;
  gap: 6px;
`;

const Chip: React.FC<ChipProps> = ({ label, color = "#7a7a7a", variant = "filled" }) => {
  return <ChipContainer color={color} variant={variant}>{label}</ChipContainer>;
};

export default Chip;
