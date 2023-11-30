/** @jest-environment node */
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { FileObject, StorageError } from "@supabase/storage-js";
import { GET, POST } from "@/app/api/images/route";
import {
  CREATED_STATUS,
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
  VALIDATION_ERROR_MESAGE_IMAGE,
  VALIDATION_ERROR_MESAGE_KEYWORD,
  VALIDATION_ERROR_MESAGE_PAGE,
} from "@/constants/image";
import { storage } from "@/utils/supabase";
import { generateStaticUUID } from "@/utils/uuid";
import { prismaMock } from "@@/jest.setup";

const IMAGE_ID = "imageId";
jest.mock("uuid", () => ({
  v4: () => IMAGE_ID,
}));

const PRISMA_ERROR_NAME = "PrismaClientKnownRequestError";
const PRISMA_ERROR_MESSAGE = "Some prisma error occurs.";
const PRISMA_CLIENT_ERROR = new PrismaClientKnownRequestError(PRISMA_ERROR_MESSAGE, {
  code: "Pxxxx",
  clientVersion: "any version",
});

const STORAGE_ERROR_NAME = "StorageError";
const STORAGE_ERROR_MESSAGE = "Some storage error occurs.";

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
        "400: Return validation error, when $condition",
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
      test("500: Return prisma error, when prisma error occurs.", async () => {
        prismaMock.image.findMany.mockRejectedValue(PRISMA_CLIENT_ERROR);
        const req = {
          url: "http://localhost:3002/api/images?page=0&keyword=&activeTabId=timeLine&favoriteImageIds=",
        } as Request;
        const result = await GET(req);
        const { name, message } = await result.json();
        expect(name).toBe(PRISMA_ERROR_NAME);
        expect(message).toBe(PRISMA_ERROR_MESSAGE);
        expect(result.status).toBe(INTERNAL_SERVER_ERROR_STATUS);
      });
    });
  });
  describe("POST", () => {
    const webpImage = "data:image/webp;base64,iVBORw0KGgoA";
    describe("Success patterns", () => {
      test.each`
        image        | keyword           | condition
        ${webpImage} | ${""}             | ${"basic body."}
        ${webpImage} | ${"a".repeat(50)} | ${"keyword <= 50."}
      `("201: Return image url, when $condition", async ({ image, keyword }) => {
        const req = {
          json: async () => {
            return { image, keyword };
          },
        } as Request;
        jest.spyOn(storage, "upload").mockImplementation(async () => {
          return { data: { path: IMAGE_ID }, error: null };
        });
        const expectUrl = "Expect image url";
        prismaMock.image.create.mockResolvedValue({ url: expectUrl } as any);
        const result = await POST(req);
        const { imageUrl } = await result.json();
        const status = await result.status;
        expect(imageUrl).toBe(expectUrl);
        expect(status).toBe(CREATED_STATUS);
      });
    });
    describe("Failure patterns", () => {
      const pngImage = "data:image/png;base64,iVBORw0KGgoA";
      test.each`
        image        | keyword           | expectErrorMessage                 | condition
        ${0}         | ${""}             | ${VALIDATION_ERROR_MESAGE_IMAGE}   | ${"image isn't string."}
        ${pngImage}  | ${""}             | ${VALIDATION_ERROR_MESAGE_IMAGE}   | ${"image isn't webp."}
        ${webpImage} | ${0}              | ${VALIDATION_ERROR_MESAGE_KEYWORD} | ${"keyword is't string."}
        ${webpImage} | ${"a".repeat(51)} | ${VALIDATION_ERROR_MESAGE_KEYWORD} | ${"keyword > 50."}
      `(
        "400: Return validation error, when $condition",
        async ({ image, keyword, expectErrorMessage }) => {
          const req = {
            json: async () => {
              return { image, keyword };
            },
          } as Request;
          const result = await POST(req);
          const { name, message } = await result.json();
          expect(name).toBe(VALIDATION_ERROR_NAME);
          expect(message).toBe(expectErrorMessage);
          expect(result.status).toBe(VALIDATION_ERROR_STATUS);
        },
      );
      test("500: Return storage error, when an error occurs in storage.upload.", async () => {
        const req = {
          json: async () => {
            return { image: webpImage, keyword: "" };
          },
        } as Request;
        jest.spyOn(storage, "upload").mockImplementation(async () => {
          const storageError = new StorageError(STORAGE_ERROR_MESSAGE);
          return { data: null, error: storageError };
        });
        const result = await POST(req);
        const { name, message } = await result.json();
        expect(name).toBe(STORAGE_ERROR_NAME);
        expect(message).toBe(STORAGE_ERROR_MESSAGE);
        expect(result.status).toBe(INTERNAL_SERVER_ERROR_STATUS);
      });
      test("500: Return prisma error, when timeout error occurs.", async () => {
        const req = {
          json: async () => {
            return { image: webpImage, keyword: "" };
          },
        } as Request;
        jest.spyOn(storage, "upload").mockImplementation(async () => {
          return { data: { path: IMAGE_ID }, error: null };
        });
        prismaMock.image.create.mockRejectedValue(PRISMA_CLIENT_ERROR);
        jest.spyOn(storage, "remove").mockImplementation(async () => {
          const fileObjects = [] as FileObject[];
          return { data: fileObjects, error: null };
        });
        const result = await POST(req);
        const { name, message } = await result.json();
        expect(name).toBe(PRISMA_ERROR_NAME);
        expect(message).toBe(PRISMA_ERROR_MESSAGE);
        expect(result.status).toBe(INTERNAL_SERVER_ERROR_STATUS);
      });
      test("500: Return storage error, when an error occurs in storage.remove.", async () => {
        const req = {
          json: async () => {
            return { image: webpImage, keyword: "" };
          },
        } as Request;
        jest.spyOn(storage, "upload").mockImplementation(async () => {
          return { data: { path: IMAGE_ID }, error: null };
        });
        prismaMock.image.create.mockRejectedValue(PRISMA_CLIENT_ERROR);
        jest.spyOn(storage, "remove").mockImplementation(async () => {
          const storageError = new StorageError(STORAGE_ERROR_MESSAGE);
          return { data: null, error: storageError };
        });
        const result = await POST(req);
        const { name, message } = await result.json();
        expect(name).toBe(STORAGE_ERROR_NAME);
        expect(message).toBe(STORAGE_ERROR_MESSAGE);
        expect(result.status).toBe(INTERNAL_SERVER_ERROR_STATUS);
      });
    });
  });
});
