import { supabase } from "./supabase";

export interface ResultItem {
  mooi_kata: string;
  mooi_lafal: string;
  mooi_arti: string;
  mooi_contoh: string;
  kelas_kata: string;
  indo_kata: string;
  indo_contoh: string;
}

export async function fetchData(): Promise<ResultItem[] | null> {
  const { data: mooiData, error: mooiError } = await supabase
    .from("kata_mooi")
    .select("kata, lafal, arti, contoh, kelas_kata_id (id)");

  const { data: indoData, error: indoError } = await supabase
    .from("kata_indonesia")
    .select("kata, contoh, kata_mooi_id (kata, lafal, arti, contoh, kelas_kata_id (singkatan))");

  if (mooiData && indoData) {
    // Menggabungkan data dari kata_mooi dan kata_indonesia
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
