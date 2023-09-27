type RequestMethod = "GET" | "POST" | "PATCH";

type RequestConfig = {
  method: RequestMethod;
  cache: "no-store";
  headers: {
    "Content-Type": string;
  };
  body?: string;
};

type RequestBody = Record<string, string | number>;

type RequestQuery = Record<string, string | number | string[]>;
