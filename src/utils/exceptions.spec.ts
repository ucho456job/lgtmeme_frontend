/** @jest-environment node */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
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
    test("Return error when known error types.", async () => {
      const errorMessage = "Some error occurs.";
      const error = new Error(errorMessage);
      const result = commonErrorHandler(error);
      const body = await result.json();
      expect(body).toEqual({
        name: "Error",
        message: errorMessage,
      });
      expect(result.status).toBe(INTERNAL_SERVER_ERROR_STATUS);
    });
    test("Return prisma error, when prisma error occurs.", async () => {
      const prismaErrorName = "PrismaClientKnownRequestError";
      const prismaErrorMessage = "Some prisma error occurs.";
      const error = new PrismaClientKnownRequestError(prismaErrorMessage, {
        code: "Pxxxx",
        clientVersion: "any version",
      });
      const result = commonErrorHandler(error);
      const body = await result.json();
      expect(body).toEqual({
        name: prismaErrorName,
        message: prismaErrorMessage,
      });
      expect(result.status).toBe(INTERNAL_SERVER_ERROR_STATUS);
    });
    test("Return internal server error when unknown error types.", async () => {
      const error = { someError: "someError" };
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
