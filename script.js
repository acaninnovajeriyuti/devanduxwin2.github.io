const output = document.getElementById("output");
const input = document.getElementById("input");
const progressText = document.getElementById("progress-text");
const progressBar = document.getElementById("progress-bar");
const mainButtons = document.getElementById("main-buttons");
const inputGroup = document.getElementById("text-input");
const abButtons = document.getElementById("choice-buttons");
const exitButton = document.getElementById("exit-button");

let stage = "main";
let randomized = {};
let completed = resetCompleted();

function resetCompleted() {
  return {
    ancient1: false,
    ancient2: false,
    digital1: false,
    digital2: false,
    digital3: false,
    modern1: false,
    modern2: false,
    modern3: false
  };
}

function print(text) {
  output.innerHTML = text;
}

function show(element, show = true) {
  element.style.display = show ? "flex" : "none";
}

function updateProgress() {
  const total = Object.keys(completed).length;
  const count = Object.values(completed).filter(v => v).length;
  progressText.textContent = `Progress: ${count} / ${total}`;
  progressBar.style.width = `${(count / total) * 100}%`;

  // Exit button unlocks when all questions are done
  const allDone = (count === total);
  show(exitButton, allDone);
}

function selectOption(choice) {
  stage = { "1": "ancient", "2": "digital", "3": "modern" }[choice];
  show(mainButtons, false);
  show(inputGroup, true);

  if (stage === "ancient") {
    print("Choose your quest:\n1. Pre-Hispanic\n2. Car");
  } else if (stage === "digital") {
    print("Choose your challenge:\n1. Internet\n2. First Phone\n3. iPhone");
  } else if (stage === "modern") {
    print("Select a timeline:\n1. Android\n2. 4G\n3. AI");
  }
}

function submitText() {
  const choice = input.value.trim().toLowerCase();
  input.value = "";
  handleInput(choice);
}

function handleInput(choice) {
  show(inputGroup, false);

  if (stage === "ancient") {
    if (choice === "1") {
      stage = "ancient1";
      shuffleAB("What materials did they use to create tools?", "Stone, Bone and Wood", "Iron, Copper and Diamond", "a");
    } else if (choice === "2") {
      stage = "ancient2";
      print("Who developed the first commercial car?");
      show(inputGroup, true);
    } else wrongAnswer();
  } else if (stage === "ancient2") {
    if (choice === "henry ford") correctAnswerGiven("ancient2");
    else wrongAnswer();
  } else if (stage === "digital") {
    if (choice === "1") {
      stage = "digital1";
      shuffleAB("What protocol gave birth to the internet?", "TCP/IP", "P2P", "a");
    } else if (choice === "2") {
      stage = "digital2";
      print("📡 What company created the first commercial phone?");
      show(inputGroup, true);
    } else if (choice === "3") {
      stage = "digital3";
      shuffleAB("📱 iPhone's game-changing feature?", "Touch screen", "Take photos", "a");
    } else wrongAnswer();
  } else if (stage === "digital2") {
    if (choice === "motorola") correctAnswerGiven("digital2");
    else wrongAnswer();
  } else if (stage === "modern") {
    if (choice === "1") {
      stage = "modern1";
      shuffleAB("🤖 First Android phone?", "HTC Dream", "Google Nexus", "a");
    } else if (choice === "2") {
      stage = "modern2";
      shuffleAB("Which technology introduced high-speed mobile internet before 4G?", "3G (UMTS/HSPA)", "EDGE (2.75G)", "a");
    } else if (choice === "3") {
      stage = "modern3";
      shuffleAB("🧠 Most famous AI today?", "ChatGPT", "Gemini", "a");
    } else wrongAnswer();
  }
}

function shuffleAB(question, optA, optB, correct) {
  let flip = Math.random() < 0.5;
  randomized = flip
    ? { a: optA, b: optB, correct: correct }
    : { a: optB, b: optA, correct: (correct === "a" ? "b" : "a") };

  document.getElementById("btn-a").textContent = "a. " + randomized.a;
  document.getElementById("btn-b").textContent = "b. " + randomized.b;
  print(question);
  show(abButtons);
}

function handleABChoice(choice) {
  if (choice === randomized.correct) {
    correctAnswerGiven(stage);
  } else wrongAnswer();
}

function correctAnswerGiven(key) {
  if (completed[key]) {
    print("✅ Already solved! Returning...");
  } else {
    print("✅ Correct! Returning...");
    completed[key] = true;
    updateProgress();
  }
  resetMenu();
}

function wrongAnswer() {
  print("💀 Wrong answer! Restarting game...");
  completed = resetCompleted();
  updateProgress();
  resetMenu();
}

function resetMenu() {
  stage = "main";
  show(mainButtons);
  show(abButtons, false);
  show(inputGroup, false);

  // Ensure exit stays visible if already unlocked
  updateProgress();
}

function exitGame() {
  print("🚪 Farewell, traveler...<br>🔐 Secret code: <strong>USE NOW THE CARDS¿?</strong><br>May your journey be filled with wisdom...");
}
