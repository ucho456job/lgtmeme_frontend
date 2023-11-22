export const SUCCESS_STATUS = 200;
export const SUCCESS_STATUS_POST = 201;

/** 400 Validation error */
export const VALIDATION_ERROR = {
  name: "ValidationError",
  status: 400,
};
export const GET_IMAGES_VALIDATION_ERROR = {
  name: VALIDATION_ERROR.name,
  pageMessage: "Page number must be a non-negative integer.",
  keywordMessage: "Keyword must be a string and less than 50 characters.",
  activeTabIdMessage: "Invalid activeTabId.",
  favoriteImageIdsMessage: "Invalid favoriteImageIds.",
  confirmMessage: "Confirm must be 'true' or 'false'.",
  status: VALIDATION_ERROR.status,
};

/** 500 Internal server error */
export const INTERNAL_SERVER_ERROR = {
  name: "InternalServerError",
  message: "An unexpected error occurred. Please try again later.",
  status: 500,
};

/** 500 Unknown error */
export const UNKNOWN_ERROR = {
  name: "UnknownError",
  message: "An unknown error occured. Please try again later.",
  status: 500,
};
