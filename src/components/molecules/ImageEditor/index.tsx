"use client";

import { useState, useEffect, useRef } from "react";
import { css } from "@@/styled-system/css";

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [textSize, setTextSize] = useState<number>(36);
  const [textColor, setTextColor] = useState<string>("#ffffff");
  const [textBorderColor, setTextBorderColor] = useState<string>("#000000");
  const [fontFamily, setFontFamily] = useState<string>("Arial"); // デフォルトのフォントファミリー
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

          // Calculate the position to center the image
          const centerX = (canvas.width - img.width) / 2;
          const centerY = (canvas.height - img.height) / 2;

          // Draw the image in the center
          ctx.drawImage(img, centerX, centerY);

          // Set text properties
          ctx.fillStyle = textColor;
          ctx.font = `${textSize}px ${fontFamily}`; // フォントファミリーを適用
          ctx.strokeStyle = textBorderColor;
          ctx.lineWidth = 3;

          const text = "LGTM";
          const textWidth = ctx.measureText(text).width;
          const textHeight = textSize;

          const textX = (canvas.width - textWidth) / 2;
          const textY = centerY + img.height / 2 + textHeight / 2;

          ctx.strokeText(text, textX, textY);
          ctx.fillText(text, textX, textY);
        };
      }
    }
  }, [image, textSize, textColor, textBorderColor, fontFamily]); // fontFamilyもウォッチリストに追加

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

  // フォントファミリーを変更するハンドラ
  const handleFontFamilyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFontFamily = event.target.value;
    setFontFamily(newFontFamily);
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
          {/* 他の選択肢を追加 */}
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
      {/* フォントファミリーのセレクトボックス */}
      <div>
        <label htmlFor="fontFamily">Font Family: </label>
        <select id="fontFamily" value={fontFamily} onChange={handleFontFamilyChange}>
          <option value="Arial">Arial</option>
          <option value="Verdana">Verdana</option>
          <option value="Times New Roman">Times New Roman</option>
          {/* 他のフォントファミリーを追加 */}
        </select>
      </div>
      <div className={borderCss}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

const borderCss = css({
  border: "2px dashed #737373",
  height: "304px",
  width: "304px",
});

export default ImageEditor;
