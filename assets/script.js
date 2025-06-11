<script>
  const targetDate = new Date("July 13, 2024 09:00:00").getTime();

  const countdownInterval = setInterval(function () {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById("timer").innerHTML =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;

    if (timeLeft <= 0) {
      clearInterval(countdownInterval);
      document.getElementById("timer").style.display = "none";

      // Dynamically load the riddle content
      fetch("riddle.html")
        .then((response) => response.text())
        .then((html) => {
          document.getElementById("content").innerHTML = html;
        });
    }
  }, 1000);

  function checkAnswer() {
    const userAnswer = document.getElementById("answer").value.trim().toLowerCase();
    if (userAnswer === "sayoday") {
      window.location.href = "reward.html";
    } else {
      alert("Try again...");
    }
  }
</script>
