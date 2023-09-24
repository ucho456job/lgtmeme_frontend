import Link from "next/link";
import { HOME_PAGE_ENDPOINT } from "@/constants/endpoints";
import { css } from "@@/styled-system/css";

const Header = () => {
  return (
    <header className={headerCss}>
      <h1 className={h1Css}>
        <Link className={linkCss} href={HOME_PAGE_ENDPOINT}>
          LGTMeme
        </Link>
      </h1>
    </header>
  );
};

const headerCss = css({ bgColor: "BLACK", color: "WHITE", maxWidth: "100vw", height: "60px" });
const h1Css = css({ fontSize: "4xl", textAlign: "center" });
const linkCss = css({ _hover: { opacity: 0.8 } });

export default Header;
