"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { cva } from "@@/styled-system/css";

type Props = {
  image: {
    id: number;
    title: string;
    url: string;
    width: number;
    height: number;
  };
};

const ImageCard = ({ image }: Props) => {
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
    <div className={cardRecipe()}>
      <div className={imageContainerRecipe()}>
        <Image
          className={imageRecipe()}
          src={image.url}
          height={image.height}
          width={image.width}
          alt="LGTM"
        />
      </div>
      <p className={titleRecipe()}>{image.title}</p>
      <div className={buttonsRecipe()}>
        <Button size="lg" radius={false} iconPath="/images/copy.svg" onClick={handleCopy} />
        <Button
          size="lg"
          color="lightPink"
          radius={false}
          iconPath={isFavarite ? "/images/heart-solid.svg" : "/images/heart-outline.svg"}
          onClick={handleToggleFavarite}
        />
        <Button
          size="lg"
          color="yellow"
          radius={false}
          iconPath="/images/flag.svg"
          onClick={handleReport}
        />
      </div>
    </div>
  );
};

const cardRecipe = cva({
  base: { width: "350px", height: "450px", padding: "25px", boxShadow: "lg" },
});

const imageContainerRecipe = cva({
  base: {
    position: "relative",
    width: "300px",
    height: "300px",
    border: "1px solid",
    borderColor: "GRAY",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
});

const imageRecipe = cva({
  base: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "100%",
    maxHeight: "100%",
  },
});

const titleRecipe = cva({
  base: { whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
});

const buttonsRecipe = cva({
  base: { display: "flex", marginTop: "3", justifyContent: "center" },
});

export default ImageCard;
