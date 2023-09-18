import { ActiveTabId } from "@/components/organisms/ImageGallery";
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

export class ImageService {
  private baseUrl: string;

  constructor() {
    const protocol = process.env.NEXT_PUBLIC_VERCEL_ENV === "development" ? "http://" : "https://";
    this.baseUrl = protocol + process.env.NEXT_PUBLIC_VERCEL_URL;
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
    const res = await this.sendRequest<{ images: FetchImage[] }>(
      GET_IMAGES_ENDPOINT,
      config,
      query,
    );
    return res.images;
  }
}
