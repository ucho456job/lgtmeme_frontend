type RequestMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestBody = Record<string, string | number>;

type RequestQuery = Record<string, string | number | string[] | boolean | null>;

type RequestConfig = {
  method: RequestMethod;
  cache: "no-store";
  headers: {
    "Content-Type": string;
    authorization?: string;
  };
  body?: string;
};

type ErrorResponseBody = {
  name: string;
  message: string;
};

type ErrorResponse = {
  name: string;
  message: string;
  ok: false;
};
