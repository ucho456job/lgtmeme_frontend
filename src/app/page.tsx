import Link from "next/link";
import ImageGallery from "@/app/ImageGallery";
import Button from "@/components/atoms/Button/Button";
import Svg from "@/components/atoms/Svg/Svg";
import { CREATE_IMAGE_ENDPOINT } from "@/constants/endpoints";
import { ACTIVE_TAB_ID_TIME_LINE } from "@/constants/image";
import { ImageService } from "@/services/image.service";
import { ServerComponentError } from "@/utils/exceptions";
import { css } from "@@/styled-system/css";

const Home = async () => {
  const service = new ImageService();
  const res = await service.getImages({
    page: 0,
    keyword: "",
    activeTabId: ACTIVE_TAB_ID_TIME_LINE,
    favoriteImageIds: [],
  });
  if (!res.ok) throw new ServerComponentError(res.message);
  return (
    <div>
      <ImageGallery css={imageGalleryCss} initImages={res.images} />
      <Link href={CREATE_IMAGE_ENDPOINT}>
        <Button css={buttonCss} icon={<Svg icon="plus" color="white" />}>
          Create image
        </Button>
      </Link>
    </div>
  );
};

const imageGalleryCss = css({
  margin: "auto",
  paddingX: "3",
  lg: { maxWidth: "1090px" },
  md: { maxWidth: "730px" },
  sm: { maxWidth: "370px" },
});
const buttonCss = css({ position: "fixed", bottom: "10", right: "5" });

export default Home;

/*
  I encountered a 'fetch failed' error during the build process.
  As a solution, I have written the following code.
  You can find the issue URL below.
  https://github.com/vercel/next.js/issues/49578
*/
export const runtime = "edge";
