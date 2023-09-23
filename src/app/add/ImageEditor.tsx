"use client";

import { useState, useRef, useEffect } from "react";
import Button from "@/components/atoms/Button/Button";
import InputColor from "@/components/atoms/InputColor/InputColor";
import InputFile from "@/components/atoms/InputFile/InputFile";
import InputText from "@/components/atoms/InputText/InputText";
import Loading from "@/components/atoms/Loading/Loading";
import SelectBox from "@/components/atoms/SelectBox/SelectBox";
import Svg from "@/components/atoms/Svg/Svg";
import Form from "@/components/molecules/Form/Form";
import { ImageService } from "@/services/image.service";
import { css } from "@@/styled-system/css";

type SizeMapKey = 36 | 60 | 84;

type TextStyle = {
  left: number;
  top: number;
  color: string;
  fontSize: SizeMapKey;
  width: number;
  height: number;
  lineHeight: string;
  fontFamily: string;
};

type SizeMap = Map<
  SizeMapKey,
  {
    size: SizeMapKey;
    width: number;
    height: number;
    diff: number;
  }
>;

type Props = {
  css?: string;
};

const ImageEditor = ({ css }: Props) => {
  const [imageInfo, setImageInfo] = useState({ url: "", width: 0, height: 0 });
  const [textStyle, setTextStyle] = useState<TextStyle>({
    left: 66,
    top: 120,
    color: "#ffffff",
    fontSize: 60,
    width: 169,
    height: 60,
    lineHeight: "60px",
    fontFamily: "Arial",
  });
  const [keyword, setKeyword] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target?.result as string;
      const img = new Image();
      img.src = dataURL;
      img.onload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          const maxWidth = 300;
          const maxHeight = 300;
          let canvasWidth = img.width;
          let canvasHeight = img.height;
          if (img.width > maxWidth || img.height > maxHeight) {
            const widthRatio = maxWidth / img.width;
            const heightRatio = maxHeight / img.height;
            const minRatio = Math.min(widthRatio, heightRatio);
            canvasWidth = img.width * minRatio;
            canvasHeight = img.height * minRatio;
          }
          canvas.width = maxWidth;
          canvas.height = maxHeight;
          const canvasX = (maxWidth - canvasWidth) / 2;
          const canvasY = (maxHeight - canvasHeight) / 2;
          ctx.clearRect(0, 0, maxWidth, maxHeight);
          ctx.drawImage(img, canvasX, canvasY, canvasWidth, canvasHeight);
          const newImageInfo = {
            url: canvas.toDataURL("image/jpeg"),
            width: canvasWidth,
            height: canvasHeight,
          };
          setImageInfo(newImageInfo);
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const textSizeOptions = [
    { value: 36, label: "Small" },
    { value: 60, label: "Medium" },
    { value: 84, label: "Large" },
  ];
  const sizeMap: SizeMap = new Map([
    [36, { size: 36, width: 102, height: 36, diff: 30 }],
    [60, { size: 60, width: 169, height: 60, diff: 50 }],
    [84, { size: 84, width: 235, height: 84, diff: 71 }],
  ]);
  const handleTextSizeChange = (value: string) => {
    const map = sizeMap.get(Number(value) as SizeMapKey)!;
    setTextStyle((prev) => ({
      ...prev,
      fontSize: map.size,
      width: map.width,
      height: map.height,
      lineHeight: `${map.size}px`,
    }));
  };

  const handleTextColorChange = (value: string) => {
    setTextStyle((prev) => ({ ...prev, color: value }));
  };

  const fontFamilyOptions = [
    { value: "Arial", label: "Arial" },
    { value: "Verdana", label: "Verdana" },
    { value: "Times New Roman", label: "Times New Roman" },
  ];
  const handleFontFamilyChange = (value: string) => {
    setTextStyle((prev) => ({ ...prev, fontFamily: value }));
  };

  /** Start text drag */
  const startTextDrag = (eventX: number, eventY: number) => {
    setIsDragging(true);
    setDragStartX(eventX - textStyle.left);
    setDragStartY(eventY - textStyle.top);
  };
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) return;
    startTextDrag(e.clientX, e.clientY);
  };
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isDragging) return;
    const touch = e.touches[0];
    startTextDrag(touch.clientX, touch.clientY);
  };

  /** Moving text */
  const movingText = (newLeft: number, newTop: number) => {
    const parentElement = document.getElementById("canvas-border");
    if (!parentElement) return;
    const parentRect = parentElement.getBoundingClientRect();
    const maxX = parentRect.width - textStyle.width;
    const maxY = parentRect.height - textStyle.height;
    const clampedLeft = Math.min(Math.max(newLeft, 0), maxX);
    const clampedTop = Math.min(Math.max(newTop, 0), maxY);
    setTextStyle((prev) => ({ ...prev, left: clampedLeft, top: clampedTop }));
  };
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const newLeft = e.clientX - dragStartX;
    const newTop = e.clientY - dragStartY;
    movingText(newLeft, newTop);
  };
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const touch = e.touches[0];
    const newLeft = touch.clientX - dragStartX;
    const newTop = touch.clientY - dragStartY;
    movingText(newLeft, newTop);
  };

  /** When moving the text, prevent scrolling */
  useEffect(() => {
    if (isDragging) {
      window.addEventListener(
        "touchmove",
        (e) => {
          e.preventDefault();
        },
        { passive: false },
      );
    } else {
      window.removeEventListener("touchmove", (e) => {
        e.preventDefault();
      });
    }
  }, [isDragging]);

  /** Stop text move */
  const handleStopTextMove = () => setIsDragging(false);

  const handleCreateImage = async () => {
    try {
      setIsUpload(true);
      const diff = sizeMap.get(textStyle.fontSize)?.diff;
      if (canvasRef.current && diff) {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.fillStyle = textStyle.color;
        ctx.font = `${textStyle.fontSize}px ${textStyle.fontFamily}`;
        const text = "LGTM";
        const textX = textStyle.left;
        const textY = textStyle.top + diff;
        ctx.fillText(text, textX, textY);

        const image = canvas.toDataURL("image/webp");
        const service = new ImageService();
        await service.postImage({ image, keyword });
        window.location.href = process.env.NEXT_PUBLIC_APP_URL;
      }
    } catch {
      alert("Failed create LGTM image");
    } finally {
      setIsUpload(false);
    }
  };

  return (
    <div className={css}>
      <br />
      <div className={borderCss} id="canvas-border">
        <canvas ref={canvasRef}></canvas>
        {imageInfo.url !== "" && !isUpload && (
          <div
            className={lgtmCss}
            style={textStyle}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleStopTextMove}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleStopTextMove}
          >
            LGTM
          </div>
        )}
      </div>
      <InputFile css={inputFileCss} onChange={handleImageUpload} />
      <Form css={formCss} label="Size">
        <SelectBox
          value={textStyle.fontSize}
          options={textSizeOptions}
          onChange={handleTextSizeChange}
        />
      </Form>
      <Form label="Font family">
        <SelectBox
          value={textStyle.fontFamily}
          options={fontFamilyOptions}
          onChange={handleFontFamilyChange}
        />
      </Form>
      <Form label="Color">
        <InputColor value={textStyle.color} onChange={handleTextColorChange} />
      </Form>
      <Form label="Keyword" isUnderLine>
        <InputText
          css={inputTextCss}
          value={keyword}
          placeholder="ex: anime, human"
          onChange={setKeyword}
        />
      </Form>
      {isUpload ? (
        <Loading css={loadingCss} />
      ) : (
        <Button
          css={uploadButtonCss}
          icon={<Svg icon="upload" color="white" size="lg" />}
          size="lg"
          disabled={imageInfo.url === ""}
          onClick={handleCreateImage}
        >
          Create LGTM image
        </Button>
      )}
    </div>
  );
};

const borderCss = css({
  border: "2px dashed #737373",
  height: "304px",
  width: "304px",
  marginX: "auto",
  marginBottom: "3",
  position: "relative",
});
const lgtmCss = css({
  position: "absolute",
  userSelect: "none",
  _hover: { cursor: "grab" },
  _active: { cursor: "grabbing" },
});
const inputFileCss = css({ textAlign: "center" });
const formCss = css({ marginTop: "3" });
const inputTextCss = css({ width: "90%", marginX: "auto", height: "32px" });
const uploadButtonCss = css({ marginTop: "5", textAlign: "center" });
const loadingCss = css({ marginTop: "5", marginX: "auto" });

export default ImageEditor;
