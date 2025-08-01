const output = document.getElementById("output");
const input = document.getElementById("input");
const mainButtons = document.getElementById("main-buttons");
const inputGroup = document.getElementById("text-input");
const abButtons = document.getElementById("choice-buttons");
const exitButton = document.getElementById("exit-button");

let stage = "main";
let correctAnswer = "";
let randomized = {};
let completed = {
  ancient1: false,
  ancient2: false,
  digital1: false,
  digital2: false,
  digital3: false,
  modern1: false,
  modern2: false,
  modern3: false
};

function print(text) {
  output.textContent += `\n${text}`;
  output.scrollTop = output.scrollHeight;
}

function show(element, show = true) {
  element.style.display = show ? "flex" : "none";
}

function selectOption(choice) {
  stage = { "1": "ancient", "2": "digital", "3": "modern" }[choice];
  show(mainButtons, false);
  show(inputGroup, true);
  if (stage === "ancient") {
    print("\nChoose your quest:\n1. Pre-Hispanic\n2. Car");
  } else if (stage === "digital") {
    print("\nChoose your challenge:\n1. Internet\n2. First Phone\n3. iPhone");
  } else if (stage === "modern") {
    print("\nSelect a timeline:\n1. Android\n2. 4G\n3. AI");
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
      shuffleAB(
        "What materials did they use to create tools?",
        "Stone, Bone and Wood",
        "Iron, Copper and Diamond",
        "a"
      );
    } else if (choice === "2") {
      stage = "ancient2";
      print("Who developed the first commercial car?");
      show(inputGroup, true);
    }
  } else if (stage === "ancient2") {
    if (choice === "henry ford") {
      print("✅ Correct! Returning...");
      completed.ancient2 = true;
      reset();
    } else {
      print("❌ Wrong. Try again.");
      show(inputGroup, true);
    }
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
    }
  } else if (stage === "digital2") {
    if (choice === "motorola") {
      print("✅ Correct! Returning...");
      completed.digital2 = true;
      reset();
    } else {
      print("❌ Try again.");
      show(inputGroup, true);
    }
  } else if (stage === "modern") {
    if (choice === "1") {
      stage = "modern1";
      shuffleAB("🤖 First Android phone?", "HTC Dream", "Google Nexus", "a");
    } else if (choice === "2") {
      stage = "modern2";
      shuffleAB("What came before 4G?", "3G", "2G", "a");
    } else if (choice === "3") {
      stage = "modern3";
      shuffleAB("🧠 Most famous AI today?", "ChatGPT", "Gemini", "a");
    }
  }

  checkCompletion();
}

function shuffleAB(question, optA, optB, correct) {
  let flip = Math.random() < 0.5;
  randomized = flip
    ? { a: optA, b: optB, correct: correct }
    : { a: optB, b: optA, correct: correct === "a" ? "b" : "a" };

  document.getElementById("btn-a").textContent = "a. " + randomized.a;
  document.getElementById("btn-b").textContent = "b. " + randomized.b;
  print(`\n${question}`);
  show(abButtons);
}

function handleABChoice(choice) {
  if (choice === randomized.correct) {
    print("✅ Correct!");
    completed[stage] = true;
    reset();
  } else {
    print("❌ Wrong. Try again.");
  }
  checkCompletion();
}

function reset() {
  stage = "main";
  show(mainButtons);
  show(abButtons, false);
  show(inputGroup, false);
}

function checkCompletion() {
  if (Object.values(completed).every(v => v)) {
    show(exitButton);
  }
}

function exitGame() {
  print("\n🚪 Farewell, traveler...");
  print("🔐 Secret code: a336903*2gcx!¿?");
  print("May your journey be filled with wisdom...");
}
