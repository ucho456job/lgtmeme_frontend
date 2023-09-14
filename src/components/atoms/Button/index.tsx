import { MouseEventHandler } from "react";
import { cva } from "@@/styled-system/css";

type Props = {
  css?: string;
  visual?: "solid" | "text";
  color?: "black" | "red" | "yellow" | "lightPink";
  size?: "xs" | "sm" | "md" | "lg";
  radius?: boolean;
  disabled?: boolean;
  iconPath?: string;
  children?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const Button = ({
  css,
  visual,
  color,
  size,
  radius,
  disabled,
  iconPath,
  children,
  onClick,
}: Props) => {
  return (
    <div className={css}>
      <button
        className={buttonRecipe({ visual, color, size, radius, disabled })}
        disabled={disabled}
        onClick={onClick}
      >
        {iconPath && (
          <img
            src={iconPath}
            className={iconRecipe({ size, children: children ? true : false })}
            alt="icon"
          />
        )}
        {children}
      </button>
    </div>
  );
};

const buttonRecipe = cva({
  base: {
    cursor: "pointer",
    display: "inline-flex",
    alignItems: "center",
    padding: "4",
    border: "none",
    outline: "none",
    textDecoration: "none",
    fontWeight: "bold",
    _hover: { opacity: 0.8 },
    _active: { opacity: 1 },
  },
  variants: {
    visual: {
      solid: {},
      text: {},
    },
    color: {
      black: { color: "BLACK" },
      red: { color: "RED" },
      yellow: { bgColor: "YELLOW" },
      lightPink: { bgColor: "LIGHT_PINK" },
    },
    size: {
      xs: { padding: "1", fontSize: "xs", minWidth: "12" },
      sm: { padding: "2", fontSize: "sm", minWidth: "15" },
      md: { padding: "3", fontSize: "md", minWidth: "18" },
      lg: { padding: "4", fontSize: "lg", minWidth: "21" },
    },
    radius: {
      true: { borderRadius: "lg" },
    },
    disabled: {
      true: { opacity: 0.5, cursor: "not-allowed" },
    },
  },
  compoundVariants: [
    {
      visual: "solid",
      color: "black",
      css: { bgColor: "BLACK", color: "WHITE" },
    },
    {
      visual: "solid",
      color: "red",
      css: { bgColor: "RED", color: "WHITE" },
    },
  ],
  defaultVariants: {
    visual: "solid",
    color: "black",
    size: "md",
    radius: true,
    disabled: false,
  },
});
const iconRecipe = cva({
  variants: {
    size: {
      xs: { height: "15px", width: "15px" },
      sm: { height: "15px", width: "15px" },
      md: { height: "20px", width: "20px" },
      lg: { height: "23px", width: "23px" },
    },
    children: {
      true: { marginRight: "1" },
      false: { marginRight: "0" },
    },
  },
  defaultVariants: { size: "md", children: false },
});

export default Button;
