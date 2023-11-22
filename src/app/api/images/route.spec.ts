/** @jest-environment node */
import { GET, POST } from "@/app/api/images/route";
import {
  GET_IMAGES_VALIDATION_ERROR,
  INTERNAL_SERVER_ERROR,
  SUCCESS_STATUS,
} from "@/constants/exceptions";
import { ACTIVE_TAB_ID } from "@/constants/image";
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
  const resImages = [{ id: "1", url: "https://placehold.jp/300x300.png", reported: false }];
  describe("GET", () => {
    describe("Success patterns", () => {
      const uuid = generateStaticUUID("id");
      test.each`
        page | keyword           | activeTabId               | favoriteImageIds | confirm    | title
        ${0} | ${""}             | ${ACTIVE_TAB_ID.timeLine} | ${""}            | ${"false"} | ${"initial query"}
        ${1} | ${"a".repeat(50)} | ${ACTIVE_TAB_ID.popular}  | ${""}            | ${"false"} | ${"page, keyword, and activeTagId set in the query"}
        ${0} | ${""}             | ${ACTIVE_TAB_ID.favorite} | ${uuid}          | ${"false"} | ${"favoriteImageIds set in the query"}
        ${0} | ${""}             | ${ACTIVE_TAB_ID.timeLine} | ${""}            | ${"true"}  | ${"confirm set in the query"}
      `(
        "When called with $title, it should return images.",
        async ({ page, keyword, activeTabId, favoriteImageIds, confirm }) => {
          prismaMock.image.findMany.mockResolvedValue(resImages as any);
          const req = {
            url: `http://localhost:3002/api/images?page=${page}&keyword=${keyword}&activeTabId=${activeTabId}&favoriteImageIds=${favoriteImageIds}&confirm=${confirm}`,
          } as Request;
          const result = await GET(req);
          const { images } = await result.json();
          expect(images).toEqual(resImages);
          expect(result.status).toBe(SUCCESS_STATUS);
        },
      );
    });
    describe("Failure patterns", () => {
      test.each`
        page   | keyword           | activeTabId               | favoriteImageIds  | confirm      | expectMessage                                          | title
        ${-1}  | ${""}             | ${ACTIVE_TAB_ID.timeLine} | ${""}             | ${"false"}   | ${GET_IMAGES_VALIDATION_ERROR.pageMessage}             | ${"page is a negative number."}
        ${1.5} | ${""}             | ${ACTIVE_TAB_ID.timeLine} | ${""}             | ${"false"}   | ${GET_IMAGES_VALIDATION_ERROR.pageMessage}             | ${"page contains decimal point."}
        ${0}   | ${"a".repeat(51)} | ${ACTIVE_TAB_ID.timeLine} | ${""}             | ${"false"}   | ${GET_IMAGES_VALIDATION_ERROR.keywordMessage}          | ${"keyword is more than 50 characters."}
        ${0}   | ${""}             | ${"invalid"}              | ${""}             | ${"false"}   | ${GET_IMAGES_VALIDATION_ERROR.activeTabIdMessage}      | ${"activeTabId is invalid."}
        ${0}   | ${""}             | ${ACTIVE_TAB_ID.timeLine} | ${"invalid-uuid"} | ${"false"}   | ${GET_IMAGES_VALIDATION_ERROR.favoriteImageIdsMessage} | ${"favoriteImageIds contains invalid uuid."}
        ${0}   | ${""}             | ${ACTIVE_TAB_ID.timeLine} | ${""}             | ${"invalid"} | ${GET_IMAGES_VALIDATION_ERROR.confirmMessage}          | ${"confirm is invalid."}
      `(
        "Validation error: $title",
        async ({ page, keyword, activeTabId, favoriteImageIds, confirm, expectMessage }) => {
          const req = {
            url: `http://localhost:3002/api/images?page=${page}&keyword=${keyword}&activeTabId=${activeTabId}&favoriteImageIds=${favoriteImageIds}&confirm=${confirm}`,
          } as Request;
          const result = await GET(req);
          const { name, message } = await result.json();
          expect(name).toBe(GET_IMAGES_VALIDATION_ERROR.name);
          expect(message).toBe(expectMessage);
          expect(result.status).toBe(GET_IMAGES_VALIDATION_ERROR.status);
        },
      );
      test("Internal server error: When an error occurs, return 500.", async () => {
        prismaMock.image.findMany.mockRejectedValue(new Error("Internal server error"));
        const req = {
          url: "http://localhost:3002/api/images?page=0&keyword=&activeTabId=timeLine&favoriteImageIds=&confirm=false",
        } as Request;
        const result = await GET(req);
        const { name, message } = await result.json();
        expect(name).toBe(INTERNAL_SERVER_ERROR.name);
        expect(message).toBe(INTERNAL_SERVER_ERROR.message);
        expect(result.status).toBe(INTERNAL_SERVER_ERROR.status);
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
