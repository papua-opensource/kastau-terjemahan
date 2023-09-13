import { fetchFilteredData, ResultItem } from "../lib/words";
import { fetchedData } from '../lib/store.js';

// Fungsi untuk menampilkan data berdasarkan huruf yang dipilih
export async function displayDataForLetter(letter: string) {
    const data = await fetchFilteredData(letter);
    if (data && data.length > 0) {
        fetchedData.set(data);
    } else {
        // Menampilkan pesan ketika data kosong atau null
        console.info("Belum ada data yang tersedia.")
        return []
    }
}

displayDataForLetter("B");



export function getDataFromStore() {
    let data: ResultItem[] = [];
    fetchedData.subscribe((value) => {
        data = [...value];
    })();
    return data;
}