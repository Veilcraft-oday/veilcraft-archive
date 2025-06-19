document.addEventListener("DOMContentLoaded", function () {
  // Music autoplay with fallback
  const audio = document.getElementById("bg-audio");
  if (audio) {
    audio.volume = 0.3;
    audio.play().catch(() => {
      const resumeAudio = () => {
        audio.play();
        document.removeEventListener("click", resumeAudio);
        document.removeEventListener("keydown", resumeAudio);
      };
      document.addEventListener("click", resumeAudio);
      document.addEventListener("keydown", resumeAudio);
    });
  }

  // Particle effects
  const particlesContainer = document.getElementById("particles-container");
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
      const moveX = pos.x + (Math.random() * 20 - 10);
      const moveY = pos.y - Math.random() * 30;
      particle.style.left = `${moveX}%`;
      particle.style.top = `${moveY}%`;

      setTimeout(() => animateParticle(particle), duration * 1000);
    }, delay * 1000);
  }

  // Mouse reactive background
  document.addEventListener("mousemove", (e) => {
    const mouseX = (e.clientX / window.innerWidth - 0.5) * 5;
    const mouseY = (e.clientY / window.innerHeight - 0.5) * 5;
    const spheres = document.querySelectorAll(".gradient-sphere");

    spheres.forEach((sphere) => {
      sphere.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    const cursorParticle = document.createElement("div");
    cursorParticle.className = "particle";
    const size = Math.random() * 4 + 2;
    cursorParticle.style.width = `${size}px`;
    cursorParticle.style.height = `${size}px`;
    cursorParticle.style.left = `${(e.clientX / window.innerWidth) * 100}%`;
    cursorParticle.style.top = `${(e.clientY / window.innerHeight) * 100}%`;
    cursorParticle.style.opacity = "0.6";
    particlesContainer.appendChild(cursorParticle);

    setTimeout(() => {
      cursorParticle.style.transition = "all 2s ease-out";
      cursorParticle.style.left = `${(e.clientX / window.innerWidth) * 100 + (Math.random() * 10 - 5)}%`;
      cursorParticle.style.top = `${(e.clientY / window.innerHeight) * 100 + (Math.random() * 10 - 5)}%`;
      cursorParticle.style.opacity = "0";

      setTimeout(() => {
        cursorParticle.remove();
      }, 2000);
    }, 10);
  });
});

// === Password Check and Ritual Reveal ===
function checkFinalAnswer() {
  const input = document.getElementById("final-answer").value.trim().toLowerCase();
  const errorMessage = document.getElementById("error-message");

  if (input === "renew") {
    errorMessage.style.display = "none";

    const initial = document.getElementById("initial-phase");
    const ritual = document.getElementById("ritual-phase");

    initial.classList.add("fade-out-container");

    // Delay to wait for fade-out, then switch containers
    setTimeout(() => {
      initial.style.display = "none";
      ritual.style.display = "block";
      document.body.style.overflow = "hidden";
    }, 1000);
  } else {
    errorMessage.style.display = "block";
  }
}
