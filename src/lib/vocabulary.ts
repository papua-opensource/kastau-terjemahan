import { fetchFilteredData } from "./words";


const langID = document.getElementById("selectLang") as HTMLSelectElement;
const alphabetList = document.getElementById("letterList") as HTMLUListElement;
const titleAlphabet = document.getElementById("titleAbjad") as HTMLSpanElement;
const listVocab = document.getElementById("listVocabulary") as HTMLUListElement;
const vocabularyModal = document.getElementById('vocabModal') as HTMLDivElement;

async function displayDataForLetter(letter: string, lang_id: number) {
    listVocab.innerHTML = "";
    vocabularyModal.innerHTML = "";

    const data = await fetchFilteredData(letter, lang_id);
    if (data && data.length > 0) {
        data.forEach((item, index) => {
            // Buat id dinamis
            const dynamicId = `vocabulary-modal-${index}`;

            const li = document.createElement("li")
            li.className = "flex justify-between my-2 p-4 items-center border border-gray-200 rounded cursor-pointer hover:bg-gray-100"
            li.setAttribute("data-hs-overlay", `#${dynamicId}`)
            li.innerHTML = `
                <span>
                    <p class="text-gray-600">
                        <strong>${item.kata}</strong> = ${item.arti}
                    </p>
                </span>
                <span class="text-sm text-gray-500 underline">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="w-5 h-5 text-gray-400"
                        viewBox="0 0 24 24"
                    >
                        <g
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                        >
                            <path
                                d="M8 13V4.5a1.5 1.5 0 0 1 3 0V12m0-.5v-2a1.5 1.5 0 0 1 3 0V12m0-1.5a1.5 1.5 0 0 1 3 0V12"
                            ></path>
                            <path
                                d="M17 11.5a1.5 1.5 0 0 1 3 0V16a6 6 0 0 1-6 6h-2h.208a6 6 0 0 1-5.012-2.7L7 19c-.312-.479-1.407-2.388-3.286-5.728a1.5 1.5 0 0 1 .536-2.022a1.867 1.867 0 0 1 2.28.28L8 13M5 3L4 2m0 5H3m11-4l1-1m0 4h1"
                            ></path>
                        </g>
                    </svg>
                </span>
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
                                    class="text-base text-gray-900"
                                >
                                    ${item.kata} = <span class="font-inter text-gray-500">${item.arti}</span>
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
                    ${item.contoh_asal && item.contoh_terjemahan ? `
                        <h3
                            class="text-blue-500 font-inter font-semibold"
                        >
                            Contoh Penggunaan
                        </h3>
                        <div>
                            <h3
                                class="text-gray-900 text-sm font-inter font-semibold"
                            >
                                ${lang_id === 1 ? `Kalimat Mooi` : `Kalimat Sentani`}
                            </h3>
                            <p
                                class="text-lg font-inter leading-relaxed text-gray-500"
                            >
                                ${item.contoh_asal}
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
                                ${item.contoh_terjemahan}
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
            listVocab.appendChild(li)
            vocabularyModal.appendChild(modalDiv)
        })
    } else {
        // Menampilkan pesan ketika data kosong atau null
        const noDataDiv = document.createElement("div");
        noDataDiv.innerHTML = `
            <p class="text-base font-inter leading-relaxed text-gray-500">
                Mohon maaf, untuk kosa kata untuk huruf <strong>${letter}</strong> belum tersedia.
                <br>
                Ingin menambahkan? baca panduan kontribusi <a href="#" target="_blank" class="text-blue-600 underline">
                    disini.</a>
            </p>               
        `;
        listVocab.appendChild(noDataDiv)
    }
}

// Fungsi wrapper untuk Astro frontmatter
// export async function displayDataForSelectedLetter() {
//     const selectedLetter = titleAlphabet.textContent || 'A';
//     const selectedLang = parseInt(langID.value);
//     return await displayDataForLetter(selectedLetter, selectedLang);
// }

function handleLetterClick(event: Event) {
    const target = event.target as HTMLElement;
    const allLiElements = alphabetList?.querySelectorAll("li");
    allLiElements?.forEach((el) => el.classList.remove("bg-gray-100"));

    target.classList.add("bg-gray-100");
    titleAlphabet.textContent = target.textContent;

    displayDataForLetter(target.textContent!, parseInt(langID.value));
}

function handleLangChange(event: Event) {
    const target = event.target as HTMLSelectElement;

    displayDataForLetter(titleAlphabet.textContent!, parseInt(target.value));
}

// Menampilkan data untuk huruf "A" secara default saat halaman dimuat
displayDataForLetter('A', parseInt(langID.value));

for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const li = document.createElement("li");
    li.className = "text-center cursor-pointer font-sofia px-3 py-2 text-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 hover:rounded";
    li.textContent = letter;

    li.addEventListener("click", handleLetterClick);
    alphabetList?.appendChild(li);
}

langID.addEventListener("change", handleLangChange);

// Menyorot elemen li pertama (huruf "A") secara default
alphabetList?.firstElementChild?.classList.add("bg-gray-100");