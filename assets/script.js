document.addEventListener("DOMContentLoaded", function () {
  // Gate password logic
  const gateForm = document.getElementById("gate-form");
  const gateInput = document.getElementById("gate-input");
  const gateFeedback = document.getElementById("gate-feedback");

  if (gateForm && gateInput && gateFeedback) {
    gateForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const value = gateInput.value.trim().toLowerCase();

      if (value === "4rgnko0fghjkl") {
        gateFeedback.textContent = "The veil opens...";
        gateFeedback.style.display = "block";

        setTimeout(() => {
          window.location.href = "riddle/";
        }, 800);
      } else {
        gateFeedback.textContent = "The veil remains closed.";
        gateFeedback.style.display = "block";
        gateInput.value = "";
        gateInput.focus();
      }
    });
  }
// Countdown
const countdownEl = document.getElementById("countdown");

if (countdownEl) {
  const targetDate = new Date("2026-06-06T10:00:00").getTime();

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      countdownEl.innerHTML = "The veil has opened.";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) /
      (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (distance % (1000 * 60 * 60)) /
      (1000 * 60)
    );
    const seconds = Math.floor(
      (distance % (1000 * 60)) /
      1000
    );

    countdownEl.innerHTML =
      `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };

  updateCountdown();
  setInterval(updateCountdown, 1000);
}
  // Riddle code logic
  const riddleForm = document.getElementById("riddle-form");
  const riddleInput = document.getElementById("riddle-input");
  const riddleFeedback = document.getElementById("riddle-feedback");

  if (riddleForm && riddleInput && riddleFeedback) {
    riddleForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const value = riddleInput.value.trim();

      if (value === "9458") {
        riddleFeedback.textContent = "The ghosts remember.";
        riddleFeedback.style.display = "block";

        setTimeout(() => {
          window.location.href = "../reward.html";
        }, 800);
      } else {
        riddleFeedback.textContent = "Not yet. Count what remains.";
        riddleFeedback.style.display = "block";
        riddleInput.value = "";
        riddleInput.focus();
      }
    });
  }

  // Music autoplay fallback
  const audio = document.getElementById("bg-audio");
  if (audio) {
    audio.volume = 0.3;
    audio.play().catch(() => {
      const resumeAudio = () => {
        audio.muted = false;
        audio.play().catch(() => {});
        document.removeEventListener("click", resumeAudio);
        document.removeEventListener("keydown", resumeAudio);
      };

      document.addEventListener("click", resumeAudio);
      document.addEventListener("keydown", resumeAudio);
    });
  }

  // Particle system
  const particlesContainer = document.getElementById("particles-container");

  if (particlesContainer) {
    const particleCount = 80;

    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }

    function createParticle() {
      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      resetParticle(particle);
      particlesContainer.appendChild(particle);
      animateParticle(particle);
    }

    function resetParticle(particle) {
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;

      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.opacity = "0";

      return { x: posX, y: posY };
    }

    function animateParticle(particle) {
      const pos = resetParticle(particle);
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;

      setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = Math.random() * 0.3 + 0.1;
        particle.style.left = `${pos.x + (Math.random() * 20 - 10)}%`;
        particle.style.top = `${pos.y - Math.random() * 30}%`;

        setTimeout(() => animateParticle(particle), duration * 1000);
      }, delay * 1000);
    }

    document.addEventListener("mousemove", (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 100;
      const mouseY = (e.clientY / window.innerHeight) * 100;

      const particle = document.createElement("div");
      particle.className = "particle";

      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${mouseX}%`;
      particle.style.top = `${mouseY}%`;
      particle.style.opacity = "0.6";

      particlesContainer.appendChild(particle);

      setTimeout(() => {
        particle.style.transition = "all 2s ease-out";
        particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
        particle.style.opacity = "0";

        setTimeout(() => particle.remove(), 2000);
      }, 10);

      const spheres = document.querySelectorAll(".gradient-sphere");
      const moveX = (e.clientX / window.innerWidth - 0.5) * 6;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

      spheres.forEach((sphere) => {
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  }
});
