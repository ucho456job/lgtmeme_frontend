import Link from "next/link";
import Button from "@/components/atoms/Button";
import packageJson from "@@/package.json";
import { css } from "@@/styled-system/css";

const Footer = () => {
  return (
    <footer className={footerCss}>
      <div className={buttonsCss}>
        <Link href="/terms-of-service">
          <Button visual="text">Terms of service</Button>
        </Link>
        <Link href="/privacy-policy">
          <Button visual="text">Privacy policy</Button>
        </Link>
      </div>
      <div className={copyrightCss}>©2023 LGTMeme </div>
      <span>version {packageJson.version}</span>
    </footer>
  );
};

const footerCss = css({
  bgColor: "GHOUST_WHITE",
  color: "BLACK",
  maxWidth: "100vw",
  height: "140px",
});
const copyrightCss = css({ textAlign: "center" });
const buttonsCss = css({ display: "flex", justifyContent: "center", paddingTop: "8" });

export default Footer;
