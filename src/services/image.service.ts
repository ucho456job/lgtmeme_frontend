import { ActiveTabId } from "@/app/ImageGallery";

const IMAGES_ENDPOINT = "/api/images";

type Method = "GET" | "POST" | "PATCH";

type Config = {
  method: Method;
  cache: "no-store";
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

  private createConfig(method: Method, body?: Record<string, string | number>): Config {
    return {
      method,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    };
  }

  private async sendRequest<T>(
    path: string,
    config: Config,
    query?: Record<string, string | number | string[]>,
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
    favariteImageIds?: string[];
  }): Promise<FetchImage[]> {
    const { page = 0, keyword = "", activeTabId = "timeLine", favariteImageIds = [] } = queryOption;
    const query = { page, keyword, activeTabId, favariteImageIds };
    const config = this.createConfig("GET");
    const res = await this.sendRequest<{ images: FetchImage[] }>(IMAGES_ENDPOINT, config, query);
    return res.images;
  }

  async postImage(body: Record<string, string>) {
    const config = this.createConfig("POST", body);
    await this.sendRequest(IMAGES_ENDPOINT, config);
  }

  async patchImage(id: string, body?: Record<string, number>) {
    const config = this.createConfig("PATCH", body);
    await this.sendRequest(IMAGES_ENDPOINT + "/" + id, config);
  }
}
