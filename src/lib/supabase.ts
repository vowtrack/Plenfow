// ============================================================
// src/lib/supabase.ts
// Koneksi ke Supabase. Aktifkan setelah install @supabase/supabase-js
//
// Cara setup:
// 1. npm install @supabase/supabase-js
// 2. Buat file .env.local di root project
// 3. Isi dengan VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY
//    (ambil dari dashboard Supabase → Project Settings → API)
// 4. Uncomment kode di bawah
// ============================================================

// import { createClient } from "@supabase/supabase-js";
//
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
//
// export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const supabase = null; // Placeholder sampai Supabase disetup
