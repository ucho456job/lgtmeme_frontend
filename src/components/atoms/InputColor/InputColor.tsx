import { ChangeEvent } from "react";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  value: string;
  onChange: (value: string) => void;
};

const ColorInput = ({ css, value, onChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  return (
    <div className={css}>
      <input
        className={inputCss}
        type="color"
        list="datalist"
        value={value}
        onChange={handleChange}
      />
      <datalist id="datalist">
        <option value="#ffffff"></option>
        <option value="#f43f5e"></option>
        <option value="#ec4899"></option>
        <option value="#d946ef"></option>
        <option value="#a855f7"></option>
        <option value="#8b5cf6"></option>
        <option value="#6366f1"></option>
        <option value="#3b82f6"></option>
        <option value="#0ea5e9"></option>
        <option value="#06b6d4"></option>
        <option value="#14b8a6"></option>
        <option value="#10b981"></option>
        <option value="#22c55e"></option>
        <option value="#84cc16"></option>
        <option value="#eab308"></option>
        <option value="#f59e0b"></option>
        <option value="#f97316"></option>
        <option value="#ef4444"></option>
        <option value="#737373"></option>
        <option value="#78716c"></option>
        <option value="#71717a"></option>
        <option value="#6b7280"></option>
        <option value="#64748b"></option>
        <option value="#000000"></option>
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
