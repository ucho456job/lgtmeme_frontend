import { ChangeEvent } from "react";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  value: string | number;
  options: {
    value: string | number;
    label: string;
  }[];
  onChange: Function;
};

const SelectBox = ({ css, value, options, onChange }: Props) => {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => onChange(e);
  return (
    <div className={css}>
      <label className={labelCss}>
        <select className={selectBoxCss} value={value} onChange={handleChange}>
          {options.map((o) => (
            <option key={o.label} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

const labelCss = css({
  display: "inline-flex",
  alignItems: "center",
  position: "relative",
  _after: {
    position: "absolute",
    right: "4",
    width: "3",
    height: "2",
    bgColor: "BLACK",
    clipPath: "polygon(0, 0, 100%, 0, 50% 100%)",
    content: "",
    pointerEvents: "none",
  },
});

const selectBoxCss = css({
  minWidth: "40",
  height: "8",
  border: "1px solid #cccccc",
  borderRadius: "2",
  bgColor: "WHITE",
  color: "BLACK",
  cursor: "pointer",
  _focus: {
    outline: "none",
  },
});

export default SelectBox;
