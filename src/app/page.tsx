import Link from "next/link";
import { ImageService } from "@/services/image.service";
import Button from "@/components/atoms/Button";
import ImageGallery from "@/components/organisms/ImageGallery";
import { css } from "@@/styled-system/css";

export default async function Home() {
  const service = new ImageService();
  // const images = await service.fetchImages();
  const images = [
    {
      id: 1,
      title: "Square",
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
    {
      id: 2,
      title: "Square",
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
    {
      id: 3,
      title: "Square",
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
    {
      id: 4,
      title: "Square",
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
    {
      id: 5,
      title: "Square",
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
    {
      id: 6,
      title: "Square",
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
    {
      id: 7,
      title: "Square",
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
    {
      id: 8,
      title: "Square",
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
    {
      id: 9,
      title: "Square",
      url: "https://placehold.jp/300x300.png",
      width: 300,
      height: 300,
    },
  ];
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

const imageGalleryCss = css({ maxWidth: "1090px", margin: "auto" });
const buttonCss = css({ position: "fixed", bottom: "10", right: "5" });

/*
  I encountered a 'fetch failed' error during the build process.
  As a solution, I have written the following code.
  You can find the issue URL below.
  https://github.com/vercel/next.js/issues/49578
*/
export const runtime = "edge";
