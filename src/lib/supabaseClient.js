import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

// 환경변수가 없어도 앱이 통째로 죽지 않도록, 설정 여부를 export 해서 화면에서 안내한다.
export const isSupabaseConfigured = Boolean(url && key);

const supabase = isSupabaseConfigured ? createClient(url, key) : null;

export function getClient() {
  if (!supabase) {
    throw new Error(
      "Supabase 환경변수(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)가 설정되지 않았습니다."
    );
  }
  return supabase;
}
