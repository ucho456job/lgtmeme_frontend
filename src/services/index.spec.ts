import { CommonService } from "@/services";

jest.mock("node-fetch", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

describe("CommonService", () => {
  let commonService: CommonService;
  beforeAll(() => {
    commonService = new CommonService();
  });
  test("The createConfig method returns the correct configuration object", () => {
    const config: RequestConfig = commonService.createConfig(
      "GET",
      { key: "value" },
      "accessToken",
    );
    expect(config).toEqual({
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer accessToken",
      },
      body: '{"key":"value"}',
    });
  });
  it("The sendRequest method retrieves the data correctly", async () => {
    const mockResponseData = { message: "Hello world" };
    const mockFetch = jest.fn().mockResolvedValue({
      json: jest.fn(async () => {
        return mockResponseData;
      }),
    });
    global.fetch = mockFetch;
    const path = "/example";
    const config: RequestConfig = commonService.createConfig("GET");
    const query = { param1: "value1", param2: "value2" };
    const result = await commonService.sendRequest<{ message: string }>(path, config, query);
    expect(mockFetch).toHaveBeenCalledWith(
      `${commonService.baseUrl}${path}?param1=value1&param2=value2`,
      config,
    );
    expect(result).toEqual(mockResponseData);
  });
});
