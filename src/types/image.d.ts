type Image = {
  id: string;
  url: string;
  reported: boolean;
};

/** GET */
type ActiveTabId = "timeLine" | "popular" | "favorite";
type GetImagesQuery = {
  page: number;
  keyword: string;
  activeTabId: ActiveTabId;
  favoriteImageIds: string[];
  isAuthCheck?: boolean | null;
};
type GetImagesResponseBody = {
  images: Image[];
};
type GetImagesSuccessResponse = {
  images: Image[];
  ok: true;
};
type GetImagesResponse = GetImagesSuccessResponse | ErrorResponse;

/** POST */
type PostImageRequestBody = {
  image: string;
  keyword: string;
};
type PostImageResponseBody = {
  imageUrl: string;
};
type PostImageSuccessResponse = {
  imageUrl: string;
  ok: true;
};
type PostImageResponse = PostImageSuccessResponse | ErrorResponse;

/** PATCH */
type PatchRequestType = "copy" | "report" | "authCheck";
type PatchImageRequestBody = {
  requestType: PatchRequestType;
};
type PatchImageSuccessResponse = { ok: true };
type PatchImageResponse = PatchImageSuccessResponse | ErrorResponse;

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
