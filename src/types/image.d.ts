type Image = {
  id: string;
  url: string;
};

type ActiveTabId = "timeLine" | "popular" | "favorite";

type TextStyle = {
  left: number;
  top: number;
  color: string;
  fontSize: SizeMapKey;
  width: number;
  height: number;
  lineHeight: string;
  fontFamily: string;
};

type TextSizeSmall = 36;

type TextSizeMedium = 60;

type TextSizeLarge = 84;

type SizeMapKey = TextSizeSmall | TextSizeMedium | TextSizeLarge;

type SizeMap = Map<
  SizeMapKey,
  {
    size: SizeMapKey;
    width: number;
    height: number;
    diff: number;
  }
>;

type GetImageArg = {
  page?: number;
  keyword?: string;
  activeTabId?: ActiveTabId;
  favoriteImageIds?: string[];
};

type GetImageQuery = {
  page: number;
  keyword: string;
  activeTabId: ActiveTabId;
  favoriteImageIds: string[];
};

type GetImageResBody = {
  images: Image[];
};

type PostImageReqBody = {
  image: string;
  keyword: string;
};

type PostImageResBody = {
  imageUrl: string;
};
