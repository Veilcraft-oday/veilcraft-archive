
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("riddle-code");
  const button = document.getElementById("riddle-submit");
  const error = document.getElementById("riddle-error");

  function checkRiddle() {
    const value = input.value.trim();

    if (value === "9558") {
      window.location.href = "../reward.html";
    } else {
      error.style.display = "block";
    }
  }

  button.addEventListener("click", checkRiddle);

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") checkRiddle();
  });
});
