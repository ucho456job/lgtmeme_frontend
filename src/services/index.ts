export class CommonService {
  baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  }

  createConfig(method: RequestMethod, body?: RequestBody): RequestConfig {
    return {
      method,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : undefined,
    };
  }

  async sendRequest<T>(path: string, config: RequestConfig, query?: RequestQuery) {
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
}
