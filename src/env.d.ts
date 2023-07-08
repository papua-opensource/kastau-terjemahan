/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly VITE_CUSTOM_ENV_VARIABLE: string;
  readonly PUBLIC_SUPABASE_URL: string;
  readonly PUBLIC_SUPABASE_ANON_KEY: string;
  readonly PUBLIC_VERCEL_ENV: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
