/**
 * Supabase Admin Client (Backend)
 * Uses the service role key to perform elevated server-side operations (bypassing RLS when necessary).
 */
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.warn("⚠️ Warning: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing in backend .env");
}

// Elevated administrative client with session persistence disabled for backend runners
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});
