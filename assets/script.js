/* script.js */
document.addEventListener("DOMContentLoaded", function () {
  const countdownEl = document.getElementById("countdown");
  const riddleEl = document.getElementById("riddle");

  const targetDate = new Date("2025-06-21T09:00:00").getTime();

  const interval = setInterval(() => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(interval);
      countdownEl.style.display = "none";
      document.getElementById("riddle-placeholder").innerHTML = `
        <div id="riddle">
          <p>The answer lies in the fifth seat.</p>
          <p>Look between the lines</p>
          <input type="text" id="answer" placeholder="Enter your answer">
          <button onclick="checkAnswer()">Submit</button>
          <p id="error-message" style="color: red; display: none;">Incorrect. Look deeper.</p>
        </div>
      `;

      // Enable Enter key submission
      document.getElementById("answer").addEventListener("keydown", function (e) {
        if (e.key === "Enter") checkAnswer();
      });

      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `Countdown: ${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, 1000);
});

// Background audio autoplay logic
window.addEventListener("load", () => {
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
});

// Secure hash-based password check
async function hashInput(text) {
  const buffer = new TextEncoder().encode(text.trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkAnswer() {
  const input = document.getElementById("answer").value.trim().toLowerCase();
  const hashedInput = await hashInput(input);
  const correctHash = "aef963b6220bdb876ac91b177c7a9726b1d98f8f5d54fffa0322c5561bd79bba"; // "sultai"

  if (hashedInput === correctHash) {
    sessionStorage.setItem("veilcraft_passed", "true");
    window.location.href = "SLTI.html";
  } else {
    document.getElementById("error-message").style.display = "block";
  }
}

// Particle effect
const particlesContainer = document.getElementById('particles-container');
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
  createParticle();
}

function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'particle';

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
  particle.style.opacity = '0';

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

    setTimeout(() => {
      animateParticle(particle);
    }, duration * 1000);
  }, delay * 1000);
}

// Mouse particle interaction
document.addEventListener('mousemove', (e) => {
  const mouseX = (e.clientX / window.innerWidth) * 100;
  const mouseY = (e.clientY / window.innerHeight) * 100;

  const particle = document.createElement('div');
  particle.className = 'particle';

  const size = Math.random() * 4 + 2;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;

  particle.style.left = `${mouseX}%`;
  particle.style.top = `${mouseY}%`;
  particle.style.opacity = '0.6';

  particlesContainer.appendChild(particle);

  setTimeout(() => {
    particle.style.transition = 'all 2s ease-out';
    particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
    particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
    particle.style.opacity = '0';

    setTimeout(() => {
      particle.remove();
    }, 2000);
  }, 10);

  const spheres = document.querySelectorAll('.gradient-sphere');
  const moveX = (e.clientX / window.innerWidth - 0.5) * 5;
  const moveY = (e.clientY / window.innerHeight - 0.5) * 5;

  spheres.forEach(sphere => {
    sphere.style.transform = `translate(${moveX}px, ${moveY}px)`;
  });
});
