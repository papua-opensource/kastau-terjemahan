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
  // Mengambil data dari tabel kata_mooi.
  const { data: mooiData, error: mooiError } = await supabase
    .from("kata_mooi")
    .select("kata, lafal, arti, contoh, kelas_kata_id (id)");

  // Mengambil data dari tabel kata_indonesia.
  const { data: indoData, error: indoError } = await supabase
    .from("kata_indonesia")
    .select("kata, contoh, kata_mooi_id (kata, lafal, arti, contoh, kelas_kata_id (singkatan))");

  if (mooiData && indoData) {
    // Menggabungkan data dari kata_mooi dan kata_indonesia.
    const result: ResultItem[] = indoData.map(
      (indoItem: any, index: number) => {
        return {
          mooi_kata: indoItem.kata_mooi_id.kata,
          mooi_lafal: indoItem.kata_mooi_id.lafal,
          mooi_arti: indoItem.kata_mooi_id.arti,
          mooi_contoh: indoItem.kata_mooi_id.contoh,
          kelas_kata: indoItem.kata_mooi_id.kelas_kata_id.singkatan,
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
  const { data: indoData, error: indoError } = await supabase
    .from("kata_indonesia")
    .select("kata, contoh, kata_mooi_id (kata, lafal, arti, contoh, kelas_kata_id (singkatan))");

  // Mengambil data dari tabel kata_mooi berdasarkan filter.
  const { data: filterMooiData, error: filterMooiError } = await supabase
    .from("kata_mooi")
    .select("kata, lafal, arti, contoh, kelas_kata_id (id)")
    .ilike("kata", `${filter}%`);

  if (filterMooiData && indoData) {
    // Menggabungkan data dari kata_mooi yang telah difilter dengan data dari kata_indonesia.
    const filteredResult: ResultItem[] = filterMooiData.flatMap((mooiItem: any) => {
      const relatedIndoItems = indoData.filter((indoItem: any) =>
        indoItem.kata_mooi_id && indoItem.kata_mooi_id.kata === mooiItem.kata
      );

      return relatedIndoItems.map((indoItem: any) => {
        return {
          mooi_kata: mooiItem.kata,
          mooi_lafal: mooiItem.lafal,
          mooi_arti: mooiItem.arti,
          mooi_contoh: mooiItem.contoh,
          kelas_kata: indoItem.kata_mooi_id.kelas_kata_id.singkatan,
          indo_kata: indoItem.kata,
          indo_contoh: indoItem.contoh,
        };
      });
    });
    return filteredResult;
  } else {
    console.error("Data is null");
    return null;
  }
}