/** @jest-environment node */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PATCH, DELETE } from "@/app/api/images/[id]/route";
import {
  INTERNAL_SERVER_ERROR_STATUS,
  NOT_FOUND_ERROR_MESSAGE,
  NOT_FOUND_ERROR_NAME,
  NOT_FOUND_ERROR_STATUS,
  OK_STATUS,
  VALIDATION_ERROR_NAME,
  VALIDATION_ERROR_STATUS,
} from "@/constants/exceptions";
import {
  PATCH_IMAGE_REQUEST_TYPE_AUTH_CHECK,
  PATCH_IMAGE_REQUEST_TYPE_COPY,
  PATCH_IMAGE_REQUEST_TYPE_REPORT,
  VALIDATION_ERROR_MESAGE_REQUEST_TYPE,
} from "@/constants/image";
import { verifyAuth } from "@/utils/jwt";
import { storage } from "@/utils/supabase";
import { generateStaticUUID } from "@/utils/uuid";
import { prismaMock } from "@@/jest.setup";

const imageId = "imageId";
jest.mock("uuid", () => ({
  v4: () => imageId,
}));

jest.mock("../../../../utils/jwt");

const PRISMA_ERROR_NAME = "PrismaClientKnownRequestError";
const PRISMA_ERROR_MESSAGE = "Some prisma error occurs.";
const PRISMA_CLIENT_ERROR = new PrismaClientKnownRequestError(PRISMA_ERROR_MESSAGE, {
  code: "Pxxxx",
  clientVersion: "any version",
});

/**
 * You can't just pass the type of the selected column to mockResolvedValue,
 * so you can work around it by using any. For more information, please see the link below.
 * https://github.com/prisma/prisma/discussions/7084#discussioncomment-793219
 */

describe("Images API", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  describe("PATCH", () => {
    describe("Success patterns", () => {
      test.each`
        requestType                            | updateColumn           | condition
        ${PATCH_IMAGE_REQUEST_TYPE_COPY}       | ${{ usedCount: 1 }}    | ${"requestType is copy."}
        ${PATCH_IMAGE_REQUEST_TYPE_REPORT}     | ${{ reported: true }}  | ${"requestType is report."}
        ${PATCH_IMAGE_REQUEST_TYPE_AUTH_CHECK} | ${{ confirmed: true }} | ${"requestType is authCheck."}
      `("200: Update image, when $condition", async ({ requestType, updateColumn }) => {
        prismaMock.image.findUnique.mockResolvedValue({
          usedCount: 0,
        } as any);
        prismaMock.image.update.mockResolvedValue({} as any);
        const imageId = generateStaticUUID(1);
        const req = {
          url: `http://localhost:3002/api/images/${imageId}`,
          json: () => ({ requestType }),
        } as unknown as Request;
        const result = await PATCH(req);
        expect(await result.json()).toEqual({});
        expect(result.status).toBe(OK_STATUS);
      });
    });
    describe("Failure patterns", () => {
      test("400: Return validation error, when requestType is invalid.", async () => {
        const imageId = generateStaticUUID(1);
        const req = {
          url: `http://localhost:3002/api/images/${imageId}`,
          json: () => ({ requestType: "invalid" }),
        } as unknown as Request;
        const result = await PATCH(req);
        const { name, message } = await result.json();
        expect(name).toBe(VALIDATION_ERROR_NAME);
        expect(message).toBe(VALIDATION_ERROR_MESAGE_REQUEST_TYPE);
        expect(result.status).toBe(VALIDATION_ERROR_STATUS);
      });
      test("404: Return not found error, when image doesn't exist.", async () => {
        prismaMock.image.findUnique.mockResolvedValue(null);
        const imageId = generateStaticUUID(1);
        const req = {
          url: `http://localhost:3002/api/images/${imageId}`,
          json: () => ({ requestType: PATCH_IMAGE_REQUEST_TYPE_COPY }),
        } as unknown as Request;
        const result = await PATCH(req);
        const { name, message } = await result.json();
        expect(name).toBe(NOT_FOUND_ERROR_NAME);
        expect(message).toBe(NOT_FOUND_ERROR_MESSAGE);
        expect(result.status).toBe(NOT_FOUND_ERROR_STATUS);
      });
      test("500: Return prisma error, when prisma error occurs.", async () => {
        prismaMock.image.findUnique.mockRejectedValue(PRISMA_CLIENT_ERROR);
        const imageId = generateStaticUUID(1);
        const req = {
          url: `http://localhost:3002/api/images/${imageId}`,
          json: () => ({ requestType: PATCH_IMAGE_REQUEST_TYPE_COPY }),
        } as unknown as Request;
        const result = await PATCH(req);
        const { name, message } = await result.json();
        expect(name).toBe(PRISMA_ERROR_NAME);
        expect(message).toBe(PRISMA_ERROR_MESSAGE);
        expect(result.status).toBe(INTERNAL_SERVER_ERROR_STATUS);
      });
    });
  });
  describe("DELETE", () => {
    const req = { url: "http://localhost:3002/api/images/1" } as Request;
    test("Success: Delete image.", async () => {
      (verifyAuth as jest.Mock).mockImplementation(() => {});
      const deleteMock = prismaMock.image.delete.mockResolvedValue({} as any);
      const removeSpy = jest.spyOn(storage, "remove").mockImplementation();
      const result = await DELETE(req);
      expect(await result.json()).toEqual({});
      expect(deleteMock).toBeCalledWith({ where: { id: "1" } });
      expect(removeSpy).toBeCalledWith(["1"]);
    });
    test("Failure: Return an error message when authentication fails.", async () => {
      (verifyAuth as jest.Mock).mockImplementation(() => {
        throw new Error("Authorization error");
      });
      const result = await DELETE(req);
      expect(await result.json()).toEqual({ errorMessage: "Authorization error" });
    });
    test("Failure: Returns an error message if there is a problem with the delete.", async () => {
      (verifyAuth as jest.Mock).mockImplementation(() => {});
      prismaMock.image.delete.mockRejectedValue(new Error("Internal server error"));
      const result = await DELETE(req);
      expect(await result.json()).toEqual({ errorMessage: "Internal server error" });
    });
    test("Failure: Returns an error message if there is a problem deleting from storage.", async () => {
      (verifyAuth as jest.Mock).mockImplementation(() => {});
      prismaMock.image.delete.mockResolvedValue({} as any);
      jest.spyOn(storage, "remove").mockRejectedValue(new Error("Failed to remove from storage"));
      const result = await DELETE(req);
      expect(await result.json()).toEqual({ errorMessage: "Failed to remove from storage" });
    });
  });
});
