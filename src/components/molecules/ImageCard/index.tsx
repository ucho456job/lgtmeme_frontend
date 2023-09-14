"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  image: {
    id: number;
    title: string;
    url: string;
    width: number;
    height: number;
  };
};

const ImageCard = ({ css, image }: Props) => {
  const handleCopy = () => {
    console.log("copy");
  };

  const [isFavarite, setIsFavarite] = useState(false);
  const handleToggleFavarite = () => {
    setIsFavarite(!isFavarite);
  };

  const handleReport = () => {
    console.log("report");
  };

  if (!image) return <></>;
  return (
    <div className={css}>
      <div className={cardCss}>
        <div className={imageContainerCss}>
          <Image
            className={imageCss}
            src={image.url}
            height={image.height}
            width={image.width}
            alt="LGTM"
            priority
          />
        </div>
        <p className={titleCss}>{image.title}</p>
        <div className={buttonsCss}>
          <Button css={buttonCss} size="sm" iconPath="/images/copy.svg" onClick={handleCopy}>
            Copy
          </Button>
          <Button
            css={buttonCss}
            size="sm"
            color="lightPink"
            iconPath={isFavarite ? "/images/heart-solid.svg" : "/images/heart-outline.svg"}
            onClick={handleToggleFavarite}
          >
            Favorite
          </Button>
          <Button
            css={buttonCss}
            size="sm"
            color="yellow"
            iconPath="/images/flag.svg"
            onClick={handleReport}
          >
            Report
          </Button>
        </div>
      </div>
    </div>
  );
};

const cardCss = css({ width: "350px", height: "450px", padding: "25px", boxShadow: "lg" });
const imageContainerCss = css({
  position: "relative",
  width: "300px",
  height: "300px",
  border: "1px solid",
  borderColor: "GRAY",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflow: "hidden",
});
const imageCss = css({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "100%",
  maxHeight: "100%",
});
const titleCss = css({ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" });
const buttonsCss = css({ display: "flex", marginTop: "3", justifyContent: "center" });
const buttonCss = css({ marginX: "1" });

export default ImageCard;
