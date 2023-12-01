/** @jest-environment node */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_NAME,
  INTERNAL_SERVER_ERROR_STATUS,
  NOT_FOUND_ERROR_MESSAGE,
  NOT_FOUND_ERROR_NAME,
  NOT_FOUND_ERROR_STATUS,
  VALIDATION_ERROR_NAME,
  VALIDATION_ERROR_STATUS,
} from "@/constants/exceptions";
import { VALIDATION_ERROR_MESAGE_KEYWORD } from "@/constants/image";
import { createErrorResponse, NotFoundError, ValidationError } from "@/utils/exceptions";

describe("exceptions", () => {
  describe("createErrorResponse", () => {
    test("Return validation error, when error type is ValidationError.", async () => {
      const error = new ValidationError(VALIDATION_ERROR_MESAGE_KEYWORD);
      const result = createErrorResponse(error);
      expect(result).toEqual({
        name: VALIDATION_ERROR_NAME,
        message: VALIDATION_ERROR_MESAGE_KEYWORD,
        status: VALIDATION_ERROR_STATUS,
      });
    });
    test("Return not found error, when error type is NotFoundError.", async () => {
      const error = new NotFoundError();
      const result = createErrorResponse(error);
      expect(result).toEqual({
        name: NOT_FOUND_ERROR_NAME,
        message: NOT_FOUND_ERROR_MESSAGE,
        status: NOT_FOUND_ERROR_STATUS,
      });
    });
    test("Return error when known error types.", async () => {
      const errorMessage = "Some error occurs.";
      const error = new Error(errorMessage);
      const result = createErrorResponse(error);
      expect(result).toEqual({
        name: "Error",
        message: errorMessage,
        status: INTERNAL_SERVER_ERROR_STATUS,
      });
    });
    test("Return prisma error, when prisma error occurs.", async () => {
      const prismaErrorName = "PrismaClientKnownRequestError";
      const prismaErrorMessage = "Some prisma error occurs.";
      const error = new PrismaClientKnownRequestError(prismaErrorMessage, {
        code: "Pxxxx",
        clientVersion: "any version",
      });
      const result = createErrorResponse(error);
      expect(result).toEqual({
        name: prismaErrorName,
        message: prismaErrorMessage,
        status: INTERNAL_SERVER_ERROR_STATUS,
      });
    });
    test("Return internal server error when unknown error types.", async () => {
      const error = { someError: "someError" };
      const result = createErrorResponse(error);
      expect(result).toEqual({
        name: INTERNAL_SERVER_ERROR_NAME,
        message: INTERNAL_SERVER_ERROR_MESSAGE,
        status: INTERNAL_SERVER_ERROR_STATUS,
      });
    });
  });
});
