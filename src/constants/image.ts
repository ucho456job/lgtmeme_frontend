export const MAX_IMAGES_FETCH_COUNT = 9;
export const MAX_KEYWORD_LENGTH = 50;
export const IMAGE_SIZE = 300;

export const ACTIVE_TAB_ID_TIME_LINE = "timeLine";
export const ACTIVE_TAB_ID_POPULAR = "popular";
export const ACTIVE_TAB_ID_FAVORITE = "favorite";

export const VALIDATION_ERROR_MESAGE_PAGE = "Page number must be a non-negative integer.";
export const VALIDATION_ERROR_MESAGE_KEYWORD =
  "Keyword must be a string and less than 50 characters.";
export const VALIDATION_ERROR_MESAGE_ACTIVE_TAB_ID = "Invalid activeTabId.";
export const VALIDATION_ERROR_MESAGE_FAVORITE_IMAGE_IDS = "Invalid uuid in favoriteImageIds.";
export const VALIDATION_ERROR_MESAGE_IMAGE = "Image is not a base64 encoded webp format string.";
export const VALIDATION_ERROR_MESAGE_REQUEST_TYPE = "Request type is invalid.";

export const FONT_FAMILY_OPTIONS = [
  { value: "Arial", label: "Arial" },
  { value: "Verdana", label: "Verdana" },
  { value: "Times New Roman", label: "Times New Roman" },
];

export const TEXT_SIZE_SMALL = 36;
export const TEXT_SIZE_MEDIUM = 60;
export const TEXT_SIZE_LARGE = 84;

export const TEXT_SIZE_OPTIONS = [
  { value: TEXT_SIZE_SMALL, label: "Small" },
  { value: TEXT_SIZE_MEDIUM, label: "Medium" },
  { value: TEXT_SIZE_LARGE, label: "Large" },
];

export const SIZE_MAP: SizeMap = new Map([
  [TEXT_SIZE_SMALL, { size: TEXT_SIZE_SMALL, width: 102, height: TEXT_SIZE_SMALL, diff: 30 }],
  [TEXT_SIZE_MEDIUM, { size: TEXT_SIZE_MEDIUM, width: 169, height: TEXT_SIZE_MEDIUM, diff: 50 }],
  [TEXT_SIZE_LARGE, { size: TEXT_SIZE_LARGE, width: 235, height: TEXT_SIZE_LARGE, diff: 71 }],
]);

export const PATCH_IMAGE_REQUEST_TYPE_COPY = "copy";
export const PATCH_IMAGE_REQUEST_TYPE_REPORT = "report";
export const PATCH_IMAGE_REQUEST_TYPE_AUTH_CHECK = "authCheck";
