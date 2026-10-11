/**
 * Supabase Browser Client
 * Instantiates an SSR-compatible client using browser storage for authenticated client-side requests.
 */
import { createBrowserClient } from "@supabase/ssr";

/** Creates a Supabase client for client-side components */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
  );
}
