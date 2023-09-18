/**
 * @jest-environment node
 */
import { GET } from "@/app/api/images/route";
import { prismaMock } from "@@/jest.setup";

/**
 * You can't just pass the type of the selected column to mockResolvedValue,
 * so you can work around it by using any. For more information, please see the link below.
 * https://github.com/prisma/prisma/discussions/7084#discussioncomment-793219
 */

describe("Image API", () => {
  const resImages = [{ id: 1, url: "https://placehold.jp/300x300.png", width: 300, height: 300 }];
  describe("GET", () => {
    test("When called with initial query, it shoule return images", async () => {
      prismaMock.image.findMany.mockResolvedValue(resImages as any);
      const req = {
        url: "http://localhost:3000/api/images?page=0&keyword=&activeTabId=timeLine&favariteImageIds=",
      } as Request;
      const result = await GET(req);
      const { images } = await result.json();
      expect(images).toEqual(resImages);
    });
    test("When called with page, keyword, and activeTagId set in the query, it should return images", async () => {
      prismaMock.image.findMany.mockResolvedValue(resImages as any);
      const req = {
        url: "http://localhost:3000/api/images?page=1&keyword=test&activeTabId=popular&favariteImageIds=",
      } as Request;
      const result = await GET(req);
      const { images } = await result.json();
      expect(images).toEqual(resImages);
    });
    test("When called with favariteImageIds set in the query, it should return images", async () => {
      prismaMock.image.findMany.mockResolvedValue(resImages as any);
      const req = {
        url: "http://localhost:3000/api/images?page=0&keyword=&activeTabId=favarite&favariteImageIds=1",
      } as Request;
      const result = await GET(req);
      const { images } = await result.json();
      expect(images).toEqual(resImages);
    });
    test("When an error occurs, return 500", async () => {
      prismaMock.image.findMany.mockRejectedValue(new Error());
      const req = {
        url: "http://localhost:3000/api/images?page=0&keyword=&activeTabId=timeLine&favariteImageIds=",
      } as Request;
      const result = await GET(req);
      const status = await result.status;
      expect(status).toBe(500);
    });
  });
});
