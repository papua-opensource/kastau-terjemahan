import { fetchData, ResultItem } from "./words";

// Get references to the HTML elements we are working with
const sourceLangElement = document.querySelector("#source") as HTMLInputElement;
const targetLangElement = document.querySelector("#target") as HTMLInputElement;
const sourceTextArea = document.querySelector(
  "#source-text"
) as HTMLTextAreaElement;
const targetTextArea = document.querySelector(
  "#target-text"
) as HTMLTextAreaElement;
const switchButton = document.querySelector(
  "#switch-button"
) as HTMLButtonElement;
const resultsContainer = document.getElementById("results") as HTMLUListElement;
const examplesContainer = document.getElementById(
  "examples"
) as HTMLUListElement;
const relatedWordsTitle = document.getElementById(
  "related-words-title"
) as HTMLInputElement;
const exampleUsageTitle = document.getElementById(
  "example-usage-title"
) as HTMLInputElement;
const targetCardArea = document.getElementById(
  "translations"
) as HTMLInputElement;

// Function to switch the source and target languages
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

async function translate(): Promise<void> {
  const sourceLang = sourceLangElement.textContent?.trim().toLowerCase();
  const targetLang = targetLangElement.textContent?.trim().toLowerCase();
  const query = sourceTextArea.value.toLowerCase();

  // If the query is empty, clear the target text area and results container
  if (query.trim() === "") {
    targetTextArea.value = "";
    resultsContainer.innerHTML = "";
    examplesContainer.innerHTML = "";
    relatedWordsTitle.classList.add("hidden");
    exampleUsageTitle.classList.add("hidden");
    targetCardArea.classList.add("hidden");
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

    // If there are no results, display a message and clear the results container
    if (results.length === 0) {
      targetTextArea.value = "Hasil tidak ditemukan.";
      resultsContainer.innerHTML = "";
      examplesContainer.innerHTML = "";
      relatedWordsTitle.classList.add("hidden");
      exampleUsageTitle.classList.add("hidden");
      targetCardArea.classList.remove("hidden");
      return;
    }

    // Display the first result in the target text area
    targetTextArea.value =
      sourceLang === "mooi"
        ? `${results[0].mooi_arti}`
        : `${results[0].mooi_kata}`;

    // Display all results in the results container
    displayResults(results, sourceLang!);
  } catch (error) {
    console.error("Failed to fetch dictionary:", error);
    targetTextArea.value = "An error occurred while fetching data.";
    resultsContainer.innerHTML = "";
    examplesContainer.innerHTML = "";
  }
}

function displayList(
  element: HTMLElement,
  data: any[],
  sourceLang: string,
  contentType: "Kata-kata terkait" | "Contoh penggunaan"
) {
  // Clear the existing list items
  element.innerHTML = "";

  // Create and append new list items for each result
  data.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className =
      "inline-flex items-center gap-x-1 py-3 pl-2 md:pl-2 text-base font-normal text-gray-800";

    if (contentType === "Kata-kata terkait") {
      if (sourceLang === "mooi" && item) {
        listItem.innerHTML = `${item.mooi_kata} [${item.mooi_lafal}] ${item.kelas_kata}: ${item.mooi_arti}`;
      } else if (item) {
        listItem.innerHTML = `${item.indo_kata} ${item.kelas_kata} : ${item.mooi_arti} [${item.mooi_lafal}]`;
      }
    } else if (contentType === "Contoh penggunaan") {
      if (sourceLang === "mooi" && item) {
        listItem.innerHTML = `${item.mooi_contoh} &#8594; ${item.indo_contoh}`;
      } else if (item) {
        listItem.innerHTML = `${item.indo_contoh} &#8594; ${item.mooi_contoh}`;
      }
    }
    element.appendChild(listItem);
  });
}

function displayResults(results: ResultItem[], sourceLang: string): void {
  // If there are no results, hide the containers
  if (results.length === 0) {
    resultsContainer.parentElement?.parentElement?.classList.add("hidden");
    examplesContainer.parentElement?.parentElement?.classList.add("hidden");
    relatedWordsTitle.classList.add("hidden");
    exampleUsageTitle.classList.add("hidden");
    return;
  }

  // Show the containers if there are results
  resultsContainer.parentElement?.parentElement?.classList.remove("hidden");
  examplesContainer.parentElement?.parentElement?.classList.remove("hidden");
  relatedWordsTitle.classList.remove("hidden"); // Show the title
  exampleUsageTitle.classList.remove("hidden");
  targetCardArea.classList.remove("hidden");

  // Display the data in the respective elements
  displayList(resultsContainer, results, sourceLang, "Kata-kata terkait");
  displayList(examplesContainer, results, sourceLang, "Contoh penggunaan");
}

// Add event listeners for the text area input and switch button click events
sourceTextArea.addEventListener("input", translate);
switchButton.addEventListener("click", switchLanguages);
