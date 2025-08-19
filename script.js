function updateProgress() {
  const total = Object.keys(completed).length;
  const count = Object.values(completed).filter(v => v).length;
  progressText.textContent = `Progress: ${count} / ${total}`;
  progressBar.style.width = `${(count / total) * 100}%`;

  // Exit button will be shown only if all questions are done
  if (count === total) {
    show(exitButton, true);
  } else {
    show(exitButton, false);
  }
}

function resetMenu() {
  stage = "main";
  show(mainButtons);
  show(abButtons, false);
  show(inputGroup, false);

  // 🔥 FIX: keep exit button visible if all completed
  const allDone = Object.values(completed).every(v => v);
  show(exitButton, allDone);
}
