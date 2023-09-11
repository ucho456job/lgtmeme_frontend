"use client";

import { useState } from "react";
import Button from "@/components/atoms/Button";
import { cva } from "@@/styled-system/css";

type Language = "en" | "ja";

const Header = () => {
  const [language, setLanguage] = useState<Language>("en");
  const handleToggleLanguage = () => {
    const nextLanguage = language === "en" ? "ja" : "en";
    setLanguage(nextLanguage);
  };
  return (
    <header className={headerRecipe()}>
      <h1 className={h1Recipe()}>LGTMeme</h1>
      <Button onClick={handleToggleLanguage}>{language}</Button>
    </header>
  );
};

const headerRecipe = cva({
  base: { bgColor: "BLACK", color: "WHITE", display: "flex", width: "100vw" },
});

const h1Recipe = cva({
  base: { fontSize: "4xl", margin: "auto" },
});

export default Header;
