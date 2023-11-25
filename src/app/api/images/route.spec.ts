/** @jest-environment node */
import { GET, POST } from "@/app/api/images/route";
import {
  INTERNAL_SERVER_ERROR_MESSAGE,
  INTERNAL_SERVER_ERROR_NAME,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
  VALIDATION_ERROR_NAME,
  VALIDATION_ERROR_STATUS,
} from "@/constants/exceptions";
import {
  ACTIVE_TAB_ID_FAVORITE,
  ACTIVE_TAB_ID_POPULAR,
  ACTIVE_TAB_ID_TIME_LINE,
  VALIDATION_ERROR_MESAGE_ACTIVE_TAB_ID,
  VALIDATION_ERROR_MESAGE_FAVORITE_IMAGE_IDS,
  VALIDATION_ERROR_MESAGE_KEYWORD,
  VALIDATION_ERROR_MESAGE_PAGE,
} from "@/constants/image";
import { storage } from "@/utils/supabase";
import { generateStaticUUID } from "@/utils/uuid";
import { prismaMock } from "@@/jest.setup";

const imageId = "imageId";
jest.mock("uuid", () => ({
  v4: () => imageId,
}));

/**
 * You can't just pass the type of the selected column to mockResolvedValue,
 * so you can work around it by using any. For more information, please see the link below.
 * https://github.com/prisma/prisma/discussions/7084#discussioncomment-793219
 */

describe("Images API", () => {
  const sampleImageUrl = "https://placehold.jp/300x300.png";
  const imageId_1 = generateStaticUUID(1);
  const imageId_2 = generateStaticUUID(2);
  describe("GET", () => {
    let resImages: Image[];
    beforeEach(() => {
      resImages = [
        { id: imageId_1, url: sampleImageUrl, reported: false },
        { id: imageId_2, url: sampleImageUrl, reported: false },
      ];
    });
    describe("Success patterns", () => {
      test.each`
        page | keyword           | activeTabId                | favoriteImageIds               | condition
        ${0} | ${""}             | ${ACTIVE_TAB_ID_TIME_LINE} | ${""}                          | ${"basic query."}
        ${1} | ${""}             | ${ACTIVE_TAB_ID_TIME_LINE} | ${""}                          | ${"page = 1."}
        ${0} | ${"a".repeat(50)} | ${ACTIVE_TAB_ID_TIME_LINE} | ${""}                          | ${"keyword <= 50."}
        ${0} | ${""}             | ${ACTIVE_TAB_ID_POPULAR}   | ${""}                          | ${"activeTabId = popular."}
        ${0} | ${""}             | ${ACTIVE_TAB_ID_FAVORITE}  | ${""}                          | ${"activeTabId = favorite."}
        ${0} | ${""}             | ${ACTIVE_TAB_ID_FAVORITE}  | ${imageId_1 + "," + imageId_2} | ${"activeTabId = favorite and set favoriteImageIds."}
      `(
        "200: Return images, when $condition",
        async ({ page, keyword, activeTabId, favoriteImageIds }) => {
          prismaMock.image.findMany.mockResolvedValue(resImages as any);
          const req = {
            url: `http://localhost:3002/api/images?page=${page}&keyword=${keyword}&activeTabId=${activeTabId}&favoriteImageIds=${favoriteImageIds}`,
          } as Request;
          const result = await GET(req);
          const { images } = await result.json();
          expect(images).toEqual(resImages);
          expect(result.status).toBe(OK_STATUS);
        },
      );
      test("200: Return images, when isAuthCheck = true.", async () => {
        resImages[0].reported = true;
        resImages[1].reported = true;
        prismaMock.image.findMany.mockResolvedValue(resImages as any);
        const req = {
          url: `http://localhost:3002/api/images?page=0&keyword=&activeTabId=timeLine&favoriteImageIds=&isAuthCheck=true`,
        } as Request;
        const result = await GET(req);
        const { images } = await result.json();
        expect(images).toEqual(resImages);
        expect(result.status).toBe(OK_STATUS);
      });
    });
    describe("Failure patterns", () => {
      test.each`
        page   | keyword           | activeTabId                | favoriteImageIds  | expectErrorMessage                            | condition
        ${-1}  | ${""}             | ${ACTIVE_TAB_ID_TIME_LINE} | ${""}             | ${VALIDATION_ERROR_MESAGE_PAGE}               | ${"page is a negative number."}
        ${1.5} | ${""}             | ${ACTIVE_TAB_ID_TIME_LINE} | ${""}             | ${VALIDATION_ERROR_MESAGE_PAGE}               | ${"page contains decimal point."}
        ${0}   | ${"a".repeat(51)} | ${ACTIVE_TAB_ID_TIME_LINE} | ${""}             | ${VALIDATION_ERROR_MESAGE_KEYWORD}            | ${"keyword > 50"}
        ${0}   | ${""}             | ${"invalid"}               | ${""}             | ${VALIDATION_ERROR_MESAGE_ACTIVE_TAB_ID}      | ${"activeTabId is invalid."}
        ${0}   | ${""}             | ${ACTIVE_TAB_ID_TIME_LINE} | ${"invalid-uuid"} | ${VALIDATION_ERROR_MESAGE_FAVORITE_IMAGE_IDS} | ${"favoriteImageIds contains invalid uuid."}
      `(
        "400: Return error, when $condition",
        async ({ page, keyword, activeTabId, favoriteImageIds, expectErrorMessage }) => {
          const req = {
            url: `http://localhost:3002/api/images?page=${page}&keyword=${keyword}&activeTabId=${activeTabId}&favoriteImageIds=${favoriteImageIds}`,
          } as Request;
          const result = await GET(req);
          const { name, message } = await result.json();
          expect(name).toBe(VALIDATION_ERROR_NAME);
          expect(message).toBe(expectErrorMessage);
          expect(result.status).toBe(VALIDATION_ERROR_STATUS);
        },
      );
      test("500: Return error, when internal server error occurs.", async () => {
        prismaMock.image.findMany.mockRejectedValue(new Error("Internal server error"));
        const req = {
          url: "http://localhost:3002/api/images?page=0&keyword=&activeTabId=timeLine&favoriteImageIds=",
        } as Request;
        const result = await GET(req);
        const { name, message } = await result.json();
        expect(name).toBe(INTERNAL_SERVER_ERROR_NAME);
        expect(message).toBe(INTERNAL_SERVER_ERROR_MESSAGE);
        expect(result.status).toBe(INTERNAL_SERVER_ERROR_STATUS);
      });
    });
  });
  describe("POST", () => {
    const req = {
      json: async () => {
        return { image: "data:image/webp;base64,iVBORw0KGgoA", keyword: "keyword" };
      },
    } as Request;
    test("Success: Image upload succeeds and returns 200 status.", async () => {
      jest.spyOn(storage, "upload").mockImplementation(async () => {
        return { data: { path: imageId }, error: null };
      });
      const url = "Test image url";
      prismaMock.image.create.mockResolvedValue({ url } as any);
      const result = await POST(req);
      const { imageUrl } = await result.json();
      const status = await result.status;
      expect(imageUrl).toBe(url);
      expect(status).toBe(200);
    });
    test("Failure: Image upload failed and returns 500 status.", async () => {
      jest.spyOn(storage, "upload").mockImplementation(async () => {
        return { data: null, error: "happened error" as any };
      });
      const result = await POST(req);
      const { errorMessage } = await result.json();
      const status = await result.status;
      expect(errorMessage).toBe("Image upload failed");
      expect(status).toBe(500);
    });
    test("Failure: Image create failed and returns 500 status.", async () => {
      jest.spyOn(storage, "upload").mockImplementation(async () => {
        return { data: { path: imageId }, error: null };
      });
      prismaMock.image.create.mockRejectedValue(new Error("Internal server error"));
      const result = await POST(req);
      const { errorMessage } = await result.json();
      const status = await result.status;
      expect(errorMessage).toBe("Internal server error");
      expect(status).toBe(500);
    });
  });
});
