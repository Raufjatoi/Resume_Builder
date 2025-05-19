/// <reference types="vite/client" />


interface ImportMetaEnv {
  readonly VITE_GROQ_API: string;
  // add more env vars if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  // add more if needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}