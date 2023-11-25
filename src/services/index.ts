import { UNKNOWN_ERROR_MESSAGE, UNKNOWN_ERROR_NAME } from "@/constants/exceptions";

export class CommonService {
  baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL;
  }

  createUrl(path: string, query?: RequestQuery): string {
    const url = new URL(path, this.baseUrl);
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  createConfig(method: RequestMethod, body?: RequestBody, accessToken?: string): RequestConfig {
    return {
      method,
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        authorization: accessToken ? `Bearer ${accessToken}` : undefined,
      },
      body: body ? JSON.stringify(body) : undefined,
    };
  }

  returnUnknownError(): {
    name: string;
    message: string;
    ok: false;
  } {
    return {
      name: UNKNOWN_ERROR_NAME,
      message: UNKNOWN_ERROR_MESSAGE,
      ok: false,
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
