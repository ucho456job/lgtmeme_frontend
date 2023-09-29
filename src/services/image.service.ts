import { IMAGES_API_ENDPOINT } from "@/constants/endpoints";
import { CommonService } from "@/services";

export class ImageService extends CommonService {
  async fetchImages(arg: GetImageArg) {
    const query: GetImageQuery = {
      page: arg.page || 0,
      keyword: arg.keyword || "",
      activeTabId: arg.activeTabId || "timeLine",
      favoriteImageIds: arg.favoriteImageIds || [],
      confirm: arg.confirm || "false",
    };
    const config = this.createConfig("GET");
    const res = await this.sendRequest<{ images: Image[] }>(IMAGES_API_ENDPOINT, config, query);
    return res.images;
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
