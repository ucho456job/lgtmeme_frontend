import Link from "next/link";
import Button from "@/components/atoms/Button/Button";
import {
  HOME_ENDPOINT,
  PRIVACY_POLICY_ENDPOINT,
  TERMS_OF_SERVICE_ENDPOINT,
} from "@/constants/endpoints";
import packageJson from "@@/package.json";
import { css } from "@@/styled-system/css";

const Footer = () => {
  return (
    <footer className={footerCss}>
      <div className={buttonsCss}>
        <Link href={HOME_ENDPOINT}>
          <Button visual="text">Home</Button>
        </Link>
        <Link href={TERMS_OF_SERVICE_ENDPOINT}>
          <Button visual="text">Terms of service</Button>
        </Link>
        <Link href={PRIVACY_POLICY_ENDPOINT}>
          <Button visual="text">Privacy policy</Button>
        </Link>
      </div>
      <div className={copyrightCss}>©2023 LGTMeme version {packageJson.version}</div>
    </footer>
  );
};

const footerCss = css({
  bgColor: "GHOUST_WHITE",
  color: "BLACK",
  maxWidth: "100vw",
  height: "210px",
  md: { height: "140px" },
});
const copyrightCss = css({ textAlign: "center" });
const buttonsCss = css({ display: "flex", justifyContent: "center", paddingTop: "8" });

export default Footer;
