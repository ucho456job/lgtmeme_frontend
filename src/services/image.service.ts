import { GET_IMAGES_ENDPOINT } from "@/constants/endpoints";

type Method = 'GET'

type Cache = 'no-store'

type Config = {
  method: Method
  cache: Cache;
  headers: {
    "Content-Type": string;
  }
}

type ImageType = {
  id: string;
  title: string;
  categoryId: string;
  tags: string[];
  path: string;
  createdAt: Date;
}

export class ImageService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.VERCEL_URL
    console.log("console.log this.baseUrl", this.baseUrl)
  }

  private createConfig(method: Method, cache: Cache): Config {
    return {
      method,
      cache,
      headers: {
        "Content-Type": "application/json"
      }
    }
  }

  private async sendRequest<T>(path: string, config: Config) {
    const res = await fetch(path, config)
    const data: T = await res.json();
    return data
  }

  async fetchImages(): Promise<ImageType[]> {
    const config = this.createConfig('GET', 'no-store');
    const res = await this.sendRequest<{ images: ImageType[] }>(this.baseUrl + GET_IMAGES_ENDPOINT, config)
    return res.images
  }
}
