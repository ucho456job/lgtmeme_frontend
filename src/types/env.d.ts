/// <reference types="next" />
/// <reference types="next/types/global" />

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_URL: string;
      DATABASE_URL: string;
      SUPABASE_URL: string;
      SUPABASE_ANON: string;
    }
  }
}

export {};
