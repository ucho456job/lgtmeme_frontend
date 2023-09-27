"use client";

import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button/Button";
import InputText from "@/components/atoms/InputText/InputText";
import Loading from "@/components/atoms/Loading/Loading";
import Svg from "@/components/atoms/Svg/Svg";
import Tabs from "@/components/atoms/Tabs/Tabs";
import ImageCard from "@/components/molecules/ImageCard/ImageCard";
import Modal from "@/components/molecules/Modal/Modal";
import { MAX_IMAGES_FETCH_COUNT } from "@/constants/image";
import { ImageService } from "@/services/image.service";
import { css } from "@@/styled-system/css";

type Props = {
  css?: string;
  initImages: Image[];
};

const ImageGallery = ({ css, initImages }: Props) => {
  const [images, setImages] = useState<Image[]>([]);
  const [favariteImageIds, setFavariteImageIds] = useState<string[]>([]);
  const [activeTabId, setActiveTabId] = useState("timeLine");
  const [keyword, setKeyword] = useState("");
  const [page, setPage] = useState(0);
  const [isFull, setIsFull] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

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
    images: Image[],
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
      if (resImages.length < MAX_IMAGES_FETCH_COUNT) setIsFull(true);
    } catch (error) {
      setModalMessage("Failed to fetch images");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSetKeyword = (value: string) => setKeyword(value);

  const handleCopyToClipboard = async (image: Image) => {
    try {
      await navigator.clipboard.writeText(`![LGTM](${image.url})`);
      setModalMessage("Copied to clipboard!");
    } catch {
      setModalMessage("Failed to copy to clipboard");
    } finally {
      setShowModal(true);
    }
    const service = new ImageService();
    service.patchImage(image.id);
  };

  const handleToggleFavarite = (isFavarite: boolean, image: Image) => {
    const newIsFavarite = !isFavarite;
    const newFavariteImageIds = newIsFavarite
      ? [...favariteImageIds, image.id]
      : favariteImageIds.filter((id) => id !== image.id);
    localStorage.setItem("favariteImageIds", JSON.stringify(newFavariteImageIds));
    setFavariteImageIds(newFavariteImageIds);
  };

  const handleCloseModal = () => setShowModal(false);

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
        icon={<Svg icon="search" />}
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
            isFavarite={favariteImageIds.some((id) => id === i.id)}
            onClickCopy={() => handleCopyToClipboard(i)}
            onClickFavarite={(isFavarite: boolean) => handleToggleFavarite(isFavarite, i)}
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
      <Modal message={modalMessage} showModal={showModal} onClick={handleCloseModal} />
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
