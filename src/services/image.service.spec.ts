import { IMAGES_API_ENDPOINT } from "@/constants/endpoints";
import {
  UNKNOWN_ERROR_MESSAGE,
  UNKNOWN_ERROR_NAME,
  VALIDATION_ERROR_NAME,
  VALIDATION_ERROR_STATUS,
} from "@/constants/exceptions";
import {
  ACTIVE_TAB_ID_TIME_LINE,
  PATCH_IMAGE_REQUEST_TYPE_COPY,
  VALIDATION_ERROR_MESAGE_KEYWORD,
} from "@/constants/image";
import { ImageService } from "@/services/image.service";
import { generateStaticUUID } from "@/utils/uuid";

describe("ImageService", () => {
  let imageService: ImageService;
  const sampleImageUrl = "https://placehold.jp/300x300.png";
  beforeAll(() => {
    imageService = new ImageService();
  });
  describe("getImages", () => {
    let resImages: Image[];
    let query: GetImagesQuery;
    beforeEach(() => {
      resImages = [
        { id: generateStaticUUID(1), url: sampleImageUrl, reported: false },
        { id: generateStaticUUID(2), url: sampleImageUrl, reported: false },
      ];
      query = {
        page: 0,
        keyword: "keyword",
        activeTabId: ACTIVE_TAB_ID_TIME_LINE,
        favoriteImageIds: [],
      };
    });
    describe("Success patterns", () => {
      test("200: Return images, when basic query.", async () => {
        const mockResponse = { images: resImages };
        const mockFetch = jest.fn().mockResolvedValue({
          ok: true,
          json: async () => mockResponse,
        });
        global.fetch = mockFetch;
        const result = await imageService.getImages(query);
        expect(result).toEqual({ ...mockResponse, ok: true });
      });
      test("200: Return images, when set isAuthCheck in query.", async () => {
        query.isAuthCheck = true;
        resImages[0].reported = true;
        resImages[1].reported = true;
        const mockResponse = { images: resImages };
        const mockFetch = jest.fn().mockResolvedValue({
          ok: true,
          json: async () => mockResponse,
        });
        global.fetch = mockFetch;
        const result = await imageService.getImages(query);
        expect(result).toEqual({ ...mockResponse, ok: true });
      });
    });
    describe("Failure patterns", () => {
      test("400: Return error, when validation error occurs.", async () => {
        const mockResponse = {
          name: VALIDATION_ERROR_NAME,
          message: VALIDATION_ERROR_MESAGE_KEYWORD,
        };
        const mockFetch = jest.fn().mockResolvedValue({
          ok: false,
          status: VALIDATION_ERROR_STATUS,
          json: async () => mockResponse,
        });
        global.fetch = mockFetch;
        query.keyword = "a".repeat(51);
        const result = await imageService.getImages(query);
        expect(result).toEqual({ ...mockResponse, ok: false });
      });
      test("500: Return error, when unknown error occurs.", async () => {
        const mockFetch = jest.fn().mockRejectedValue(new Error());
        global.fetch = mockFetch;
        const result = await imageService.getImages(query);
        expect(result).toEqual({
          name: UNKNOWN_ERROR_NAME,
          message: UNKNOWN_ERROR_MESSAGE,
          ok: false,
        });
      });
    });
  });
  describe("postImage", () => {
    let body: PostImageRequestBody;
    beforeEach(() => {
      body = {
        image: "data:image/png;base64,iVBORw0KGgoA",
        keyword: "keyword",
      };
    });
    describe("Success patterns", () => {
      test("200: Return imageUrl, when basic body.", async () => {
        const mockResponse = { imageUrl: sampleImageUrl };
        const mockFetch = jest.fn().mockResolvedValue({
          ok: true,
          json: async () => mockResponse,
        });
        global.fetch = mockFetch;
        const result = await imageService.postImage(body);
        expect(result).toEqual({ ...mockResponse, ok: true });
      });
    });
    describe("Failure patterns", () => {
      test("400: Return error, when validtaion error occurs.", async () => {
        const mockResponse = {
          name: VALIDATION_ERROR_NAME,
          message: VALIDATION_ERROR_MESAGE_KEYWORD,
        };
        const mockFetch = jest.fn().mockResolvedValue({
          ok: false,
          json: async () => mockResponse,
        });
        global.fetch = mockFetch;
        const result = await imageService.postImage(body);
        expect(result).toEqual({ ...mockResponse, ok: false });
      });
      test("500: Return error, when unknown error occurs.", async () => {
        const mockFetch = jest.fn().mockRejectedValue(new Error());
        global.fetch = mockFetch;
        const result = await imageService.postImage(body);
        expect(result).toEqual({
          name: UNKNOWN_ERROR_NAME,
          message: UNKNOWN_ERROR_MESSAGE,
          ok: false,
        });
      });
    });
  });
  describe("patchImage", () => {
    let id: string;
    let body: PatchImageRequestBody;
    beforeEach(() => {
      id = generateStaticUUID(1);
      body = { requestType: PATCH_IMAGE_REQUEST_TYPE_COPY };
    });
    describe("Success patterns", () => {
      test("200: Return ok, when basic body.", async () => {
        const mockFetch = jest.fn().mockResolvedValue({
          ok: true,
          json: async () => {},
        });
        global.fetch = mockFetch;
        const result = await imageService.patchImage(id, body);
        expect(result).toEqual({ ok: true });
      });
    });
    describe("Failure patterns", () => {
      test("400: Return error, when validation error occurs.", async () => {
        const mockResponse = {
          name: VALIDATION_ERROR_NAME,
          message: VALIDATION_ERROR_MESAGE_KEYWORD,
        };
        const mockFetch = jest.fn().mockResolvedValue({
          ok: false,
          json: async () => mockResponse,
        });
        global.fetch = mockFetch;
        const result = await imageService.patchImage(id, body);
        expect(result).toEqual({ ...mockResponse, ok: false });
      });
      test("500: Return error, when unknown error occurs.", async () => {
        const mockFetch = jest.fn().mockRejectedValue(new Error());
        global.fetch = mockFetch;
        const result = await imageService.patchImage(id, body);
        expect(result).toEqual({
          name: UNKNOWN_ERROR_NAME,
          message: UNKNOWN_ERROR_MESSAGE,
          ok: false,
        });
      });
    });
  });
  test("The deleteImage method delete data correctly", async () => {
    const imageId = "123";
    const mockFetch = jest.fn().mockResolvedValue({
      json: async () => {},
    });
    global.fetch = mockFetch;

    await imageService.deleteImage(imageId, "accessToken");

    expect(mockFetch).toHaveBeenCalledWith(
      `${imageService.baseUrl}${IMAGES_API_ENDPOINT}/${imageId}`,
      expect.objectContaining({
        method: "DELETE",
      }),
    );
  });
});
