import Button from "@/components/atoms/Button/Button";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  message: string;
  showModal: boolean;
  onClick: () => void;
};

const Modal = ({ css, message, showModal, onClick }: Props) => {
  const handleClick = () => onClick();
  return (
    showModal && (
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
    )
  );
};

const backgroundCss = css({
  width: "100vw",
  height: "100vh",
  bgColor: "rgba(0, 0, 0, 0.7)",
  position: "fixed",
  top: 0,
  right: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
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
