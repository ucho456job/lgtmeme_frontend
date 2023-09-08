/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      VERCEL_URL: string;
      DATABASE_URL: string;
    }
  }
}

export {};
