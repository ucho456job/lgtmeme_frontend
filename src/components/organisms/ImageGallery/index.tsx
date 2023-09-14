"use client";

import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import Tabs from "@/components/atoms/Tabs";
import ImageCard from "@/components/molecules/ImageCard";
import { css } from "@@/styled-system/css";

type Image = {
  id: number;
  title: string;
  url: string;
  width: number;
  height: number;
};

type Props = {
  css?: string;
  initImages: Image[];
};

const ImageGallery = ({ css, initImages }: Props) => {
  const [images, setImages] = useState<Image[]>([]);
  useEffect(() => {
    setImages(initImages);
  }, [initImages]);

  const tabs = [
    { id: "timeLine", label: "Time line" },
    { id: "popular", label: "Popular" },
    { id: "favorite", label: "Favorite" },
  ];
  const [activeTabId, setActiveTabId] = useState("timeLine");

  return (
    <div className={css}>
      <Tabs css={tabCss} tabs={tabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
      <div className={imageCardsCss}>
        {images.map((i) => (
          <ImageCard css={imageCardCss} key={i.id} image={i} />
        ))}
      </div>
      <Button css={buttonCss} size="lg">
        See more
      </Button>
    </div>
  );
};

const tabCss = css({ paddingY: "8", paddingX: "10px" });
const imageCardsCss = css({
  display: "grid",
  gap: "10px",
  lg: { gridTemplateColumns: "1fr 1fr 1fr" },
  md: { gridTemplateColumns: "1fr 1fr" },
  sm: { gridTemplateColumns: "1fr" },
});
const imageCardCss = css({ marginX: "auto" });
const buttonCss = css({ paddingY: "30px", textAlign: "center" });

export default ImageGallery;
