const body = document.body;

const saveMode = localStorage.getItem("theme");
if (saveMode) {
  body.className = saveMode;
}

function toggleMode() {
  if (body.classList.contains("dark-mode")) {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light-mode");
  } else {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark-mode");
  }
}
