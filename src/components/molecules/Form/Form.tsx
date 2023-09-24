import { css, cva } from "@@/styled-system/css";

type Props = {
  css?: string;
  size?: "sm" | "md" | "lg";
  label: string;
  isUnderLine?: boolean;
  children: JSX.Element;
};

const Form = ({ css, size, label, children, isUnderLine }: Props) => {
  return (
    <div className={css}>
      <div className={formCss({ isUnderLine, size })}>
        <div className={labelCss}>{label}</div>
        <div className={inputCss}>{children}</div>
      </div>
    </div>
  );
};

const formCss = cva({
  base: {
    borderX: "1px solid #e5e5e5",
    borderTop: "1px solid #e5e5e5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "auto",
    textAlign: "center",
    height: "50px",
    lineHeight: "50px",
    bgColor: "WHITE",
  },
  variants: {
    isUnderLine: {
      true: { borderBottom: "1px solid #e5e5e5" },
    },
    size: {
      sm: { width: "350px", height: "50px" },
      md: { width: "500px" },
      lg: { width: "650px" },
    },
  },
  defaultVariants: { isUnderLine: false, size: "sm" },
});
const labelCss = css({ width: "40%", textAlign: "center", borderRight: "1px solid #e5e5e5" });
const inputCss = css({ width: "60%", textAlign: "center" });

export default Form;
