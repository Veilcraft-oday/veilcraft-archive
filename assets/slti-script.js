async function hashInput(text) {
  const buffer = new TextEncoder().encode(text.trim());
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, "0"))
    .join("");
}

async function checkFinalAnswer() {
  const input = document.getElementById("final-answer").value.trim().toLowerCase();
  const hashed = await hashInput(input);
  const correctHash = "cf7e42e2e48c69e9f02a7b77e48fc94b0eab84284c7dc402c5a9f0bfc1b3b711"; // hash of 'the ability'

  const image = document.getElementById("ritual-image");
  const text = document.getElementById("challenge-text");
  const button = document.getElementById("ritual-btn");
  const error = document.getElementById("error-message");

  if (hashed === correctHash) {
    image.classList.add("fade-out");
    text.innerHTML =
      "Congratulations! Now gather your friends please and start the Ritual by clicking here – but beware we will need all of you.";
    button.style.display = "inline-block";
    error.style.display = "none";
  } else {
    error.style.display = "block";
  }
}
