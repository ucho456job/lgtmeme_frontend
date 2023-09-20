"use client";

import { useState, useEffect, useRef } from "react";
import { css } from "@@/styled-system/css";

type TextStyle = {
  left: number;
  top: number;
  color: string;
  textStroke: string;
  WebkitTextStroke: string;
  textBorderColor: string;
  fontSize: number;
  width: number;
  height: number;
  fontFamily: string;
};

type SizeMapKey = "12" | "24" | "36" | "48" | "60" | "72" | "84" | "96";

type SizeMap = Map<
  SizeMapKey,
  {
    size: number;
    width: number;
    height: number;
  }
>;

const ImageEditor = () => {
  const [image, setImage] = useState<string | null>(null);
  const [textStyle, setTextStyle] = useState<TextStyle>({
    left: 100,
    top: 125,
    color: "#ffffff",
    textStroke: "1px #000000",
    WebkitTextStroke: "1px #000000",
    textBorderColor: "#000000",
    fontSize: 36,
    width: 102,
    height: 56,
    fontFamily: "Arial",
  });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragStartY, setDragStartY] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target?.result as string;
        setImage(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const sizeMap: SizeMap = new Map([
    ["12", { size: 12, width: 35, height: 20 }],
    ["24", { size: 24, width: 69, height: 38 }],
    ["36", { size: 36, width: 102, height: 56 }],
    ["48", { size: 48, width: 135, height: 74 }],
    ["60", { size: 60, width: 169, height: 92 }],
    ["72", { size: 72, width: 202, height: 110 }],
    ["84", { size: 84, width: 235, height: 128 }],
    ["96", { size: 96, width: 269, height: 146 }],
  ]);
  const handleTextSizeChange = (e: React.ChangeEvent<HTMLSelectElement>, sizeMap: SizeMap) => {
    const map = sizeMap.get(e.target.value as SizeMapKey)!;
    setTextStyle((prev) => ({ ...prev, fontSize: map.size, width: map.width, height: map.height }));
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTextStyle((prev) => ({ ...prev, color: e.target.value }));
  };

  const handleTextBorderColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setTextStyle((prev) => ({
      ...prev,
      textStroke: `1px ${newColor}`,
      WebkitTextStroke: `1px ${newColor}`,
      textBorderColor: newColor,
    }));
  };

  const handleFontFamilyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTextStyle((prev) => ({ ...prev, fontFamily: e.target.value }));
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

  const downloadWebPImage = () => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = textStyle.color;
      ctx.font = `${textStyle.fontSize}px ${textStyle.fontFamily}`;
      ctx.strokeStyle = textStyle.textBorderColor;
      ctx.lineWidth = 3;
      const text = "LGTM";
      const textX = textStyle.left;
      const textY = textStyle.top;
      ctx.strokeText(text, textX, textY);
      ctx.fillText(text, textX, textY);

      const dataURL = canvas.toDataURL("image/webp");

      const a = document.createElement("a");
      a.href = dataURL;
      a.download = "image.webp";
      a.click();
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" ref={inputRef} onChange={handleImageUpload} />
      <div>
        <label htmlFor="textSize">Text Size: </label>
        <select
          id="textSize"
          value={textStyle.fontSize}
          onChange={(e) => handleTextSizeChange(e, sizeMap)}
        >
          <option value="12">12</option>
          <option value="24">24</option>
          <option value="36">36</option>
          <option value="48">48</option>
          <option value="60">60</option>
          <option value="72">72</option>
          <option value="84">84</option>
          <option value="96">96</option>
        </select>
      </div>
      <div>
        <label htmlFor="textColor">Text Color: </label>
        <input
          type="color"
          id="textColor"
          value={textStyle.color}
          onChange={(e) => handleTextColorChange(e)}
        />
      </div>
      <div>
        <label htmlFor="textBorderColor">Text Border Color: </label>
        <input
          type="color"
          id="textBorderColor"
          value={textStyle.textBorderColor}
          onChange={(e) => handleTextBorderColorChange(e)}
        />
      </div>
      <div>
        <label htmlFor="fontFamily">Font Family: </label>
        <select
          id="fontFamily"
          value={textStyle.fontFamily}
          onChange={(e) => handleFontFamilyChange(e)}
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>
      <div className={borderCss} id="canvas-border">
        <canvas ref={canvasRef}></canvas>
        {image && (
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
      <button onClick={downloadWebPImage}>Download WebP</button>
    </div>
  );
};

const borderCss = css({
  border: "2px dashed #737373",
  height: "304px",
  width: "304px",
  marginX: "auto",
  position: "relative",
});
const lgtmCss = css({
  position: "absolute",
  userSelect: "none",
  _hover: { cursor: "grab" },
  _active: { cursor: "grabbing" },
});

export default ImageEditor;
