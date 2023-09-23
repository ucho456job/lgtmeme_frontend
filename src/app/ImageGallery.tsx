"use client";

import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import InputText from "@/components/atoms/InputText/InputText";
import Loading from "@/components/atoms/Loading/Loading";
import Svg from "@/components/atoms/Svg/Svg";
import Tabs from "@/components/atoms/Tabs/Tabs";
import ImageCard from "@/components/molecules/ImageCard/ImageCard";
import { ImageService } from "@/services/image.service";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  initImages: FetchImage[];
};

export type ActiveTabId = "timeLine" | "popular" | "favorite";

const ImageGallery = ({ css, initImages }: Props) => {
  const [images, setImages] = useState<FetchImage[]>([]);
  const [favariteImageIds, setFavariteImageIds] = useState<string[]>([]);
  const [activeTabId, setActiveTabId] = useState("timeLine");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setImages(initImages);
    const favariteImageIds = JSON.parse(
      localStorage.getItem("favariteImageIds") || "[]",
    ) as string[];
    setFavariteImageIds(favariteImageIds);
    setIsLoading(false);
  }, [initImages]);

  const tabs = [
    { id: "timeLine", label: "Time line" },
    { id: "popular", label: "Popular" },
    { id: "favorite", label: "Favorite" },
  ];

  const handleFetchImages = async (
    images: FetchImage[],
    page: number,
    keyword: string,
    activeTabId: ActiveTabId,
    favariteImageIds: string[],
  ) => {
    try {
      setIsLoading(true);
      setPage(page);
      setActiveTabId(activeTabId);
      const service = new ImageService();
      const resImages = await service.fetchImages({ page, keyword, activeTabId, favariteImageIds });
      if (page === 0) {
        setImages(resImages);
      } else {
        const imageMap = new Map();
        images.forEach((image) => imageMap.set(image.id, image));
        resImages.forEach((image) => imageMap.set(image.id, image));
        setImages(Array.from(imageMap.values()));
      }
      if (resImages.length < 9) setIsFull(true);
    } catch (error) {
      // Make snackbar and display error message.
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetKeyword = (value: string) => setKeyword(value);

  return (
    <div className={css}>
      <Tabs
        css={tabCss}
        tabs={tabs}
        value={activeTabId}
        onClick={(id: string) => {
          setIsFull(false);
          setImages([]);
          handleFetchImages(images, 0, keyword, id as ActiveTabId, favariteImageIds);
        }}
      />
      <InputText
        css={textBoxCss}
        value={keyword}
        placeholder="Keyword"
        icon={<Svg icon="search" size="lg" />}
        onChange={handleSetKeyword}
        onEnterPress={() => {
          setIsFull(false);
          setImages([]);
          handleFetchImages(images, 0, keyword, activeTabId as ActiveTabId, favariteImageIds);
        }}
      />
      <div className={imageCardsCss}>
        {images.map((i) => (
          <ImageCard
            css={imageCardCss}
            key={i.id}
            image={i}
            favariteImageIds={favariteImageIds}
            setFavariteImageIds={setFavariteImageIds}
          />
        ))}
      </div>
      {isLoading ? (
        <Loading css={loadingCss} />
      ) : (
        <Button
          css={buttonCss}
          size="lg"
          disabled={isFull}
          onClick={() =>
            handleFetchImages(
              images,
              page + 1,
              keyword,
              activeTabId as ActiveTabId,
              favariteImageIds,
            )
          }
        >
          See more
        </Button>
      )}
    </div>
  );
};

const tabCss = css({ paddingTop: "8", paddingBottom: "4" });
const textBoxCss = css({ paddingBottom: "8" });
const imageCardsCss = css({
  display: "grid",
  gap: "10px",
  lg: { gridTemplateColumns: "1fr 1fr 1fr" },
  md: { gridTemplateColumns: "1fr 1fr" },
  sm: { gridTemplateColumns: "1fr" },
});
const imageCardCss = css({ marginX: "auto" });
const buttonCss = css({ paddingY: "30px", textAlign: "center" });
const loadingCss = css({ marginTop: "30px", marginX: "auto" });

export default ImageGallery;
