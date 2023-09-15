import Link from "next/link";
import Button from "@/components/atoms/Button";
import ImageGallery from "@/components/organisms/ImageGallery";
import { ImageService } from "@/services/image.service";
import { css } from "@@/styled-system/css";

export default async function Home() {
  const service = new ImageService();
  const images = await service.fetchImages({ page: 0 });
  return (
    <>
      <ImageGallery css={imageGalleryCss} initImages={images} />
      <Link href="/add">
        <Button css={buttonCss} iconPath="/images/plus.svg">
          Create image
        </Button>
      </Link>
    </>
  );
}

const imageGalleryCss = css({
  margin: "auto",
  paddingX: "3",
  lg: { maxWidth: "1090px" },
  md: { maxWidth: "730px" },
  sm: { maxWidth: "370px" },
});
const buttonCss = css({ position: "fixed", bottom: "10", right: "5" });

/*
  I encountered a 'fetch failed' error during the build process.
  As a solution, I have written the following code.
  You can find the issue URL below.
  https://github.com/vercel/next.js/issues/49578
*/
export const runtime = "edge";
