document.addEventListener("DOMContentLoaded", function () {
  // === Audio Setup ===
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

  // === Particle Setup ===
  const particlesContainer = document.getElementById("particles-container");
  const particleCount = 80;
  for (let i = 0; i < particleCount; i++) createParticle();

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

  // === Mouse Interaction ===
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
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;
    spheres.forEach((s) => {
      s.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });

  // === Intro Scroll-to-Container ===
  const scrollTarget = document.querySelector(".veilcraft-container");
  if (scrollTarget) {
    setTimeout(() => {
      scrollTarget.scrollIntoView({ behavior: "smooth" });
    }, 700); // Slight delay after DOM load
  }
});

// === Final Answer Validation ===
function checkFinalAnswer() {
  const input = document.getElementById("final-answer").value.trim().toLowerCase();
  const correctAnswer = "renew";
  const errorMessage = document.getElementById("error-message");

  if (input === correctAnswer) {
    document.getElementById("veilcraft-container").classList.add("fade-out");

    setTimeout(() => {
      document.getElementById("veilcraft-container").style.display = "none";
      document.getElementById("ritual-container").style.display = "block";
      document.body.style.overflow = "hidden";
    }, 1000);
  } else {
    errorMessage.style.display = "block";
    errorMessage.scrollIntoView({ behavior: "smooth" });
  }
}
