import { MouseEventHandler, ReactNode } from "react";
import { cva } from "@@/styled-system/css";

type Props = {
  variant?: "contained" | "text";
  color?: "black" | "red";
  size?: "xs" | "sm" | "md" | "lg";
  disabled?: boolean;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({ variant, color, size, disabled, children, onClick }: Props) => {
  return (
    <button
      className={recipe({ variant, size, color, disabled })}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

const recipe = cva({
  base: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    padding: "4",
    borderRadius: "lg",
    border: "none",
    outline: "none",
    textDecoration: "none",
    fontWeight: "bold",
    _hover: { opacity: 0.8 },
    _active: { opacity: 1 },
  },
  variants: {
    variant: {
      contained: {},
      text: {},
    },
    color: {
      black: { color: "BLACK" },
      red: { color: "RED" },
    },
    size: {
      xs: { padding: "1", fontSize: "xs", minWidth: "12" },
      sm: { padding: "2", fontSize: "sm", minWidth: "15" },
      md: { padding: "3", fontSize: "md", minWidth: "18" },
      lg: { padding: "4", fontSize: "lg", minWidth: "21" },
    },
    disabled: {
      true: { opacity: 0.5, cursor: "not-allowed" },
    },
  },
  compoundVariants: [
    {
      variant: "contained",
      color: "black",
      css: { bgColor: "BLACK", color: "WHITE" },
    },
    {
      variant: "contained",
      color: "red",
      css: { bgColor: "RED", color: "WHITE" },
    },
  ],
  defaultVariants: { variant: "contained", color: "black", size: "md", disabled: false },
});

export default Button;
