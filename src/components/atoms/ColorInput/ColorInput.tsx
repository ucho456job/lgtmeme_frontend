import { ChangeEvent } from "react";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const ColorInput = ({ css, value, onChange }: Props) => {
  return (
    <div className={css}>
      <input className={inputCss} type="color" list="datalist" value={value} onChange={onChange} />
      <datalist id="datalist">
        <option value="#ff0000"></option>
        <option value="#00ff00"></option>
        <option value="#0000ff"></option>
      </datalist>
    </div>
  );
};

const inputCss = css({
  cursor: "pointer",
  width: "150px",
  height: "8",
  marginTop: "9px",
  border: "1px solid #cccccc",
  borderRadius: "sm",
  bgColor: "WHITE",
});

export default ColorInput;
