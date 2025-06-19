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

  // Particle effect setup
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

      setTimeout(() => {
        particle.remove();
      }, 2000);
    }, 10);

    const spheres = document.querySelectorAll(".gradient-sphere");
    const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
    const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

    spheres.forEach((sphere) => {
      sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
  });
});

// Secure password check with hash
async function checkFinalAnswer() {
  const input = document.getElementById("final-answer").value.trim().toLowerCase();
  const hashed = await hashInput(input);
  const expectedHash = "f4b96d97a734c2cb03f54ee5a3004d6aa4f7c5b949bc6c227c78f9e20c84370f"; // SHA-256 of "renew"

  const errorMessage = document.getElementById("error-message");
  const image = document.getElementById("ritual-image");
  const ritualBtn = document.getElementById("ritual-btn");
  const challengeText = document.getElementById("challenge-text");

  if (hashed === expectedHash) {
    errorMessage.style.display = "none";
    image.classList.add("fade-out");

    challengeText.innerHTML = `
      Congratulations!<br>
      Now gather your friends and start the Ritual by clicking here.<br>
      <em>But beware — we will need all of you.</em>
    `;
    ritualBtn.style.display = "inline-block";
  } else {
    errorMessage.style.display = "block";
  }
}

async function hashInput(input) {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
