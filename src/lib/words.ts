import { supabase } from "./supabase";

export interface ResultItem {
  kata: string;
  lafal: string;
  arti: string;
  contoh_asal: string;
  contoh_terjemahan: string;
  kelas_kata: string;
}


export interface ResultLyricItem {
  judul: string;
  lirik_asal: string;
  lirik_terjemahan: string;
}

/**
 * Mengambil data dari tabel kosakata berdasarkan bahasa asal.
 * @param {number} lang_id - ID bahasa asal yang akan diambil.
 * @returns {Promise<ResultItem[] | null>} Array dari objek ResultItem atau null jika terjadi kesalahan.
 */
export async function fetchVocabularyData(lang_id: number): Promise<ResultItem[] | null> {
  const { data, error } = await supabase
    .from("kosakata")
    .select("kata, lafal, arti, contoh_asal, contoh_terjemahan, id_kelas_kata (nama)")
    .eq("id_bahasa", lang_id);

  if (data) {
    return data.map((item: any) => ({
      kata: item.kata,
      lafal: item.lafal,
      arti: item.arti,
      contoh_asal: item.contoh_asal,
      contoh_terjemahan: item.contoh_terjemahan,
      kelas_kata: item.id_kelas_kata.nama,
    }));
  } else {
    console.error("Data is null");
    return null;
  }
}

/**
 * Mengambil data dari tabel kosakata berdasarkan filter kata.
 * @param {string} filter - String untuk memfilter kata dalam tabel kosakata.
 * @param {number} lang_id - ID bahasa asal yang akan diambil.
 * @returns {Promise<ResultItem[] | null>} Array dari objek ResultItem atau null jika terjadi kesalahan.
 */
export async function fetchFilteredVocabulary(filter: string, lang_id: number): Promise<ResultItem[] | null> {
  const { data, error } = await supabase
    .from("kosakata")
    .select("kata, lafal, arti, contoh_asal, contoh_terjemahan, id_kelas_kata")
    .eq("id_bahasa", lang_id)
    .ilike("kata", `${filter}%`);

  if (data) {
    return data.map((item: any) => ({
      kata: item.kata,
      lafal: item.lafal,
      arti: item.arti,
      contoh_asal: item.contoh_asal,
      contoh_terjemahan: item.contoh_terjemahan,
      kelas_kata: item.id_kelas_kata,
    }));
  } else {
    return null;
  }
}

/**
 * Mengambil data dari tabel lirik lagu.
 * @param {string} filter - String untuk memfilter kata dalam tabel lirik_lagu.
 * @returns {Promise<ResultLyricItem[] | null>} Array dari objek ResultLyricItem atau null jika terjadi kesalahan.
 */
export async function fetchFilteredLyric(filter: string): Promise<ResultLyricItem[] | null> {
  const { data, error } = await supabase
    .from("lirik_lagu")
    .select("judul, lirik_asal, lirik_terjemahan")
    .ilike("judul", `${filter}%`)
    .order('judul', { ascending: true });

  if (data) {
    return data.map((item: any) => ({
      judul: item.judul,
      lirik_asal: item.lirik_asal,
      lirik_terjemahan: item.lirik_terjemahan,
    }));
  } else {
    return null;
  }
}