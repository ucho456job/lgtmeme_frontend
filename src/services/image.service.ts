import { ActiveTabId } from "@/app/ImageGallery";

const IMAGES_ENDPOINT = "/api/images";

type Method = "GET" | "POST";

type Cache = "no-store";

type Config = {
  method: Method;
  cache: Cache;
  headers: {
    "Content-Type": string;
  };
  body?: string;
};

export class ImageService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  }

  private createConfig(method: Method, cache: Cache, body?: Record<string, string>): Config {
    return {
      method,
      cache,
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    };
  }

  private async sendRequest<T>(
    path: string,
    config: Config,
    query?: Record<string, string | number | number[]>,
  ) {
    const url = new URL(path, this.baseUrl);
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    const res = await fetch(url.toString(), config);
    const data: T = await res.json();
    return data;
  }

  async fetchImages(queryOption: {
    page?: number;
    keyword?: string;
    activeTabId?: ActiveTabId;
    favariteImageIds?: number[];
  }): Promise<FetchImage[]> {
    const { page = 0, keyword = "", activeTabId = "timeLine", favariteImageIds = [] } = queryOption;
    const query = { page, keyword, activeTabId, favariteImageIds };
    const config = this.createConfig("GET", "no-store");
    const res = await this.sendRequest<{ images: FetchImage[] }>(IMAGES_ENDPOINT, config, query);
    return res.images;
  }

  async postImage(body: Record<string, string>) {
    const config = this.createConfig("POST", "no-store", body);
    await this.sendRequest(IMAGES_ENDPOINT, config);
  }
}
