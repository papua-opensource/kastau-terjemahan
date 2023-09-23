import { supabase } from "./supabase";
import Swal from "sweetalert2";

/**
 * Fungsi untuk menangani pengiriman form feedback.
 * @param {Event} event - Event yang terjadi saat form dikirim.
 */
export async function handleSubmit(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const messageElement = form.elements.namedItem(
    "message"
  ) as HTMLTextAreaElement;
  const message = messageElement.value;
  
  // Memasukkan feedback ke dalam database
  const { data, error } = await supabase
    .from("feedback")
    .insert([{ message: message }]);

  // Menangani respons dari database
  if (error) {
    console.error("Error inserting data: ", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Feedback gagal dikirim.",
    });
  } else {
    Swal.fire("Terima kasih!", "Feedback berhasil dikirim", "success").then(
      () => {
        // Menutup modal setelah feedback berhasil dikirim
        const closeModalButton = document.querySelector(
          '[data-hs-overlay="#feedback-modal"]'
        );
        if (closeModalButton) {
          closeModalButton.dispatchEvent(new MouseEvent("click"));
        }
      }
    );
    form.reset(); // Mengatur ulang form setelah feedback berhasil dikirim
  }
}

// Menambahkan event listener saat konten DOM telah dimuat
document.addEventListener("DOMContentLoaded", function (event) {
  const form = document.getElementById("feedback-form");
  if (form) {
    form.addEventListener("submit", handleSubmit); // Menambahkan event listener untuk form feedback
  } else {
    console.error("Form not found");
  }
});
