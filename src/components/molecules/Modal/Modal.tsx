import Button from "@/components/atoms/Button/Button";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  message: string;
  onClick: () => void;
};

const Modal = ({ css, message, onClick }: Props) => {
  const handleClick = () => onClick();
  return (
    <div className={css}>
      <div className={backgroundCss}>
        <div className={modalCss}>
          <div className={messageCss}>
            <p>{message}</p>
          </div>
          <Button css={buttonCss} visual="text" size="sm" onClick={handleClick}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

const backgroundCss = css({
  width: "100vw",
  height: "100vh",
  bgColor: "rgba(200, 200, 200)",
  position: "fixed",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
const modalCss = css({
  width: "300px",
  height: "100px",
  borderRadius: "lg",
  bgColor: "WHITE",
  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
  display: "flex",
  flexDirection: "column",
  paddingX: "25px",
  paddingTop: "15px",
});
const messageCss = css({
  width: "250px",
  height: "48px",
});
const buttonCss = css({ marginX: "auto" });

export default Modal;
