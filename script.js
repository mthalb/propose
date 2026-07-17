let config = null;
let dodgeCount = 0;

async function loadConfig() {
  const res = await fetch("config.json");
  config = await res.json();
  document.getElementById("question").textContent = config.question;
  document.getElementById("yesBtn").textContent = config.yesText;
  document.getElementById("noBtn").textContent = config.noText;
}

function randomDodgeMessage() {
  const list = config.dodgeMessages;
  return list[Math.floor(Math.random() * list.length)];
}

function moveNoButton() {
  const stage = document.getElementById("stage");
  const noBtn = document.getElementById("noBtn");

  const stageRect = stage.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  const maxX = stageRect.width - btnRect.width;
  const maxY = stageRect.height - btnRect.height;

  const x = Math.max(0, Math.random() * maxX);
  const y = Math.max(0, Math.random() * maxY);

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
  noBtn.style.transform = "none";

  dodgeCount++;
  document.getElementById("message").textContent =
    randomDodgeMessage() + " (" + dodgeCount + ")";
}

function spawnHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.textContent = "❤";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 3 + "s";
  heart.style.fontSize = 14 + Math.random() * 16 + "px";
  document.getElementById("hearts").appendChild(heart);
  setTimeout(() => heart.remove(), 8000);
}

function handleYes() {
  const stage = document.getElementById("stage");
  document.getElementById("message").textContent = "";
  stage.innerHTML = "";

  const yay = document.createElement("h2");
  yay.className = "success";
  yay.style.color = config.theme.accentColor;
  yay.textContent = config.yesMessage;
  stage.appendChild(yay);

  setInterval(spawnHeart, 250);
}

function init() {
  loadConfig().then(() => {
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");

    noBtn.addEventListener("mouseenter", moveNoButton);
    noBtn.addEventListener("click", (e) => {
      e.preventDefault();
      moveNoButton();
    });
    noBtn.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        moveNoButton();
      },
      { passive: false }
    );

    yesBtn.addEventListener("click", handleYes);
  });
}

init();
