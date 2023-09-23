import { supabase } from "./supabase";

// Interface untuk mendefinisikan struktur item hasil.
export interface ResultItem {
  kata: string;
  lafal: string;
  arti: string;
  contoh_asal: string;
  contoh_terjemahan: string;
  kelas_kata: string;
}


/**
 * Mengambil data dari tabel kosakata
 * @param {number} lang_id - Number untuk memfilter bahasa asal dalam tabel bahasa.
 * @returns {Promise<ResultItem[] | null>} Array dari objek ResultItem atau null jika terjadi kesalahan.
 */
export async function fetchData(lang_id: number): Promise<ResultItem[] | null> {
  // Mengambil data dari tabel kosakata.
  const { data: itemData, error: itemError } = await supabase
    .from("kosakata")
    .select("kata, lafal, arti, contoh_asal, contoh_terjemahan, id_bahasa, id_kelas_kata")
    .eq("id_bahasa", lang_id)

  if (itemData) {
    // Menggabungkan data dari kata_mooi dan kata_indonesia.
    const result: ResultItem[] = itemData.map(
      (item: any) => {
        return {
          kata: item.kata,
          lafal: item.lafal,
          arti: item.arti,
          contoh_asal: item.contoh_asal,
          contoh_terjemahan: item.contoh_terjemahan,
          kelas_kata: item.id_kelas_kata,
        };

      }
    );

    return result;
  } else {
    console.error("Data is null");
    return null;
  }
}


/**
 * Mengambil data dari tabel kosakata berdasarkan filter
 * @param {string} filter - String untuk memfilter kata dalam tabel kosakata.
 * @param {number} lang_id - Number untuk memfilter bahasa asal dalam tabel bahasa.
 * @returns {Promise<ResultItem[] | null>} Array dari objek ResultItem atau null jika terjadi kesalahan.
 */
export async function fetchFilteredData(filter: string, lang_id: number): Promise<ResultItem[] | null> {
  // Mengambil data dari tabel kosakata.
  const { data: itemData, error: itemError } = await supabase
    .from("kosakata")
    .select("kata, lafal, arti, contoh_asal, contoh_terjemahan, id_bahasa, id_kelas_kata")
    .eq("id_bahasa", lang_id)
    .ilike("kata", `${filter}%`);

  if (itemData) {
    return itemData.map((item: any) => {
      return {
        kata: item.kata,
        lafal: item.lafal,
        arti: item.arti,
        contoh_asal: item.contoh_asal,
        contoh_terjemahan: item.contoh_terjemahan,
        kelas_kata: item.id_kelas_kata,
      };
    });

  } else {
    return null;
  }
}
