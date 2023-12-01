"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button/Button";
import Modal from "@/components/molecules/Modal/Modal";
import { IMAGE_SIZE, PATCH_IMAGE_REQUEST_TYPE_REPORT } from "@/constants/image";
import { ImageService } from "@/services/image.service";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  image: Image | null;
  onClickClose: () => void;
};

const ReportModal = ({ css, image, onClickClose }: Props) => {
  const handleClose = () => onClickClose();

  const [modal, setModal] = useState({ message: "", show: false });

  const handleReport = async () => {
    try {
      if (!image) return;
      const service = new ImageService();
      const res = await service.patchImage(image.id, {
        requestType: PATCH_IMAGE_REQUEST_TYPE_REPORT,
      });
      const message = res.ok
        ? "The report was successful! Please wait a moment for the operator to confirm."
        : res.message;
      setModal({ message, show: true });
    } catch {
      setModal({ message: "Report failed. Please try again later.", show: true });
    }
  };

  const handleComplete = () => {
    setModal({ message: "", show: false });
    onClickClose();
  };

  return (
    image && (
      <div className={css}>
        <div className={backgroundCss}>
          <div className={modalCss}>
            <Image src={image.url} alt="LGTM" width={IMAGE_SIZE} height={IMAGE_SIZE} />
            <div className={messageCss}>
              <p>
                Would you like to report an image that may be inappropriate or violate
                copyright/privacy?
              </p>
            </div>
            <div className={buttonsCss}>
              <Button visual="text" size="sm" onClick={handleClose}>
                Close
              </Button>
              <Button visual="text" size="sm" onClick={handleReport}>
                Send
              </Button>
            </div>
          </div>
        </div>
        <Modal {...modal} onClick={handleComplete} />
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
  height: "420px",
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
  height: "80px",
});
const buttonsCss = css({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "3",
});

export default ReportModal;
