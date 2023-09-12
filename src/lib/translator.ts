import { fetchData, ResultItem } from "./words";

// Mendapatkan referensi elemen-elemen HTML yang akan digunakan
const sourceLangElement = document.getElementById("source") as HTMLInputElement;
const targetLangElement = document.getElementById("target") as HTMLInputElement;
const sourceTextArea = document.getElementById("source-text") as HTMLTextAreaElement;
const targetTextArea = document.getElementById("target-text") as HTMLTextAreaElement;
const switchButton = document.getElementById("switch-button") as HTMLButtonElement;
const resultsContainer = document.getElementById("results") as HTMLUListElement;
const relateWordsContainer = document.getElementById("related-words-container") as HTMLElement

/**
 * Fungsi untuk menukar bahasa sumber dan bahasa tujuan.
 */
function switchLanguages(): void {
  [sourceLangElement.textContent, targetLangElement.textContent] = [
    targetLangElement.textContent,
    sourceLangElement.textContent,
  ];

  if (targetTextArea.value != "Hasil tidak ditemukan.") {
    [sourceTextArea.value, targetTextArea.value] = [
      targetTextArea.value,
      sourceTextArea.value,
    ];
  }

  translate();
}

/**
 * Fungsi untuk menerjemahkan teks berdasarkan bahasa sumber dan tujuan.
 */
async function translate(): Promise<void> {
  const sourceLang = sourceLangElement.textContent?.trim().toLowerCase();
  const targetLang = targetLangElement.textContent?.trim().toLowerCase();
  const query = sourceTextArea.value.toLowerCase();

  // Jika query kosong, bersihkan area teks tujuan dan kontainer hasil
  if (query.trim() === "") {
    targetTextArea.value = "";
    resultsContainer.innerHTML = "";
    relateWordsContainer.classList.add("hidden")
    return;
  }

  try {
    const data = await fetchData();

    if (!data) {
      throw new Error("Failed to fetch data from fetchData");
    }

    const results = data.filter(
      (item: ResultItem) =>
        (sourceLang === "mooi" &&
          targetLang === "indonesia" &&
          item.mooi_kata.toLowerCase().startsWith(query)) ||
        (sourceLang === "indonesia" &&
          targetLang === "mooi" &&
          item.mooi_arti.toLowerCase().startsWith(query))
    );

    // Jika tidak ada hasil, tampilkan pesan dan bersihkan kontainer hasil
    if (results.length === 0) {
      targetTextArea.value = "Hasil tidak ditemukan.";
      resultsContainer.innerHTML = "";
      relateWordsContainer.classList.add("hidden")
      return;
    }

    // Tampilkan hasil pertama di area teks tujuan
    targetTextArea.value =
      sourceLang === "mooi"
        ? `${results[0].mooi_arti}`
        : `${results[0].mooi_kata}`;

    // Tampilkan semua hasil di kontainer hasil
    displayResults(results, sourceLang!);
  } catch (error) {
    console.error("Failed to fetch dictionary:", error);
    targetTextArea.value = "An error occurred while fetching data.";
    resultsContainer.innerHTML = "";
    relateWordsContainer.classList.add("hidden")
  }
}

/**
 * Fungsi untuk menampilkan daftar hasil di elemen yang diberikan.
 * @param {HTMLElement} element - Elemen tempat menampilkan hasil.
 * @param {any[]} data - Data untuk ditampilkan.
 * @param {string} sourceLang - Bahasa sumber.
 * @param {string} contentType - Tipe konten yang akan ditampilkan ("Kata-kata terkait" atau "Contoh penggunaan").
 */
function displayList(
  element: HTMLElement,
  data: any[],
  sourceLang: string,
) {
  // Bersihkan item daftar yang ada
  element.innerHTML = "";

  // Buat dan tambahkan item daftar baru untuk setiap hasil
  data.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className =
      "flex justify-between gap-x-6 py-3 pl-2 text-base font-normal text-gray-800 md:pl-2";

    if (sourceLang === "mooi" && item) {
      // listItem.innerHTML = `${item.mooi_kata} [${item.mooi_lafal}] ${item.kelas_kata}: ${item.mooi_arti}`;
      listItem.innerHTML = `
      <div class="inline-flex gap-x-4">
        <span class="font-medium">${item.mooi_kata}</span>
        <span class="font-inter pt-0.5 text-sm text-gray-500">${item.mooi_arti}</span>
        </div>
        <div class="font-inter pt-0.5 text-sm text-gray-500">${item.kelas_kata.replace(/^./, str => str.toUpperCase())}</div>
      `
    } else if (item) {
      listItem.innerHTML = `
      <div class="inline-flex gap-x-4">
        <span class="font-medium">${item.indo_kata}</span>
        <span class="font-inter pt-0.5 text-sm text-gray-500">${item.mooi_kata}</span>
        </div>
        <div class="font-inter pt-0.5 text-sm text-gray-500">${item.kelas_kata.replace(/^./, str => str.toUpperCase())}</div>
      `
    }
    element.appendChild(listItem);
  });
}

/**
 * Fungsi untuk menampilkan hasil di elemen yang sesuai.
 * @param {ResultItem[]} results - Hasil untuk ditampilkan.
 * @param {string} sourceLang - Bahasa sumber.
 */
function displayResults(results: ResultItem[], sourceLang: string): void {
  // Jika tidak ada hasil, sembunyikan kontainer
  if (results.length === 0) {
    relateWordsContainer.classList.add("hidden");
    resultsContainer.parentElement?.parentElement?.classList.add("hidden");
    return;
  }

  // Tampilkan kontainer jika ada hasil
  relateWordsContainer.classList.remove("hidden");
  resultsContainer.parentElement?.parentElement?.classList.remove("hidden");

  // Tampilkan data di elemen yang sesuai
  displayList(resultsContainer, results, sourceLang);
}

// Tambahkan event listener untuk input area teks dan klik tombol switch
sourceTextArea.addEventListener("input", translate);
switchButton.addEventListener("click", switchLanguages);
