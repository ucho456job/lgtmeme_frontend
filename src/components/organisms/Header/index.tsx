import { cva } from "@@/styled-system/css";

const Header = () => {
  return (
    <header className={headerRecipe()}>
      <h1 className={h1Recipe()}>LGTMeme</h1>
    </header>
  );
};

const headerRecipe = cva({
  base: { bgColor: "BLACK", color: "WHITE", display: "flex", maxWidth: "100vw", height: "60px" },
});

const h1Recipe = cva({
  base: { fontSize: "4xl", margin: "auto" },
});

export default Header;
