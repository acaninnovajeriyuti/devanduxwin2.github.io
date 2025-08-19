const output = document.getElementById("output");
const mainButtons = document.getElementById("main-buttons");
const inputGroup = document.getElementById("text-input");
const abButtons = document.getElementById("choice-buttons");
const btnA = document.getElementById("btn-a");
const btnB = document.getElementById("btn-b");
const exitButton = document.getElementById("exit-button");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const livesContainer = document.getElementById("lives");

let stage = "main";
let currentQuestion = null;
let completed = resetCompleted();
let lives = 3;

// Reset all questions to "not completed"
function resetCompleted() {
  return {
    quest1: false,
    quest2: false,
    quest3: false,
    quest4: false,
    quest5: false,
    quest6: false,
    quest7: false,
    quest8: false
  };
}

function print(text) {
  output.textContent = text;
}

function show(el, visible = true) {
  el.style.display = visible ? "flex" : "none";
}

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

  const allDone = count === total;
  show(exitButton, allDone);
  renderLives();
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

function correctAnswer(key) {
  completed[key] = true;
  print("✅ Correct! Returning to main menu...");
  updateProgress();
  resetMenu();
}

// Main menu selection
function selectOption(opt) {
  stage = opt;
  show(mainButtons, false);

  if (opt === "1") {
    print("Choose your focus: 1. Pre-Hispanic  2. Car");
    mainButtons.innerHTML = `
      <button onclick="quest1()">1</button>
      <button onclick="quest2()">2</button>
    `;
    show(mainButtons, true);

  } else if (opt === "2") {
    print("Choose your focus: 1. Internet  2. First Phone  3. iPhone");
    mainButtons.innerHTML = `
      <button onclick="quest3()">1</button>
      <button onclick="quest4()">2</button>
      <button onclick="quest5()">3</button>
    `;
    show(mainButtons, true);

  } else if (opt === "3") {
    print("Choose your focus: 1. Android  2. 4G  3. AI");
    mainButtons.innerHTML = `
      <button onclick="quest6()">1</button>
      <button onclick="quest7()">2</button>
      <button onclick="quest8()">3</button>
    `;
    show(mainButtons, true);
  }
}

// === Quests ===
function quest1() {
  if (completed.quest1) return print("✔ Already solved.");
  currentQuestion = { key: "quest1", a: "Stone, Bone and Wood", b: "Iron, Copper and Diamond", correct: "a" };
  askAB("What materials did they use to create their tools?");
}

function quest2() {
  if (completed.quest2) return print("✔ Already solved.");
  currentQuestion = { key: "quest2" };
  print("Who developed the first commercial car? (Hint: Ford?)");
  show(inputGroup, true);
}

function quest3() {
  if (completed.quest3) return print("✔ Already solved.");
  currentQuestion = { key: "quest3", a: "TCP/IP", b: "P2P", correct: "a" };
  askAB("What protocol gave birth to the internet?");
}

function quest4() {
  if (completed.quest4) return print("✔ Already solved.");
  currentQuestion = { key: "quest4" };
  print("📡 What company created the first commercial phone?");
  show(inputGroup, true);
}

function quest5() {
  if (completed.quest5) return print("✔ Already solved.");
  currentQuestion = { key: "quest5", a: "Take photos", b: "Touch screen", correct: "b" };
  askAB("📱 What was the iPhone's game-changing feature?");
}

function quest6() {
  if (completed.quest6) return print("✔ Already solved.");
  currentQuestion = { key: "quest6", a: "HTC Dream", b: "Google Nexus", correct: "a" };
  askAB("🤖 What was the first Android phone?");
}

function quest7() {
  if (completed.quest7) return print("✔ Already solved.");
  currentQuestion = { key: "quest7", a: "3G", b: "WiMax", correct: "a" };
  askAB("📶 Which technology directly preceded 4G?");
}

function quest8() {
  if (completed.quest8) return print("✔ Already solved.");
  currentQuestion = { key: "quest8", a: "ChatGPT", b: "Gemini", correct: "a" };
  askAB("🧠 What is the most famous AI today?");
}

// Ask A/B with randomized positions
function askAB(question) {
  const options = Math.random() < 0.5
    ? { a: currentQuestion.a, b: currentQuestion.b }
    : { a: currentQuestion.b, b: currentQuestion.a, flipped: true };

  currentQuestion.mapping = options;
  print(question);
  btnA.textContent = `A: ${options.a}`;
  btnB.textContent = `B: ${options.b}`;
  show(abButtons, true);
}

// Handle A/B choice
function handleABChoice(choice) {
  show(abButtons, false);
  let picked = currentQuestion.mapping[choice];
  let isCorrect = picked === currentQuestion[currentQuestion.correct];
  isCorrect ? correctAnswer(currentQuestion.key) : wrongAnswer();
}

// Handle text input
function submitText() {
  let val = document.getElementById("input").value.trim().toLowerCase();
  show(inputGroup, false);

  if (currentQuestion.key === "quest2") {
    val === "henry ford" ? correctAnswer("quest2") : wrongAnswer();
  } else if (currentQuestion.key === "quest4") {
    val === "motorola" ? correctAnswer("quest4") : wrongAnswer();
  }
  document.getElementById("input").value = "";
}

function resetMenu() {
  stage = "main";
  mainButtons.innerHTML = `
    <button onclick="selectOption('1')">1. Pre-Hispanic → Car</button>
    <button onclick="selectOption('2')">2. Internet → iPhone</button>
    <button onclick="selectOption('3')">3. Android → AI</button>
  `;
  show(mainButtons, true);
  show(inputGroup, false);
  show(abButtons, false);

  const allDone = Object.values(completed).every(v => v);
  show(exitButton, allDone);
}

function exitGame() {
  print("🚪 Farewell, traveler... The code is: a336903*2gcx!¿?");
}

// Init
renderLives();
updateProgress();
resetMenu();
