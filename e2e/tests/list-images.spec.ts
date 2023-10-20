import { BASE_URL } from "../constants";
import { driver } from "../jest.setup";

describe("List images", () => {
  test("should open home page", async () => {
    await driver.get(BASE_URL);
    const title = await driver.getTitle();
    expect(title).toBe("LGTMeme");
  });
});
