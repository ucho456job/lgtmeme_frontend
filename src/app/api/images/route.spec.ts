/**
 * @jest-environment node
 */
import { GET, POST } from "@/app/api/images/route";
import { uploadStorage } from "@/utils/supabase";
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

describe("Image API", () => {
  const resImages = [{ id: "1", url: "https://placehold.jp/300x300.png" }];
  describe("GET", () => {
    test("Success: When called with initial query, it shoule return images", async () => {
      prismaMock.image.findMany.mockResolvedValue(resImages as any);
      const req = {
        url: "http://localhost:3002/api/images?page=0&keyword=&activeTabId=timeLine&favariteImageIds=",
      } as Request;
      const result = await GET(req);
      const { images } = await result.json();
      expect(images).toEqual(resImages);
    });
    test("Success: When called with page, keyword, and activeTagId set in the query, it should return images", async () => {
      prismaMock.image.findMany.mockResolvedValue(resImages as any);
      const req = {
        url: "http://localhost:3002/api/images?page=1&keyword=test&activeTabId=popular&favariteImageIds=",
      } as Request;
      const result = await GET(req);
      const { images } = await result.json();
      expect(images).toEqual(resImages);
    });
    test("Success: When called with favariteImageIds set in the query, it should return images", async () => {
      prismaMock.image.findMany.mockResolvedValue(resImages as any);
      const req = {
        url: "http://localhost:3002/api/images?page=0&keyword=&activeTabId=favarite&favariteImageIds=1",
      } as Request;
      const result = await GET(req);
      const { images } = await result.json();
      expect(images).toEqual(resImages);
    });
    test("Failure: When an error occurs, return 500", async () => {
      prismaMock.image.findMany.mockRejectedValue(new Error("Internal server error"));
      const req = {
        url: "http://localhost:3002/api/images?page=0&keyword=&activeTabId=timeLine&favariteImageIds=",
      } as Request;
      const result = await GET(req);
      const { errorMessage } = await result.json();
      const status = await result.status;
      expect(errorMessage).toBe("Internal server error");
      expect(status).toBe(500);
    });
  });
  describe("POST", () => {
    const req = {
      json: async () => {
        return { image: "data:image/webp;base64,iVBORw0KGgoA" };
      },
    } as Request;
    test("Success: Image upload succeeds and returns 200 status", async () => {
      jest.spyOn(uploadStorage, "upload").mockImplementation(async () => {
        return { data: { path: imageId }, error: null };
      });
      prismaMock.image.create.mockImplementation();
      const result = await POST(req);
      const status = await result.status;
      expect(status).toBe(200);
    });
    test("Failure: Image upload failed and returns 500 status", async () => {
      jest.spyOn(uploadStorage, "upload").mockImplementation(async () => {
        return { data: null, error: "happened error" as any };
      });
      const result = await POST(req);
      const { errorMessage } = await result.json();
      const status = await result.status;
      expect(errorMessage).toBe("Image upload failed");
      expect(status).toBe(500);
    });
    test("Failure: Image create failed and returns 500 status", async () => {
      jest.spyOn(uploadStorage, "upload").mockImplementation(async () => {
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
