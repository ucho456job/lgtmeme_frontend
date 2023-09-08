/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VERCEL_ENV: "production" | "preview" | "development";
      VERCEL_URL: string;
      DATABASE_URL: string;
    }
  }
}

export {};
