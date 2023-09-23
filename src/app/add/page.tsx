import ImageEditor from "@/app/add/ImageEditor";
import { css } from "@@/styled-system/css";

const Add = () => {
  return (
    <>
      <ImageEditor css={imageEditorCss} />
    </>
  );
};

const imageEditorCss = css({
  paddingTop: "30px",
  marginX: "auto",
  width: "350px",
  md: { width: "700px" },
});

export default Add;
