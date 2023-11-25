"use client";

import { useEffect, useState } from "react";
import ReportModal from "@/app/ReportModal";
import Button from "@/components/atoms/Button/Button";
import InputText from "@/components/atoms/InputText/InputText";
import Loading from "@/components/atoms/Loading/Loading";
import Svg from "@/components/atoms/Svg/Svg";
import Tabs from "@/components/atoms/Tabs/Tabs";
import ImageCard from "@/components/molecules/ImageCard/ImageCard";
import Modal from "@/components/molecules/Modal/Modal";
import { UNKNOWN_ERROR_MESSAGE } from "@/constants/exceptions";
import {
  ACTIVE_TAB_ID_FAVORITE,
  ACTIVE_TAB_ID_POPULAR,
  ACTIVE_TAB_ID_TIME_LINE,
  MAX_IMAGES_FETCH_COUNT,
  PATCH_IMAGE_REQUEST_TYPE_COPY,
} from "@/constants/image";
import { ImageService } from "@/services/image.service";
import { css } from "@@/styled-system/css";

export const LOCAL_STORAGE_KEY_FAVORITE_IMAGE_IDS = "favoriteImageIds";

type Props = {
  css?: string;
  initImages: Image[];
};

const ImageGallery = ({ css, initImages }: Props) => {
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [activeTabId, setActiveTabId] = useState<ActiveTabId>(ACTIVE_TAB_ID_TIME_LINE);
  const [favoriteImageIds, setFavoriteImageIds] = useState<string[]>([]);
  const [isFull, setIsFull] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [modal, setModal] = useState({ message: "", show: false });

  useEffect(() => {
    setImages(initImages);
    const favoriteImageIds = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY_FAVORITE_IMAGE_IDS) || "[]",
    ) as string[];
    setFavoriteImageIds(favoriteImageIds);
    setIsLoading(false);
  }, [initImages]);

  const tabs: { id: ActiveTabId; label: string }[] = [
    { id: ACTIVE_TAB_ID_TIME_LINE, label: "Time line" },
    { id: ACTIVE_TAB_ID_POPULAR, label: "Popular" },
    { id: ACTIVE_TAB_ID_FAVORITE, label: "Favorite" },
  ];

  const handleGetImages = async (
    images: Image[],
    page: number,
    keyword: string,
    activeTabId: ActiveTabId,
    favoriteImageIds: string[],
  ) => {
    try {
      setIsLoading(true);
      setPage(page);
      setActiveTabId(activeTabId);
      const service = new ImageService();
      const res = await service.getImages({
        page,
        keyword,
        activeTabId,
        favoriteImageIds,
      });
      if (!res.ok) {
        setModal({ message: res.message, show: true });
        return;
      }
      if (page === 0) {
        setImages(res.images);
      } else {
        /** I am using Map to avoid duplicate images. */
        const imageMap = new Map();
        images.forEach((image) => imageMap.set(image.id, image));
        res.images.forEach((image) => imageMap.set(image.id, image));
        setImages(Array.from(imageMap.values()));
      }
      if (res.images.length < MAX_IMAGES_FETCH_COUNT) setIsFull(true);
    } catch (error) {
      setModal({
        message: error instanceof Error ? error.message : UNKNOWN_ERROR_MESSAGE,
        show: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickTab = (id: string) => {
    setIsFull(false);
    setImages([]);
    handleGetImages(images, 0, keyword, id as ActiveTabId, favoriteImageIds);
  };

  const handleSetKeyword = (value: string) => setKeyword(value);

  const handlePressEnter = () => {
    setIsFull(false);
    setImages([]);
    handleGetImages(images, 0, keyword, activeTabId as ActiveTabId, favoriteImageIds);
  };

  const handleCopyToClipboard = async (image: Image) => {
    try {
      await navigator.clipboard.writeText(`![LGTM](${image.url})`);
      setModal({ message: "Copied to clipboard!", show: true });
    } catch {
      setModal({ message: "Failed to copy clipboard. Please try again later.", show: true });
    }
    const service = new ImageService();
    service.patchImage(image.id, { requestType: PATCH_IMAGE_REQUEST_TYPE_COPY });
  };

  const handleToggleFavorite = (isFavorite: boolean, image: Image) => {
    const newIsFavorite = !isFavorite;
    const newFavoriteImageIds = newIsFavorite
      ? [...favoriteImageIds, image.id]
      : favoriteImageIds.filter((id) => id !== image.id);
    localStorage.setItem(LOCAL_STORAGE_KEY_FAVORITE_IMAGE_IDS, JSON.stringify(newFavoriteImageIds));
    setFavoriteImageIds(newFavoriteImageIds);
  };

  const handleCloseModal = () => setModal({ message: "", show: false });

  const [reportImage, setReportImage] = useState<Image | null>(null);
  const handleOpenReportModal = async (image: Image) => setReportImage(image);
  const handleCloseReportModal = () => setReportImage(null);

  return (
    <div className={css}>
      <Tabs css={tabCss} tabs={tabs} value={activeTabId} onClick={handleClickTab} />
      <InputText
        css={textBoxCss}
        value={keyword}
        placeholder="Keyword"
        icon={<Svg icon="search" />}
        onChange={handleSetKeyword}
        onEnterPress={handlePressEnter}
      />
      <div className={imageCardsCss}>
        {images.map((i) => (
          <ImageCard
            css={imageCardCss}
            key={i.id}
            image={i}
            isFavorite={favoriteImageIds.some((id) => id === i.id)}
            onClickCopy={() => handleCopyToClipboard(i)}
            onClickFavorite={(isFavorite: boolean) => handleToggleFavorite(isFavorite, i)}
            onClickReport={() => handleOpenReportModal(i)}
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
          onClick={() => handleGetImages(images, page + 1, keyword, activeTabId, favoriteImageIds)}
        >
          See more
        </Button>
      )}
      <Modal {...modal} onClick={handleCloseModal} />
      <ReportModal image={reportImage} onClickClose={handleCloseReportModal} />
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
