import { supabase } from "./supabase";

// Interface untuk mendefinisikan struktur item hasil.
export interface ResultItem {
  mooi_kata: string;
  mooi_lafal: string;
  mooi_arti: string;
  mooi_contoh: string;
  kelas_kata: string;
  indo_kata: string;
  indo_contoh: string;
}

/**
 * Mengambil data dari tabel kata_mooi dan kata_indonesia, kemudian menggabungkannya.
 * @returns {Promise<ResultItem[] | null>} Array dari objek ResultItem atau null jika terjadi kesalahan.
 */
export async function fetchData(): Promise<ResultItem[] | null> {
  // Mengambil data dari tabel kata_indonesia.
  const { data: indoData, error: indoError } = await supabase
    .from("kata_indonesia")
    .select("kata, contoh, kata_mooi_id (kata, lafal, arti, contoh, kelas_kata_id (nama))");

  if (indoData) {
    // Menggabungkan data dari kata_mooi dan kata_indonesia.
    const result: ResultItem[] = indoData.map(
      (indoItem: any, index: number) => {
        return {
          mooi_kata: indoItem.kata_mooi_id.kata,
          mooi_lafal: indoItem.kata_mooi_id.lafal,
          mooi_arti: indoItem.kata_mooi_id.arti,
          mooi_contoh: indoItem.kata_mooi_id.contoh,
          kelas_kata: indoItem.kata_mooi_id.kelas_kata_id.nama,
          indo_kata: indoItem.kata,
          indo_contoh: indoItem.contoh,
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
 * Mengambil data dari tabel kata_mooi berdasarkan filter, kemudian menggabungkannya dengan data dari tabel kata_indonesia.
 * @param {string} filter - String untuk memfilter kata dalam tabel kata_mooi.
 * @returns {Promise<ResultItem[] | null>} Array dari objek ResultItem atau null jika terjadi kesalahan.
 */
export async function fetchFilteredData(filter: string): Promise<ResultItem[] | null> {
  // Mengambil data dari tabel kata_indonesia.
  const { data: filterIndoData, error: indoError } = await supabase
    .from("kata_indonesia")
    .select("kata, contoh, kata_mooi_id!inner(kata, lafal, arti, contoh, kelas_kata_id (nama))")
    .ilike("kata_mooi_id.kata", `${filter}%`);


  if (filterIndoData) {
    return filterIndoData.map((indoItem: any) => {
      return {        
        mooi_kata: indoItem.kata_mooi_id.kata,
        mooi_lafal: indoItem.kata_mooi_id.lafal,
        mooi_arti: indoItem.kata_mooi_id.arti,
        mooi_contoh: indoItem.kata_mooi_id.contoh,
        kelas_kata: indoItem.kata_mooi_id.kelas_kata_id.nama,
        indo_kata: indoItem.kata,
        indo_contoh: indoItem.contoh,
      };
    });

  } else {
    console.error("Data is null");
    return null;
  }
}
