import { Dispatch, KeyboardEvent, SetStateAction, useRef } from "react";
import Image from "next/image";
import { css, cva } from "@@/styled-system/css";

type Props = {
  css?: string;
  value?: string;
  placeholder?: string;
  iconPath?: string;
  onChange: Dispatch<SetStateAction<string>>;
  onEnterPress?: Function;
};

const TextBox = ({ css, value, placeholder, iconPath, onChange, onEnterPress }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputRef.current) {
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
          className={textBoxCss({ iconPath: iconPath ? true : false })}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onCompositionStart={() => inputRef.current?.setAttribute("composition", "true")}
          onCompositionEnd={() => inputRef.current?.removeAttribute("composition")}
        />
        {iconPath && <Image src={iconPath} className={iconCss} width={25} height={25} alt="icon" />}
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
    border: "1px solid #e5e5e5",
    borderRadius: "lg",
    color: "BLACK",
    position: "relative",
    _focus: {
      outline: "solid 1px #e0e7ff",
    },
  },
  variants: {
    iconPath: {
      true: { paddingLeft: "9" },
    },
  },
});
const iconCss = css({ position: "absolute", top: "2", left: 2 });

export default TextBox;
