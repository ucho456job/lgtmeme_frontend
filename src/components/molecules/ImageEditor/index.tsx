"use client";

import { useState, useEffect, useRef } from "react";
import { css } from "@@/styled-system/css";

type TextStyle = {
  position: "absolute" | "relative";
  left: number;
  top: number;
  color: string;
  textStroke: string;
  "-webkit-text-stroke": string;
  textBorderColor: string;
  fontSize: number;
  fontFamily: string;
};

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [textStyle, setTextStyle] = useState<TextStyle>({
    position: "absolute",
    left: 100,
    top: 125,
    color: "#ffffff",
    textStroke: "1px #000000",
    "-webkit-text-stroke": "1px #000000",
    textBorderColor: "#000000",
    fontSize: 36,
    fontFamily: "Arial",
  });
  const [textPosition, setTextPosition] = useState<{ x: number; y: number }>({
    x: 100,
    y: 160,
  });
  const [isDragging, setIsDragging] = useState<boolean>(false);
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataURL = e.target?.result as string;
        setImage(dataURL);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextSizeChange = (e: React.ChangeEvent<HTMLSelectElement>, textStyle: TextStyle) => {
    setTextStyle({ ...textStyle, fontSize: parseInt(e.target.value) });
  };

  const handleTextColorChange = (e: React.ChangeEvent<HTMLInputElement>, textStyle: TextStyle) => {
    setTextStyle({ ...textStyle, color: e.target.value });
  };

  const handleTextBorderColorChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    textStyle: TextStyle,
  ) => {
    const newColor = e.target.value;
    setTextStyle({
      ...textStyle,
      textStroke: `1px ${newColor}`,
      "-webkit-text-stroke": `1px ${newColor}`,
      textBorderColor: newColor,
    });
  };

  const handleFontFamilyChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    textStyle: TextStyle,
  ) => {
    setTextStyle({ ...textStyle, fontFamily: e.target.value });
  };

  // テキストの位置をドラッグアンドドロップするハンドラ
  const handleTextDrag = (event: React.MouseEvent<HTMLCanvasElement>) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      if (canvas) {
        const rect = canvas.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const offsetY = event.clientY - rect.top;
        setTextPosition({ x: offsetX, y: offsetY });
      }
    }
  };

  // ドラッグを開始するハンドラ
  const handleDragStart = () => {
    setIsDragging(true);
    // ドラッグ中はカーソルを'grabbing'に設定
    document.body.style.cursor = "grabbing";
  };

  // ドラッグを終了するハンドラ
  const handleDragEnd = () => {
    setIsDragging(false);
    // ドラッグ終了後はカーソルを元に戻す
    document.body.style.cursor = "auto";
  };

  const downloadWebPImage = () => {
    if (canvasRef.current) {
      // CanvasからDataURLを取得
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.fillStyle = textStyle.color;
      ctx.font = `${textStyle.fontSize}px ${textStyle.fontFamily}`;
      ctx.strokeStyle = textStyle.textBorderColor;
      ctx.lineWidth = 3;
      const text = "LGTM";
      const textX = textPosition.x;
      const textY = textPosition.y;
      ctx.strokeText(text, textX, textY);
      ctx.fillText(text, textX, textY);

      const dataURL = canvas.toDataURL("image/webp");

      // ダウンロード用のリンクを生成
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
          onChange={(e) => handleTextSizeChange(e, textStyle)}
        >
          <option value="24">24</option>
          <option value="36">36</option>
          <option value="48">48</option>
        </select>
      </div>
      <div>
        <label htmlFor="textColor">Text Color: </label>
        <input
          type="color"
          id="textColor"
          value={textStyle.color}
          onChange={(e) => handleTextColorChange(e, textStyle)}
        />
      </div>
      <div>
        <label htmlFor="textBorderColor">Text Border Color: </label>
        <input
          type="color"
          id="textBorderColor"
          value={textStyle.textBorderColor}
          onChange={(e) => handleTextBorderColorChange(e, textStyle)}
        />
      </div>
      <div>
        <label htmlFor="fontFamily">Font Family: </label>
        <select
          id="fontFamily"
          value={textStyle.fontFamily}
          onChange={(e) => handleFontFamilyChange(e, textStyle)}
        >
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
        </select>
      </div>
      <div className={borderCss}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleDragStart}
          onMouseMove={handleTextDrag}
          onMouseUp={handleDragEnd}
        ></canvas>
        {image && <div style={textStyle}>LGTM</div>}
      </div>
      <button onClick={downloadWebPImage}>Download WebP</button>
    </div>
  );
};

const borderCss = css({
  border: "2px dashed #737373",
  height: "304px",
  width: "304px",
  position: "relative", // 絶対位置指定のために親要素を相対位置指定にする
});

export default ImageEditor;
