import { fetchFilteredData } from "../lib/words";

// Mendapatkan referensi elemen-elemen utama
const vocabList = document.getElementById("listVocabulary") as HTMLUListElement;

// Fungsi untuk menampilkan data berdasarkan huruf yang dipilih
export async function displayDataForLetter(letter: string) {
    // Menghapus konten yang ada
    vocabList.innerHTML = "";

    const data = await fetchFilteredData(letter);
    if (data && data.length > 0) {
        data.forEach((item, index) => {
            // Membuat card untuk kata
            const listItem = document.createElement("li");
            listItem.className = "flex justify-between my-2 p-4 items-center border border-gray-200 rounded-md cursor-pointer";
            listItem.setAttribute("data-modal-target", `vocabulary-modal-${index}`)
            listItem.setAttribute("data-modal-toggle", `vocabulary-modal-${index}`)
            listItem.innerHTML = `
                    <span>
                        <p class="text-gray-600">
                        <strong>${item.mooi_kata}</strong> = ${item.mooi_arti}
                        </p>
                    </span>
                    <span
                    class="text-sm text-gray-500 underline">
                    <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-gray-400" viewBox="0 0 24 24">
                        <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">
                            <path d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12m0-.5v-2a1.5 1.5 0 0 1 3 0V12m0-1.5a1.5 1.5 0 0 1 3 0V12" />
                            <path
                                d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7L7 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.867 1.867 0 0 1 2.28.28L8 13M5 3L4 2m0 5H3m11-4l1-1m0 4h1" />
                        </g>
                    </svg>
                    </span>
            `;
            vocabList.appendChild(listItem);
        });
    } else {
        // Menampilkan pesan ketika data kosong atau null
        const noDataDiv = document.createElement("div");
        noDataDiv.innerHTML = `
                <p class="font-inter py-4 text-gray-500">
                    Belum ada data yang tersedia.
                </p>                
            `;
        vocabList.appendChild(noDataDiv);
    }
}

displayDataForLetter("A");


