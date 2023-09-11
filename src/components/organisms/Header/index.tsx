import Link from "next/link";
import { cva } from "@@/styled-system/css";

const Header = () => {
  return (
    <header className={headerRecipe()}>
      <Link href="/">
        <h1 className={h1Recipe()}>LGTMeme</h1>
      </Link>
    </header>
  );
};

const headerRecipe = cva({
  base: { bgColor: "BLACK", color: "WHITE", maxWidth: "100vw", height: "60px" },
});

const h1Recipe = cva({
  base: { fontSize: "4xl", textAlign: "center", _hover: { opacity: 0.8 } },
});

export default Header;
