import ImageEditor from "@/app/add/ImageEditor";
import { css } from "@@/styled-system/css";

const Add = () => {
  return (
    <>
      <ImageEditor css={imageEditorCss} />
    </>
  );
};

const imageEditorCss = css({ marginX: "auto", width: "350px" });

export default Add;
