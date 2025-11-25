import { type SupabaseClient } from '@supabase/supabase-js'

declare module 'next/server' {
  interface NextRequest {
    supabase: SupabaseClient
  }
}
