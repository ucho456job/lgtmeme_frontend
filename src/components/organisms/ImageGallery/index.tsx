"use client";

import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button";
import Tabs from "@/components/atoms/Tabs";
import TextBox from "@/components/atoms/TextBox";
import ImageCard from "@/components/molecules/ImageCard";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  initImages: FetchImage[];
};

const ImageGallery = ({ css, initImages }: Props) => {
  const [images, setImages] = useState<FetchImage[]>([]);
  useEffect(() => {
    setImages(initImages);
  }, [initImages]);

  const tabs = [
    { id: "timeLine", label: "Time line" },
    { id: "popular", label: "Popular" },
    { id: "favorite", label: "Favorite" },
  ];
  const [activeTabId, setActiveTabId] = useState("timeLine");

  const [keyword, setKeyword] = useState("");
  const handleSearch = () => {};

  return (
    <div className={css}>
      <Tabs css={tabCss} tabs={tabs} activeTabId={activeTabId} setActiveTabId={setActiveTabId} />
      <TextBox
        css={textBoxCss}
        value={keyword}
        placeholder="Keyword"
        iconPath="/images/search.svg"
        onChange={setKeyword}
        onEnterPress={handleSearch}
      />
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

const tabCss = css({ paddingTop: "8", paddingBottom: "4", paddingX: "3" });
const textBoxCss = css({ paddingX: "3", paddingBottom: "8" });
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
