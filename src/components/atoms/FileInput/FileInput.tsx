import { ChangeEvent, useRef } from "react";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const FileInput = ({ css, onChange }: Props) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  return (
    <div className={css}>
      <label className={labelCss}>
        Select file
        <input
          className={inputCss}
          type="file"
          accept="image/*"
          ref={inputRef}
          onChange={onChange}
        />
      </label>
    </div>
  );
};

const labelCss = css({
  paddingY: "1.5",
  paddingX: "10",
  color: "WHITE",
  bgColor: "BLACK",
  cursor: "pointer",
  borderRadius: "sm",
  _hover: { opacity: "0.8" },
});
const inputCss = css({ display: "none" });

export default FileInput;
