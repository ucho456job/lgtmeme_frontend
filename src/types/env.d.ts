/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_VERCEL_ENV: "production" | "preview" | "development";
      NEXT_PUBLIC_VERCEL_URL: string;
      DATABASE_URL: string;
    }
  }
}

export {};
