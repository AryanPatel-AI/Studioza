/**
 * Supabase Server Client
 * Instantiates an SSR-compatible client reading and writing Next.js cookies in Server Components and Route Handlers.
 */
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/** Creates a Supabase server client wired to Next.js cookie storage */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Ignored if called from a pure Server Component without response cookie writing permissions
          }
        },
      },
    }
  );
}
