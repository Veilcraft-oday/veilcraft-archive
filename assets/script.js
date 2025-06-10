/* script.js */
document.addEventListener("DOMContentLoaded", function () {
  const countdownEl = document.getElementById("countdown");
  const riddleEl = document.getElementById("riddle");

  const targetDate = new Date("2025-06-15T09:00:00").getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(interval);
      countdownEl.style.display = "none";
      riddleEl.style.display = "block";
      return;
    }

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `Countdown: ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
});

function checkAnswer() {
  const input = document.getElementById("answer").value.trim().toLowerCase();
  if (input === "sayoday") {
    window.location.href = "reward.html";
  } else {
    alert("Incorrect. Look deeper.");
  }
}
