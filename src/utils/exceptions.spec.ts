/** @jest-environment node */
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_NAME,
  INTERNAL_SERVER_ERROR_STATUS,
  VALIDATION_ERROR_NAME,
  VALIDATION_ERROR_STATUS,
} from "@/constants/exceptions";
import { VALIDATION_ERROR_MESAGE_KEYWORD } from "@/constants/image";
import { commonErrorHandler, ValidationError } from "@/utils/exceptions";

describe("exceptions", () => {
  describe("commonErrorHandler", () => {
    test("Return validation error, when error type is ValidationError.", async () => {
      const error = new ValidationError(VALIDATION_ERROR_MESAGE_KEYWORD);
      const result = commonErrorHandler(error);
      const body = await result.json();
      expect(body).toEqual({
        name: VALIDATION_ERROR_NAME,
        message: VALIDATION_ERROR_MESAGE_KEYWORD,
      });
      expect(result.status).toBe(VALIDATION_ERROR_STATUS);
    });
    test("Return internal server error, when error type isn't custom error class.", async () => {
      const error = new Error();
      const result = commonErrorHandler(error);
      const body = await result.json();
      expect(body).toEqual({
        name: INTERNAL_SERVER_ERROR_NAME,
        message: INTERNAL_SERVER_ERROR_MESSAGE,
      });
      expect(result.status).toBe(INTERNAL_SERVER_ERROR_STATUS);
    });
  });
});
