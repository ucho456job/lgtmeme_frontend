import { createClient } from "@supabase/supabase-js";

const localSupabaseUrl = "http://localhost";
const localSupabaseAnon =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE";
const client = createClient(
  process.env.SUPABASE_URL || localSupabaseUrl,
  process.env.SUPABASE_ANON || localSupabaseAnon,
);

export const uploadStorage = client.storage.from("images");
