const livesContainer = document.getElementById("lives");
let lives = 3;

// render lives as hearts
function renderLives() {
  let hearts = "";
  for (let i = 0; i < 3; i++) {
    hearts += i < lives ? "❤️ " : "🤍 ";
  }
  livesContainer.textContent = hearts.trim();
}

function updateProgress() {
  const total = Object.keys(completed).length;
  const count = Object.values(completed).filter(v => v).length;
  progressText.textContent = `Progress: ${count} / ${total}`;
  progressBar.style.width = `${(count / total) * 100}%`;

  const allDone = (count === total);
  show(exitButton, allDone);

  renderLives(); // update hearts row
}

function wrongAnswer() {
  lives--;
  if (lives > 0) {
    print(`⚠️ Wrong answer! You have ${lives} lives left.`);
  } else {
    print("💀 You've lost all lives! Restarting game...");
    completed = resetCompleted();
    lives = 3;
  }
  updateProgress();
  resetMenu();
}

// Init
renderLives();
updateProgress();
