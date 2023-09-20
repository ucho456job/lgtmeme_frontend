"use client";

import { useState, useEffect, useRef } from "react";
import { css } from "@@/styled-system/css";

const ImageEditor: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
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
          ctx.fillStyle = "#ffffff"; // Text color (white)
          ctx.font = "64px Arial"; // Font size and style
          ctx.strokeStyle = "#000000"; // Text border color (black)
          ctx.lineWidth = 3; // Text border width

          const text = "LGTM";
          const textWidth = ctx.measureText(text).width;
          const textHeight = parseInt(ctx.font, 10);

          const textX = (canvas.width - textWidth) / 2;
          const textY = centerY + img.height / 2 + textHeight / 2;

          ctx.strokeText(text, textX, textY);
          ctx.fillText(text, textX, textY);
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

  return (
    <div>
      <input type="file" accept="image/*" ref={inputRef} onChange={handleImageUpload} />
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
  // display: "flex",
  // justifyContent: "center",
  // alignItems: "center",
});

export default ImageEditor;
