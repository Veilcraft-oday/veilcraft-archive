document.addEventListener("DOMContentLoaded", function () {
  // Countdown logic (only if element exists)
  const countdownEl = document.getElementById("countdown");
  if (countdownEl) {
    const targetDate = new Date("2025-07-05T09:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        countdownEl.style.display = "none";

        const placeholder = document.getElementById("riddle-placeholder");
        if (placeholder) {
          placeholder.innerHTML = `
            <div id="final-riddle">
              <p>
                What plane are we going to <b>finally</b> walk on in our <b>fantastic</b> journey in just <b>XII</b> days?
              </p>
              <input type="text" id="final-answer" placeholder="Your answer..." />
              <button onclick="submitFinalRiddle()">Submit</button>
              <p id="final-error" style="color: red; display: none;">Incorrect. Try again.</p>
            </div>
          `;

          const input = document.getElementById("final-answer");
          input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") submitFinalRiddle();
          });
        }

        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      countdownEl.innerHTML = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  }

  // Music autoplay fallback
  const audio = document.getElementById("bg-audio");
  if (audio) {
    audio.volume = 0.3;
    audio.play().catch(() => {
      const resumeAudio = () => {
        audio.muted = false;
        audio.play();
        document.removeEventListener("click", resumeAudio);
        document.removeEventListener("keydown", resumeAudio);
      };
      document.addEventListener("click", resumeAudio);
      document.addEventListener("keydown", resumeAudio);
    });
  }

  // Particle system (only if container exists)
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
      const moveX = (e.clientX / window.innerWidth - 0.2) * 6;
      const moveY = (e.clientY / window.innerHeight - 0.3) * 5;

      spheres.forEach((sphere) => {
        sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
      });
    });
  }
});

// Submission logic is global
function submitFinalRiddle() {
  const input = document.getElementById("final-answer");
  const error = document.getElementById("final-error");

  if (!input || !error) return;

  const value = input.value.trim().toLowerCase();
  if (value === "gaia") {
    window.location.href = "../finale/discord.html";
  } else {
    error.style.display = "block";
  }
}
