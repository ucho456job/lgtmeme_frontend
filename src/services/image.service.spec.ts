import { IMAGES_API_ENDPOINT } from "@/constants/endpoints";
import {
  UNKNOWN_ERROR_MESSAGE,
  UNKNOWN_ERROR_NAME,
  VALIDATION_ERROR_NAME,
  VALIDATION_ERROR_STATUS,
} from "@/constants/exceptions";
import { ACTIVE_TAB_ID_TIME_LINE, VALIDATION_ERROR_MESAGE_KEYWORD } from "@/constants/image";
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
    let getImagesQuery: GetImagesQuery;
    beforeEach(() => {
      resImages = [
        { id: generateStaticUUID(1), url: sampleImageUrl, reported: false },
        { id: generateStaticUUID(2), url: sampleImageUrl, reported: false },
      ];
      getImagesQuery = {
        page: 0,
        keyword: "keyword",
        activeTabId: ACTIVE_TAB_ID_TIME_LINE,
        favoriteImageIds: [],
      };
    });
    describe("Success patterns", () => {
      test("200: Return images, when basic query.", async () => {
        const mockFetch = jest.fn().mockResolvedValue({
          ok: true,
          json: async () => ({ images: resImages }),
        });
        global.fetch = mockFetch;
        const result = await imageService.getImages(getImagesQuery);
        expect(result).toEqual({ images: resImages, ok: true });
      });
      test("200: Return images, when set isAuthCheck in query.", async () => {
        getImagesQuery.isAuthCheck = true;
        resImages[0].reported = true;
        resImages[1].reported = true;
        const mockFetch = jest.fn().mockResolvedValue({
          ok: true,
          json: async () => ({ images: resImages }),
        });
        global.fetch = mockFetch;
        const result = await imageService.getImages(getImagesQuery);
        expect(result).toEqual({ images: resImages, ok: true });
      });
    });
    describe("Failure patterns", () => {
      test("400: Return error, when validation error.", async () => {
        const mockFetch = jest.fn().mockResolvedValue({
          ok: false,
          status: VALIDATION_ERROR_STATUS,
          json: async () => ({
            name: VALIDATION_ERROR_NAME,
            message: VALIDATION_ERROR_MESAGE_KEYWORD,
          }),
        });
        global.fetch = mockFetch;
        getImagesQuery.keyword = "a".repeat(51);
        const result = await imageService.getImages(getImagesQuery);
        expect(result).toEqual({
          name: VALIDATION_ERROR_NAME,
          message: VALIDATION_ERROR_MESAGE_KEYWORD,
          ok: false,
        });
      });
      test("500: Return error, when unknown error.", async () => {
        const mockFetch = jest.fn().mockRejectedValue(new Error());
        global.fetch = mockFetch;
        const result = await imageService.getImages(getImagesQuery);
        expect(result).toEqual({
          name: UNKNOWN_ERROR_NAME,
          message: UNKNOWN_ERROR_MESSAGE,
          ok: false,
        });
      });
    });
  });
  test("The postImage method posts data correctly", async () => {
    const mockResponse = { imageUrl: "uploaded-image.jpg" };
    const mockFetch = jest.fn().mockResolvedValue({
      json: async () => mockResponse,
    });
    global.fetch = mockFetch;

    const body: PostImageReqBody = { image: "base64encodedimage", keyword: "keyword" };
    const imageUrl = await imageService.postImage(body);

    expect(mockFetch).toHaveBeenCalledWith(
      `${imageService.baseUrl}${IMAGES_API_ENDPOINT}`,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify(body),
      }),
    );
    expect(imageUrl).toEqual(mockResponse.imageUrl);
  });

  test("The patchImage method updates data correctly", async () => {
    const imageId = "123";
    const mockFetch = jest.fn().mockResolvedValue({
      json: async () => {},
    });
    global.fetch = mockFetch;

    await imageService.patchImage(imageId, { requestType: "copy" });

    expect(mockFetch).toHaveBeenCalledWith(
      `${imageService.baseUrl}${IMAGES_API_ENDPOINT}/${imageId}`,
      expect.objectContaining({
        method: "PATCH",
      }),
    );
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
