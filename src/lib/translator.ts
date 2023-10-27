import { fetchVocabularyData, type ResultItem } from "./words";

// Mendapatkan referensi elemen-elemen HTML yang akan digunakan
const sourceLangElement = document.getElementById("sourceLangId") as HTMLSelectElement;
const targetLangElement = document.getElementById("targetLangId") as HTMLSelectElement;

const sourceWord = document.getElementById("sourceWord") as HTMLDivElement;
const targetWord = document.getElementById("targetWord") as HTMLDivElement;
const sourceTextArea = sourceWord.querySelector("textarea")
const targetTextArea = targetWord.querySelector("textarea")

const vocabularyModal = document.getElementById('vocabModal') as HTMLDivElement;

const switchButton = document.getElementById("switch-button") as HTMLButtonElement;

const relateWordsContainer = document.getElementById("related-words-container") as HTMLElement
const resultsContainer = document.getElementById("results") as HTMLUListElement;


/**
 * Fungsi untuk menukar bahasa sumber dan bahasa tujuan.
 */
function switchLanguages(): void {
  // Simpan pilihan bahasa yang dipilih
  const sourceLangValue = sourceLangElement.value;
  const targetLangValue = targetLangElement.value;

  // Menukar teks label bahasa
  [sourceLangElement.innerHTML, targetLangElement.innerHTML] = [
    targetLangElement.innerHTML,
    sourceLangElement.innerHTML,
  ];

  // Menukar teks dalam textarea jika ada hasil yang ditampilkan
  if (targetTextArea.value != "Hasil tidak ditemukan.") {
    [sourceTextArea.value, targetTextArea.value] = [
      targetTextArea.value,
      sourceTextArea.value,
    ];
  }

  // Mengatur ulang pilihan bahasa yang dipilih
  sourceLangElement.value = targetLangValue;
  targetLangElement.value = sourceLangValue;

  translate();
}


/**
 * Fungsi untuk menerjemahkan teks berdasarkan bahasa sumber dan tujuan.
 */
async function translate(): Promise<void> {
  const sourceLang = parseInt(sourceLangElement.value);
  const targetLang = parseInt(targetLangElement.value);
  const query = sourceTextArea.value.toLowerCase();

  // Jika query kosong, bersihkan area teks tujuan dan kontainer hasil
  if (query.trim() === "") {
    targetTextArea.value = "";
    targetWord.children[1].innerHTML = "";
    resultsContainer.innerHTML = "";
    relateWordsContainer.classList.add("hidden")
    vocabularyModal.innerHTML = "";
    return;
  }

  try {
    const data = await fetchVocabularyData(sourceLang === 1 ? targetLang : sourceLang);

    if (!data) {
      throw new Error("Failed to fetch data from fetchData");
    }

    const results = data.filter((item: ResultItem) => {
      const sourceToTargetMatch = (
        (sourceLang === 2 && targetLang === 1) ||
        (sourceLang === 3 && targetLang === 1)
      ) && item.kata.toLowerCase().includes(query);

      const targetToSourceMatch = (
        (sourceLang === 1 && targetLang === 2) ||
        (sourceLang === 1 && targetLang === 3)
      ) && item.arti.toLowerCase().includes(query);
      
      return sourceToTargetMatch || targetToSourceMatch;
    });

    // Jika tidak ada hasil, tampilkan pesan dan bersihkan kontainer hasil
    if (results.length === 0) {
      targetTextArea.value = "Hasil tidak ditemukan.";
      resultsContainer.innerHTML = "";
      relateWordsContainer.classList.add("hidden")
      return;
    }

    // Tampilkan hasil pertama di area teks tujuan
    targetTextArea.value =
      sourceLang === 2 || sourceLang == 3
        ? `${results[0].arti}`
        : `${results[0].kata}`;

    // Buat id dinamis  
    const dynamicId = `vocabulary-modal-${results[0].kata.replace(/\s+/g, '')}`;

    targetWord.children[1].innerHTML = `
      <div class="flex flex-col pb-2">
        <p class="font-inter text-sm text-gray-500">${results[0].lafal ? results[0].lafal : ""}</p>
        <div class="flex justify-between">
          <div class="inline-flex gap-x-4">
            <h2 class="font-inter text-sm text-gray-800">
              ${results[0].kelas_kata}
            </h2>
            <span 
              data-hs-overlay="#${dynamicId}"
              class="cursor-pointer text-sm text-gray-600 underline"
              >Lihat detail</span
            >
          </div>
        </div>
      </div>
    `

    const modalDiv = document.createElement("div")
    modalDiv.id = dynamicId
    modalDiv.className = "hs-overlay hidden w-full h-full fixed top-0 left-0 z-[60] overflow-x-hidden overflow-y-auto"
    modalDiv.innerHTML = `
      <div class="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto">
        <div class="flex flex-col bg-white border shadow-sm rounded-xl">
          <div class="flex justify-between items-center py-3 px-4 border-b">
              <div class="flex gap-x-4">
                  <div class="flex flex-col">
                      <h3
                          class="text-xl text-gray-900"
                      >
                          ${results[0].kata} = <span class="font-inter text-gray-500">${results[0].arti}</span>
                      </h3>
                  </div>
              </div>
              <button type="button" class="hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-sm" data-hs-overlay="#${dynamicId}">
              <span class="sr-only">Close</span>
              <svg class="w-3.5 h-3.5" width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z" fill="currentColor"/>
              </svg>
              </button>
          </div>                
          <div class="p-6 space-y-2">
          ${results[0].contoh_asal && results[0].contoh_terjemahan ? `
              <h3
                  class="text-blue-500 font-inter font-semibold"
              >
                  Contoh Penggunaan
              </h3>
              <div>
                  <h3
                      class="text-gray-900 text-sm font-inter font-semibold"
                  >
                      ${sourceLang === 0 ? `Kalimat Mooi` : `Kalimat Sentani`}
                  </h3>
                  <p
                      class="text-lg font-inter leading-relaxed text-gray-500"
                  >
                      ${results[0].contoh_asal}
                  </p>
              </div>
              <div>
                  <h3
                      class="text-gray-900 text-sm font-inter font-semibold"
                  >
                      Arti Indonesia
                  </h3>
                  <p
                      class="text-lg font-inter leading-relaxed text-gray-500"
                  >
                      ${results[0].contoh_terjemahan}
                  </p>
              </div>
          `
        : `
              <p class="text-base italic font-inter leading-relaxed text-gray-500">
                  Mohon maaf, contoh penggunaan untuk kosa kata ini belum tersedia.
                  <br>
                  Ingin kontribusi? <a href="/contribution" target="_blank" class="text-blue-600 underline">baca panduan
                      disini.</a>
              </p>
          `}
                  </div>
                  <div class="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                      <button type="button" class="hs-dropdown-toggle py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm" data-hs-overlay="#${dynamicId}">
                      Tutup
                      </button>
                  </div>
                  </div>
              </div>
            `
    vocabularyModal.appendChild(modalDiv)

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
 */
function displayList(
  element: HTMLElement,
  data: any[],
  sourceLang: number,
) {
  // Bersihkan item daftar yang ada
  element.innerHTML = "";

  // Batasi jumlah data yang ditampilkan menjadi 15
  const dataLimit = data.slice(0, 10);

  // Buat dan tambahkan item daftar baru untuk setiap hasil
  dataLimit.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className =
      "flex justify-between gap-x-6 py-3 pl-2 text-base font-normal text-gray-800 md:pl-2";

    if (sourceLang === 2 || sourceLang == 3 && item) {
      listItem.innerHTML = `
      <div class="inline-flex gap-x-4">
        <span class="font-medium">${item.kata}</span>
        <span class="font-inter pt-0.5 text-sm text-gray-500">${item.arti}</span>
        </div>
        <div class="font-inter pt-0.5 text-sm text-gray-500">${item.kelas_kata.replace(/^./, str => str.toUpperCase())}</div>
      `
    } else if (item) {
      listItem.innerHTML = `
      <div class="inline-flex gap-x-4">
        <span class="font-medium">${item.arti}</span>
        <span class="font-inter pt-0.5 text-sm text-gray-500">${item.kata}</span>
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
function displayResults(results: ResultItem[], sourceLang: number): void {
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
