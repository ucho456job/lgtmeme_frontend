/**
 * @jest-environment node
 */
import { PATCH, DELETE } from "@/app/api/images/[id]/route";
import { PATCH_IMAGE_REQUEST_TYPE } from "@/constants/image";
import { verifyAuth } from "@/utils/jwt";
import { storage } from "@/utils/supabase";
import { prismaMock } from "@@/jest.setup";

const imageId = "imageId";
jest.mock("uuid", () => ({
  v4: () => imageId,
}));

jest.mock("../../../../utils/jwt");

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
    test("Success: Updates usedCount for the given image id.", async () => {
      const findUniqueMock = prismaMock.image.findUnique.mockResolvedValue({ usedCount: 0 } as any);
      const updateMock = prismaMock.image.update.mockResolvedValue({} as any);
      const req = {
        url: "http://localhost:3002/api/images/1",
        json: () => {
          return { requestType: PATCH_IMAGE_REQUEST_TYPE.copy };
        },
      } as unknown as Request;
      const result = await PATCH(req);
      expect(await result.json()).toEqual({});
      expect(findUniqueMock).toBeCalledWith({ select: { usedCount: true }, where: { id: "1" } });
      expect(updateMock).toBeCalledWith({ data: { usedCount: 1 }, where: { id: "1" } });
    });
    test("Success: Updates reported for the given image id.", async () => {
      const updateMock = prismaMock.image.update.mockResolvedValue({} as any);
      const req = {
        url: "http://localhost:3002/api/images/1",
        json: () => {
          return { requestType: PATCH_IMAGE_REQUEST_TYPE.report };
        },
      } as unknown as Request;
      const result = await PATCH(req);
      expect(await result.json()).toEqual({});
      expect(updateMock).toBeCalledWith({ data: { reported: true }, where: { id: "1" } });
    });
    test("Success: Updates confirmed for the given image id.", async () => {
      const updateMock = prismaMock.image.update.mockResolvedValue({} as any);
      const req = {
        url: "http://localhost:3002/api/images/1",
        json: () => {
          return { requestType: PATCH_IMAGE_REQUEST_TYPE.confirm };
        },
      } as unknown as Request;
      const result = await PATCH(req);
      expect(await result.json()).toEqual({});
      expect(updateMock).toBeCalledWith({ data: { confirmed: true }, where: { id: "1" } });
    });
    test("Failure: Returns an error message if the request type is invalid.", async () => {
      const req = {
        url: "http://localhost:3002/api/images/1",
        json: () => {
          return { requestType: undefined };
        },
      } as unknown as Request;
      const result = await PATCH(req);
      expect(await result.json()).toEqual({ errorMessage: "Bad request" });
    });
    test("Failure: Returns an error message if there is a problem with the update.", async () => {
      prismaMock.image.update.mockRejectedValue(new Error("Internal server error"));
      const req = {
        url: "http://localhost:3002/api/images/1",
        json: () => {
          return { requestType: PATCH_IMAGE_REQUEST_TYPE.confirm };
        },
      } as unknown as Request;
      const result = await PATCH(req);
      expect(await result.json()).toEqual({ errorMessage: "Internal server error" });
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
