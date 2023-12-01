import { IMAGES_API_ENDPOINT } from "@/constants/endpoints";
import { CommonService } from "@/services";

export class ImageService extends CommonService {
  async getImages(query: GetImagesQuery): Promise<GetImagesResponse> {
    try {
      const url = this.createUrl(IMAGES_API_ENDPOINT, query);
      const config = this.createConfig("GET");
      const res = await fetch(url, config);
      if (!res.ok) {
        const error: ErrorResponseBody = await res.json();
        return { ...error, ok: false };
      }
      const body: GetImagesResponseBody = await res.json();
      return { ...body, ok: true };
    } catch {
      return this.returnUnknownError();
    }
  }

  async postImage(body: PostImageRequestBody): Promise<PostImageResponse> {
    try {
      const url = this.createUrl(IMAGES_API_ENDPOINT);
      const config = this.createConfig("POST", body);
      const res = await fetch(url, config);
      if (!res.ok) {
        const error: ErrorResponseBody = await res.json();
        return { ...error, ok: false };
      }
      const resBody: PostImageResponseBody = await res.json();
      return { ...resBody, ok: true };
    } catch {
      return this.returnUnknownError();
    }
  }

  async patchImage(id: string, body: PatchImageRequestBody): Promise<PatchImageResponse> {
    try {
      const url = this.createUrl(IMAGES_API_ENDPOINT + "/" + id);
      const config = this.createConfig("PATCH", body);
      const res = await fetch(url, config);
      if (!res.ok) {
        const error: ErrorResponseBody = await res.json();
        return { ...error, ok: false };
      }
      return { ok: true };
    } catch {
      return this.returnUnknownError();
    }
  }

  async deleteImage(id: string, accessToken: string) {
    const config = this.createConfig("DELETE", undefined, accessToken);
    await this.sendRequest(IMAGES_API_ENDPOINT + "/" + id, config);
  }
}
