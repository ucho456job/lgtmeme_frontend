"use client";

import { useState, useEffect, useRef } from "react";
import { css } from "@@/styled-system/css";

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [textSize, setTextSize] = useState<number>(36);
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [textBorderColor, setTextBorderColor] = useState<string>("#000000");
  const [fontFamily, setFontFamily] = useState<string>("Arial");
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

          ctx.fillStyle = textColor;
          ctx.font = `${textSize}px ${fontFamily}`;
          ctx.strokeStyle = textBorderColor;
          ctx.lineWidth = 3;

          const text = "LGTM";
          const textWidth = ctx.measureText(text).width;
          const textHeight = textSize;

          const textX = textPosition.x; // ドラッグされた位置に適用
          const textY = textPosition.y; // ドラッグされた位置に適用

          ctx.strokeText(text, textX, textY);
          ctx.fillText(text, textX, textY);
        };
      }
    }
  }, [image, textSize, textColor, textBorderColor, fontFamily, textPosition]);

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

  const handleTextSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);
    setTextSize(newSize);
  };

  const handleTextColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setTextColor(newColor);
  };

  const handleTextBorderColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newBorderColor = event.target.value;
    setTextBorderColor(newBorderColor);
  };

  const handleFontFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontFamily = event.target.value;
    setFontFamily(newFontFamily);
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

  return (
    <div>
      <input type="file" accept="image/*" ref={inputRef} onChange={handleImageUpload} />
      <div>
        <label htmlFor="textSize">Text Size: </label>
        <select id="textSize" value={textSize} onChange={handleTextSizeChange}>
          <option value="24">24</option>
          <option value="36">36</option>
          <option value="48">48</option>
        </select>
      </div>
      <div>
        <label htmlFor="textColor">Text Color: </label>
        <input type="color" id="textColor" value={textColor} onChange={handleTextColorChange} />
      </div>
      <div>
        <label htmlFor="textBorderColor">Text Border Color: </label>
        <input
          type="color"
          id="textBorderColor"
          value={textBorderColor}
          onChange={handleTextBorderColorChange}
        />
      </div>
      <div>
        <label htmlFor="fontFamily">Font Family: </label>
        <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
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
      </div>
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
