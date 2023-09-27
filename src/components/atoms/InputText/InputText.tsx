import { useRef } from "react";
import { MAX_KEYWORD_LENGTH } from "@/constants/image";
import { css, cva } from "@@/styled-system/css";

type Props = {
  css?: string;
  value?: string;
  placeholder?: string;
  maxLength?: number;
  icon?: JSX.Element;
  onChange: (value: string) => void;
  onEnterPress?: Function;
};

const TextBox = ({ css, value, placeholder, maxLength, icon, onChange, onEnterPress }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
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
          maxLength={maxLength || MAX_KEYWORD_LENGTH}
          value={value}
          className={textBoxRecipe({ icon: icon ? true : false })}
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
const textBoxRecipe = cva({
  base: {
    display: "block",
    width: "100%",
    height: "32px",
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
