/* script.js */
document.addEventListener("DOMContentLoaded", function () {
  const countdownEl = document.getElementById("countdown");
  const riddleEl = document.getElementById("riddle");

  const targetDate = new Date("2025-06-11T03:30:00").getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(interval);
      countdownEl.style.display = "none";
      document.getElementById("riddle-placeholder").innerHTML = `
  <div id="riddle">
    <p>Decode the memory. Say the name.</p>
    <code>c2F5b2RheQ==</code>
    <input type="text" id="answer" placeholder="Enter your answer">
    <button onclick="checkAnswer()">Submit</button>
  </div>
`;

      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
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
