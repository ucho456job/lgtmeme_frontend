// ImageServiceのインポートが必要です
import { IMAGES_API_ENDPOINT } from "@/constants/endpoints";
import { ImageService } from "@/services/image.service";

describe("ImageService", () => {
  let imageService: ImageService;
  beforeAll(() => {
    imageService = new ImageService();
  });
  test("The fetchImages method retrieves data correctly", async () => {
    const mockImages = [
      { id: "1", url: "image1.jpg" },
      { id: "2", url: "image2.jpg" },
    ];
    const mockFetch = jest.fn().mockResolvedValue({
      json: async () => ({ images: mockImages }),
    });
    global.fetch = mockFetch;

    const arg: GetImageArg = {
      page: 1,
      keyword: "test",
      activeTabId: "timeLine",
      favoriteImageIds: ["1", "2"],
    };
    const images = await imageService.fetchImages(arg);

    expect(mockFetch).toHaveBeenCalledWith(
      `${imageService.baseUrl}${IMAGES_API_ENDPOINT}?page=1&keyword=test&activeTabId=timeLine&favoriteImageIds=1%2C2`,
      expect.objectContaining({
        method: "GET",
      }),
    );
    expect(images).toEqual(mockImages);
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

    await imageService.patchImage(imageId);

    expect(mockFetch).toHaveBeenCalledWith(
      `${imageService.baseUrl}${IMAGES_API_ENDPOINT}/${imageId}`,
      expect.objectContaining({
        method: "PATCH",
      }),
    );
  });
});
