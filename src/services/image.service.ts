import { IMAGES_API_ENDPOINT } from "@/constants/endpoints";
import { CommonService } from "@/services";

export class ImageService extends CommonService {
  async getImages(getImagesQuery: GetImagesQuery): Promise<GetImagesResponse> {
    try {
      const url = this.createUrl(IMAGES_API_ENDPOINT, getImagesQuery);
      const config = this.createConfig("GET");
      const res = await fetch(url, config);
      if (!res.ok) {
        const error: ErrorResponseBody = await res.json();
        return { name: error.name, message: error.message, ok: false };
      }
      const body: GetImagesResponseBody = await res.json();
      return { images: body.images, ok: true };
    } catch (error) {
      return this.returnUnknownError();
    }
  }

  async postImage(body: PostImageReqBody) {
    const config = this.createConfig("POST", body);
    const res = await this.sendRequest<{ imageUrl: string }>(IMAGES_API_ENDPOINT, config);
    return res.imageUrl;
  }

  async patchImage(id: string, body: PatchImageReqBody) {
    const config = this.createConfig("PATCH", body);
    await this.sendRequest(IMAGES_API_ENDPOINT + "/" + id, config);
  }

  async deleteImage(id: string, accessToken: string) {
    const config = this.createConfig("DELETE", undefined, accessToken);
    await this.sendRequest(IMAGES_API_ENDPOINT + "/" + id, config);
  }
}
