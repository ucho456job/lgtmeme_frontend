import { ChangeEvent, KeyboardEvent, useRef } from "react";
import { css, cva } from "@@/styled-system/css";

type Props = {
  css?: string;
  value?: string;
  placeholder?: string;
  icon?: JSX.Element;
  onChange: (value: string) => void;
  onEnterPress?: Function;
};

const TextBox = ({ css, value, placeholder, icon, onChange, onEnterPress }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && inputRef.current) {
      const isIMEActive = inputRef.current.getAttribute("composition") === "true";
      if (!isIMEActive && onEnterPress) onEnterPress();
    }
  };
  return (
    <div className={css}>
      <div className={textBoxWrapCss}>
        <input
          ref={inputRef}
          type="text"
          value={value}
          className={textBoxCss({ icon: icon ? true : false })}
          placeholder={placeholder}
          onChange={handleOnChange}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => inputRef.current?.setAttribute("composition", "true")}
          onCompositionEnd={() => inputRef.current?.removeAttribute("composition")}
        />
        <div className={iconCss}>{icon}</div>
      </div>
    </div>
  );
};

const textBoxWrapCss = css({ position: "relative", width: "100%" });
const textBoxCss = cva({
  base: {
    width: "100%",
    paddingY: "2",
    paddingX: "2.5",
    border: "1px solid #cccccc",
    borderRadius: "lg",
    color: "BLACK",
    position: "relative",
    _focus: {
      outline: "solid 1px #e0e7ff",
    },
  },
  variants: {
    icon: {
      true: { paddingLeft: "9" },
    },
  },
});
const iconCss = css({ position: "absolute", top: "2", left: 2 });

export default TextBox;
