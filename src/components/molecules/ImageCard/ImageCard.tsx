"use client";

import Image from "next/image";
import Button from "@/components/atoms/Button/Button";
import Svg from "@/components/atoms/Svg/Svg";
import { IMAGE_SIZE } from "@/constants/image";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  image: Image;
  isFavarite: boolean;
  onClickCopy: Function;
  onClickFavarite: (isFavarite: boolean) => void;
};

const ImageCard = ({ css, image, isFavarite, onClickCopy, onClickFavarite }: Props) => {
  const handleClickCopy = () => onClickCopy();
  const handleClickFavarite = () => onClickFavarite(isFavarite);
  // const handleClickReport = () => {};
  if (!image) return <></>;
  return (
    <div className={css}>
      <div className={cardCss}>
        <div className={imageContainerCss}>
          <Image
            className={imageCss}
            src={image.url}
            height={IMAGE_SIZE}
            width={IMAGE_SIZE}
            alt="LGTM"
            priority
          />
        </div>
        <div className={buttonsCss}>
          <Button
            css={buttonCss}
            size="sm"
            icon={<Svg icon="copy" color="white" size="md" />}
            onClick={handleClickCopy}
          >
            Copy
          </Button>
          <Button
            css={buttonCss}
            size="sm"
            color="lightPink"
            icon={
              <Svg
                icon="heart"
                color="pink"
                size="md"
                fillStyle={isFavarite ? "solid" : "outline"}
              />
            }
            onClick={handleClickFavarite}
          >
            Favorite
          </Button>
          {/* <Button
            css={buttonCss}
            size="sm"
            color="yellow"
            icon={<Svg icon="flag" size="md" />}
            onClick={handleClickReport}
          >
            Report
          </Button> */}
        </div>
      </div>
    </div>
  );
};

const cardCss = css({
  width: "350px",
  height: "400px",
  padding: "25px",
  boxShadow: "lg",
  bgColor: "WHITE",
});
const imageContainerCss = css({
  position: "relative",
  width: "300px",
  height: "300px",
  border: "1px solid #cccccc",
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
  objectFit: "cover",
});
const buttonsCss = css({ display: "flex", marginTop: "3", justifyContent: "center" });
const buttonCss = css({ marginX: "1" });

export default ImageCard;
