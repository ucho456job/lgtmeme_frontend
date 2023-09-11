import Link from "next/link";
import Button from "@/components/atoms/Button";
import { cva } from "@@/styled-system/css";

const Footer = () => {
  return (
    <footer className={footerRecipe()}>
      <div className={buttonsRecipe()}>
        <Link href="/terms-of-service">
          <Button>Terms of service</Button>
        </Link>
        <Link href="/privacy-policy">
          <Button>Privacy policy</Button>
        </Link>
      </div>
      <div className={copyrightRecipe()}>©2023 LGTMeme</div>
    </footer>
  );
};

const footerRecipe = cva({
  base: { bgColor: "BLACK", color: "WHITE", maxWidth: "100vw", height: "140px" },
});

const copyrightRecipe = cva({
  base: { textAlign: "center" },
});

const buttonsRecipe = cva({
  base: { textAlign: "center", paddingTop: "8" },
});

export default Footer;
