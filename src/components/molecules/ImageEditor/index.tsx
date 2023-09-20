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
          ctx.drawImage(img, 0, 0);
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

const borderCss = css({ border: "2px dashed #737373", height: "304px", width: "304px" });

export default ImageEditor;
