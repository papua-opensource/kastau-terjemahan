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
  bagian: {
    urutan: number;
    jenis_bagian: string;
    teks: string;
  }[];
}

/**
 * Fungsi untuk memetakan hasil dari supabase ke format ResultItem.
 * @param item - Item yang akan dipetakan.
 * @returns ResultItem - Data yang sudah dipetakan.
 */
function mapToResultItem(item: any): ResultItem {
  return {
    kata: item.kata,
    lafal: item.lafal,
    arti: item.arti,
    contoh_asal: item.contoh_asal,
    contoh_terjemahan: item.contoh_terjemahan,
    kelas_kata: item.id_kelas_kata && item.id_kelas_kata.nama ? item.id_kelas_kata.nama : '',
  };
}

/**
 * Menjalankan query yang diberikan dan mengambil data.
 * @param query Query Supabase yang akan dijalankan.
 * @returns Data dari query atau null jika terjadi kesalahan.
 */
async function fetchData(query: any): Promise<any[] | null> {
  const { data, error } = await query;
  
  if (error) {
    console.error("Error fetching data:", error);
    return null;
  }
  return data || [];
}

/**
 * Mengambil data kosakata dari tabel 'kosakata' berdasarkan bahasa asal.
 * @param lang_id ID dari bahasa asal.
 * @returns Array dari objek ResultItem atau null jika terjadi kesalahan.
 */
export async function fetchVocabularyData(lang_id: number): Promise<ResultItem[] | null> {
  const data = await fetchData(
    supabase
      .from("kosakata")
      .select("kata, lafal, arti, contoh_asal, contoh_terjemahan, id_kelas_kata (nama)")
      .eq("id_bahasa", lang_id)
  );

  return data.map(mapToResultItem);
}

/**
 * Mengambil data kosakata dari tabel 'kosakata' berdasarkan filter kata.
 * @param filter String yang digunakan untuk memfilter kata di tabel kosakata.
 * @param lang_id ID dari bahasa asal.
 * @returns Array dari objek ResultItem atau null jika terjadi kesalahan.
 */
export async function fetchFilteredVocabulary(filter: string, lang_id: number): Promise<ResultItem[] | null> {
  const data = await fetchData(
    supabase
      .from("kosakata")
      .select("kata, lafal, arti, contoh_asal, contoh_terjemahan, id_kelas_kata")
      .eq("id_bahasa", lang_id)
      .ilike("kata", `${filter}%`)
  );

  return data.map(mapToResultItem);
}

/**
 * Mengambil data lirik dari tabel 'lagu' berdasarkan filter judul.
 * @param filter String yang digunakan untuk memfilter judul lagu di tabel lirik.
 * @returns Array dari objek ResultLyricItem atau null jika terjadi kesalahan.
 */
export async function fetchFilteredLyric(filter: string): Promise<ResultLyricItem[] | null> {
  const data = await fetchData(
    supabase
      .from("lagu")
      .select("id_lagu, judul, id_lagu (urutan, jenis_bagian, teks)")
      .ilike("judul", `${filter}%`)
      .order('judul', { ascending: true })
  );

  return data.map((item: any) => ({
    judul: item.judul,
    bagian: item.id_lagu.map((detail: any) => ({
      urutan: detail.urutan,
      jenis_bagian: detail.jenis_bagian,
      teks: detail.teks,
    }))
  }));
}
