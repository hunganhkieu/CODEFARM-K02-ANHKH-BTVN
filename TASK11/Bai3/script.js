const textArea = document.getElementById("textInput");
const wordCount = document.getElementById("wordCount");
const charCount = document.getElementById("charCount");
const maxLength = 200;

function updateCount() {
  const numberChars = textArea.value.length;
  const remainingChars = maxLength - numberChars;

  const words = textArea.value.trim()
    ? textArea.value.trim().split(/\s+/).length
    : 0;

  wordCount.textContent = `Số từ: ${words}`;
  charCount.textContent = `Số ký tự còn lại: ${remainingChars}`;
}

textArea.addEventListener("input", updateCount);
