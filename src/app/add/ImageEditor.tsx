"use client";

import { useState, useEffect, useRef } from "react";
import Button from "@/components/atoms/Button/Button";
import InputColor from "@/components/atoms/InputColor/InputColor";
import InputFile from "@/components/atoms/InputFile/InputFile";
import SelectBox from "@/components/atoms/SelectBox/SelectBox";
import Form from "@/components/molecules/Form/Form";
import { css } from "@@/styled-system/css";

type TextStyle = {
  left: number;
  top: number;
  color: string;
  fontSize: number;
  width: number;
  height: number;
  lineHeight: string;
  fontFamily: string;
};

type SizeMapKey = 12 | 24 | 36 | 48 | 60 | 72 | 84 | 96;

type SizeMap = Map<
  SizeMapKey,
  {
    size: number;
    width: number;
    height: number;
    diff: number;
  }
>;

type Props = {
  css?: string;
};

const ImageEditor = ({ css }: Props) => {
  const [image, setImage] = useState<string | null>(null);
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
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const [isUpload, setIsUpload] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (image && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = 300;
        canvas.height = 300;
        const img = new Image();
        img.src = image;
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const centerX = (canvas.width - img.width) / 2;
          const centerY = (canvas.height - img.height) / 2;
          ctx.drawImage(img, centerX, centerY);
        };
      }
    }
  }, [image]);

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target?.result as string;
      setImage(dataURL);
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

  const handleTextDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      const newLeft = e.clientX - dragStartX;
      const newTop = e.clientY - dragStartY;
      const parentElement = document.getElementById("canvas-border");
      if (parentElement) {
        const parentRect = parentElement.getBoundingClientRect();
        const maxX = parentRect.width - textStyle.width;
        const maxY = parentRect.height - textStyle.height;
        const clampedLeft = Math.min(Math.max(newLeft, 0), maxX);
        const clampedTop = Math.min(Math.max(newTop, 0), maxY);
        setTextStyle((prev) => ({ ...prev, left: clampedLeft, top: clampedTop }));
      }
    }
  };

  const handleDragStart = (e: any) => {
    setIsDragging(true);
    setDragStartX(e.clientX - textStyle.left);
    setDragStartY(e.clientY - textStyle.top);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
  };

  const downloadWebPImage = (size: SizeMapKey) => {
    setIsUpload(true);
    const diff = sizeMap.get(size)?.diff;
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

      const dataURL = canvas.toDataURL("image/webp");
      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "image.webp";
      a.click();
    }
  };

  return (
    <div className={css}>
      <br />
      <div className={borderCss} id="canvas-border">
        <canvas ref={canvasRef}></canvas>
        {image && !isUpload && (
          <div
            className={lgtmCss}
            style={textStyle}
            onMouseDown={handleDragStart}
            onMouseMove={handleTextDrag}
            onMouseUp={handleDragEnd}
          >
            LGTM
          </div>
        )}
      </div>
      <InputFile css={fileInputCss} onChange={handleImageUpload} />
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
      <Form label="Color" isUnderLine>
        <InputColor value={textStyle.color} onChange={handleTextColorChange} />
      </Form>
      <Button
        css={uploadButton}
        iconPath="/images/upload.svg"
        size="lg"
        onClick={() => downloadWebPImage(textStyle.fontSize as SizeMapKey)}
      >
        Create LGTM image
      </Button>
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
const fileInputCss = css({ textAlign: "center" });
const formCss = css({ marginTop: "3" });
const uploadButton = css({ marginTop: "5", textAlign: "center" });

export default ImageEditor;
