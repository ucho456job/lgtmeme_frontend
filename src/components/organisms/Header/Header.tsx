import Link from "next/link";
import { css } from "@@/styled-system/css";

const Header = () => {
  return (
    <header className={headerCss}>
      <Link href="/">
        <h1 className={h1Css}>LGTMeme</h1>
      </Link>
    </header>
  );
};

const headerCss = css({ bgColor: "BLACK", color: "WHITE", maxWidth: "100vw", height: "60px" });
const h1Css = css({ fontSize: "4xl", textAlign: "center", _hover: { opacity: 0.8 } });

export default Header;
