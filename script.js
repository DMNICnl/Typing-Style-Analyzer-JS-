let sessionActive = false;
let startTime = null;
let endTime = null;
let backspaceCount = 0;
let keystrokes = [];

let typingArea = document.querySelector("#typingArea");
  let typeValue = typingArea.value;

let allStats = document.querySelectorAll(".stats");
let statWpm = document.querySelector("#wpm");
let accuracy = document.querySelector("#accuracy");
let errors = document.querySelector("#errors");
let backspaces = document.querySelector("#backspaces");
let pauseAvg = document.querySelector("#pauseAvg");

let targetText = document.querySelector("#targetText");
let targetTextLength = targetText.value;
// buttons
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");

typingArea.addEventListener("keydown", function (event) {
  if (sessionActive === false) {
    return;
  } else {
    let keyObject = { key: event.key, time: Date.now(), type: event.code };
    console.log(event.key);
    console.log(event.code);
    keystrokes.push(keyObject);
    if (keyObject.key === "Backspace") {
      backspaceCount++;
      backspaces.textContent = `Backspaces: ${backspaceCount}`;
    }
  }
  updateStats();
});
console.log(keystrokes);

startBtn.addEventListener("click", () => {
  sessionActive = true;
  startTime = Date.now();
  endTime = null;
  typingArea.value = "";
  keystrokes = [];
  backspaceCount = 0;
  getDurationSeconds();
});

resetBtn.addEventListener("click", () => {
  endTime = Date.now();
  sessionActive = false;
  startTime = null;
  backspaceCount = 0;
  statWpm.textContent = `WPM: 0`;
  accuracy.textContent = `Accuracy: 0`;
  errors.textContent = `Error: 0`;
  backspaces.textContent = `Backspaces: 0`;
  pauseAvg.textContent = `PauseAvg: 0`;
});

function getDurationSeconds() {
  let duration = Date.now() - startTime;
  console.log(duration);

  return duration;
}

function calculateWPM(text, seconds) {
  let words = text.trim().split(/\s+/).length;
  let minutes = seconds / 60;
  let wpm = words / minutes;
  statWpm.textContent = `WPM: ${Math.floor(wpm)}`;
  return Math.floor(wpm);
}

function calculateErrors(typedText, targetTextLength) {
  let calcErrors = 0;
  for (let i = 0; i < keystrokes.length; i++) {
    const stroke = keystrokes[i];
    for (let a = 0; a < targetTextLength.length; a++) {
      const element = targetTextLength[a];
      if (stroke !== element) {
        console.log("wrong letter");
      }
    }
    if (typedText.length > targetTextLength.length) {
      calcErrors = typedText.length - targetTextLength.length;
      errors.textContent = `Error: ${calcErrors}`;
      return;
    }
  }
}

function calculateAccuracy(errors, typedLength) {
  let calcedAccuracy = Math.floor((1 - errors / typedLength) * 100);
  accuracy.textContent = `Accuracy: ${calcedAccuracy}`;
  return calcedAccuracy;
}

function calculateAveragePause(keystrokes) {
  pauseAvg = 0;
  for (let i = 0; i < keystrokes.length; i++) {
    const stroke = keystrokes[i];
    let betwheentime = (stroke.time + stroke.time) / keystrokes.length;
    pauseAvg += betwheentime;
    pauseAvg.textContent = `PauseAvg: ${pauseAvg}`;
    return pauseAvg;
  }
}

function updateStats() {
  let totalDuration = getDurationSeconds();
  calculateWPM(typeValue, totalDuration);
 let calculatedErrors = calculateErrors(typeValue, targetText);
  calculateAccuracy(calculatedErrors, typeValue.length);
  calculateAveragePause(keystrokes);
}
