"use client";

import { useState } from "react";
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
      <div className={languageToggleRecipe()} onClick={handleToggleLanguage}>
        {language}
      </div>
    </header>
  );
};

const headerRecipe = cva({
  base: { bgColor: "BLACK", color: "WHITE", display: "flex", width: "100vw" },
});

const h1Recipe = cva({
  base: { fontSize: "4xl", margin: "auto" },
});

const languageToggleRecipe = cva({
  base: {
    width: "10",
    fontSize: "2xl",
    lineHeight: "2",
    marginRight: "3",
    _hover: { opacity: 0.8 },
    cursor: "pointer",
  },
});

export default Header;
