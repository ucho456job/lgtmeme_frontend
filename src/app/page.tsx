import Link from "next/link";
import { ImageService } from "@/services/image.service";
import Client from "@/app/client";
import Button from "@/components/atoms/Button";
import packageJson from "@@/package.json";
import { css } from "@@/styled-system/css";

export default async function Home() {
  const service = new ImageService();
  const images = await service.fetchImages();
  return (
    <>
      <div className={css({ fontSize: "2xl", fontWeight: "bold" })}>Hello, World</div>
      <div>ver. {packageJson.version}</div>
      {images.map((i) => {
        return <div key={i.id}>{i.title}</div>;
      })}
      <Link href="/add">
        <Button>Add button</Button>
      </Link>
      <Client />
    </>
  );
}

/*
  I encountered a 'fetch failed' error during the build process.
  As a solution, I have written the following code.
  You can find the issue URL below.
  https://github.com/vercel/next.js/issues/49578
*/
export const runtime = "edge";
