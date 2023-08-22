import { fetchFilteredData } from "./words";

// Mendapatkan referensi elemen-elemen utama
const wordContainer = document.getElementById("word-results") as HTMLElement;
const exampleUsageContainer = document.getElementById("example-usage-results") as HTMLElement;
const alphabetList = document.getElementById("alphabetList") as HTMLElement;
const titleAlphabet = document.getElementById("titleAlphabet") as HTMLElement;

// Fungsi untuk menampilkan data berdasarkan huruf yang dipilih
async function displayDataForLetter(letter: string) {
    // Menghapus konten yang ada
    wordContainer.innerHTML = '';
    exampleUsageContainer.innerHTML = '';

    // Menambahkan header ke setiap kontainer
    wordContainer.innerHTML = '<h2 class="font-sofia text-xl text-gray-900">Kata</h2>';
    exampleUsageContainer.innerHTML = '<h2 class="font-sofia text-xl text-gray-900">Contoh penggunaan</h2>';

    // Mengambil data berdasarkan huruf yang diberikan
    const data = await fetchFilteredData(letter);
    if (data && data.length > 0) {
        data.forEach((item, index) => {
            // Membuat card untuk kata
            const wordCard = document.createElement("div");
            wordCard.className = "relative my-2 flex h-16 items-center bg-gray-100";
            wordCard.innerHTML = `
                <p class="font-inter px-4">
                    <u>${item.mooi_kata}</u> [${item.mooi_lafal}] n: <em>${item.mooi_arti}</em>
                </p>
                <div class="font-sofia absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs text-gray-600 dark:border-gray-900 lg:hidden">${index + 1}</div>
            `;
            wordContainer.appendChild(wordCard);

            // Membuat card untuk contoh penggunaan
            const exampleCard = document.createElement("div");
            exampleCard.className = "relative my-2 flex h-16 items-center bg-gray-100";
            exampleCard.innerHTML = `
                <p class="font-inter px-4 py-2">
                    ${item.mooi_contoh} → ${item.indo_contoh} 
                </p>
                <div class="font-sofia absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-gray-100 text-xs text-gray-600 dark:border-gray-900 lg:hidden">${index + 1}</div>
            `;
            exampleUsageContainer.appendChild(exampleCard);
        });
    } else {
        // Menampilkan pesan ketika data kosong atau null
        const noDataDiv = document.createElement("div");
        noDataDiv.innerHTML = `
                <p class="font-inter py-4 text-gray-500">
                    Tidak ada data yang tersedia.
                </p>                
            `;
        wordContainer.appendChild(noDataDiv);
    }
}

// Menampilkan data untuk huruf "A" secara default saat halaman dimuat
displayDataForLetter('A');

// Melakukan iterasi melalui nilai ASCII untuk huruf A-Z
for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const li = document.createElement("li");
    li.className =
        "text-center cursor-pointer font-sofia px-3 py-2 text-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:rounded";
    li.textContent = letter;

    // Menambahkan event listener ke elemen li
    li.addEventListener("click", () => {
        // Menghapus kelas yang dipilih dari semua elemen li
        const allLiElements = alphabetList?.querySelectorAll("li");
        allLiElements?.forEach(el => el.classList.remove("bg-gray-100"));

        // Menambahkan kelas yang dipilih ke elemen li yang diklik
        li.classList.add("bg-gray-100");
        
        // Memperbarui konten titleAlphabet
        titleAlphabet.textContent = letter;

        // Mengambil dan menampilkan data untuk huruf yang diklik
        displayDataForLetter(letter);
    });

    alphabetList?.appendChild(li);
    // Menyorot elemen li pertama (huruf "A") secara default
    alphabetList?.firstElementChild?.classList.add("bg-gray-100");
}
