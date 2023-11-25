import { UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR_NAME } from "@/constants/exceptions";
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
  test("Return url, when use createUrl.", () => {
    const result = commonService.createUrl("/test", {
      string: "string",
      number: 0,
      array: ["arr1", "arr2"],
      boolean: true,
      null: null,
    });
    expect(result).toBe(
      process.env.NEXT_PUBLIC_APP_URL +
        "/test?string=string&number=0&array=arr1%2Carr2&boolean=true&null=null",
    );
  });
  test("Return config for fetch, when use createConfig.", () => {
    const result = commonService.createConfig("GET", { key: "value" }, "accessToken");
    expect(result).toEqual({
      method: "GET",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer accessToken",
      },
      body: '{"key":"value"}',
    });
  });
  test("Return unknown error, when use returnUnknownError.", () => {
    const result = commonService.returnUnknownError();
    expect(result).toEqual({
      name: UNKNOWN_ERROR_NAME,
      message: UNKNOWN_ERROR_MESSAGE,
      ok: false,
    });
  });
});
