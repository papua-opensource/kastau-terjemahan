import { supabase } from "./supabase";
import Swal from "sweetalert2";

export async function handleSubmit(event: Event) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const messageElement = form.elements.namedItem(
    "message"
  ) as HTMLTextAreaElement;
  const message = messageElement.value;

  const { data, error } = await supabase
    .from("feedback")
    .insert([{ message: message, created_at: new Date().toISOString() }]);

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
        const closeModalButton = document.querySelector(
          '[data-modal-hide="feedback-modal"]'
        );
        if (closeModalButton) {
          closeModalButton.dispatchEvent(new MouseEvent("click"));
        }
      }
    );
    form.reset()
  }
}

document.addEventListener("DOMContentLoaded", function (event) {
  const form = document.getElementById("feedback-form");
  if (form) {
    form.addEventListener("submit", handleSubmit);
  } else {
    console.error("Form not found");
  }
});
