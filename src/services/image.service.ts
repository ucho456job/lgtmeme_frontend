import { GET_IMAGES_ENDPOINT } from "@/constants/endpoints";

type Method = "GET";

type Cache = "no-store";

type Config = {
  method: Method;
  cache: Cache;
  headers: {
    "Content-Type": string;
  };
};

type ImageType = {
  id: number;
  categoryId: number;
  title: string;
  url: string;
  usedCount: number;
  reported: boolean;
  createdAt: Date;
};

export class ImageService {
  private baseUrl: string;

  constructor() {
    const protocol = process.env.VERCEL_ENV === "development" ? "http://" : "https://";
    this.baseUrl = protocol + process.env.VERCEL_URL;
  }

  private createConfig(method: Method, cache: Cache): Config {
    return {
      method,
      cache,
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  private async sendRequest<T>(path: string, config: Config) {
    const res = await fetch(path, config);
    const data: T = await res.json();
    return data;
  }

  async fetchImages(): Promise<ImageType[]> {
    const config = this.createConfig("GET", "no-store");
    const res = await this.sendRequest<{ images: ImageType[] }>(
      this.baseUrl + GET_IMAGES_ENDPOINT,
      config,
    );
    return res.images;
  }
}
