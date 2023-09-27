export const MAX_IMAGES_FETCH_COUNT = 9;
export const MAX_KEYWORD_LENGTH = 50;
export const IMAGE_SIZE = 300;

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
