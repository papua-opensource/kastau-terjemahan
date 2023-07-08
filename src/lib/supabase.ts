// src/supabase.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const env = import.meta.env.PUBLIC_VERCEL_ENV;
let supabaseUrl: string | undefined;
let supabaseAnonKey: string | undefined;

if (env === "development") {
  supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
} else {
  supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
  supabaseAnonKey = process.env.PUBLIC_SUPABASE_ANON_KEY;
}

export const supabase = createClient<Database>(supabaseUrl!, supabaseAnonKey!);
