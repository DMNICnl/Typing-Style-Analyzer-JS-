let sessionActive = false;
let startTime = null;
let endTime = null;
let backspaceCount = 0;
let keystrokes = [];

let typingArea = document.querySelector("#typingArea");

let allStats = document.querySelectorAll(".stats");
let statWpm = document.querySelector("#wpm");
let accuracy = document.querySelector("#accuracy");
let errors = document.querySelector("#errors");
let backspaces = document.querySelector("#backspaces");
let pauseAvg = document.querySelector("#pauseAvg");

let targetText = document.querySelector("#targetText");
let targetTextLength = targetText.textContent.trim().replace(/\s+/g, " ");
// buttons
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");

typingArea.addEventListener("input", ()=>{
  if (!sessionActive) {
    return
  }
  updateStats()
})

typingArea.addEventListener("keydown", function (event) {
  if (sessionActive === false) {
    return;
  } else {
    let keyObject = { key: event.key, time: Date.now(), type: event.type };
    console.log(event.key);
    console.log(event.code);
    keystrokes.push(keyObject);
    if (keyObject.key === "Backspace") {
      backspaceCount++;
      backspaces.textContent = `Backspaces: ${backspaceCount}`;
    }
  }
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
  typingArea.value = "";
});

function getDurationSeconds() {
  let duration = (Date.now() - startTime) / 1000;
  console.log(duration);

  return duration;
}

function calculateWPM(text, seconds) {
  let words = text.trim().split(/\s+/).length;
  let minutes = seconds / 60;
  let wpm = Math.floor(words / minutes);
  if (seconds <= 0 || minutes <= 0) {
    return 0;
  }
  statWpm.textContent = `WPM: ${wpm}`;
  return wpm;
}

function calculateErrors(typedText, targetTextLength) {
  let calcErrors = 0;
  const minLen = Math.min(typedText.length, targetTextLength.length);
  for (let i = 0; i < minLen; i++) {
    const stroke = typedText[i];
    if (stroke !== targetTextLength[i]) {
      console.log("wrong letter");
      calcErrors++;
    }
  }
  if (typedText.length > targetTextLength.length) {
    calcErrors += Math.abs(typedText.length - targetTextLength.length);
  }
  errors.textContent = `Error: ${calcErrors}`;
  return calcErrors;
}

function calculateAccuracy(errors, typedLength) {
  let calcedAccuracy = 0;
  if (typedLength <= 0) {
    calcedAccuracy = 0;
    accuracy.textContent = `Accuracy: ${calcedAccuracy}`;
    return 0;
  }
  calcedAccuracy = Math.floor((1 - errors / typedLength) * 100);
  accuracy.textContent = `Accuracy: ${calcedAccuracy}`;
  return calcedAccuracy;
}

function calculateAveragePause(keystrokes) {
  let pauseAvgVal = 0;
  if (keystrokes.length < 2) {
      pauseAvg.textContent = `PauseAvg: 0 ms`;
    return 0;
  }
  let sum = 0;
  for (let i = 1; i < keystrokes.length; i++) {
    sum += keystrokes[i].time - keystrokes[i - 1].time;
  }
  pauseAvgVal = Math.round(sum / (keystrokes.length - 1));
  pauseAvg.textContent = `PauseAvg: ${pauseAvgVal} ms`;
  return pauseAvgVal;
}

function updateStats() {
let typeValue = typingArea.value.replace(/\s+/g, " ");

  let totalDuration = getDurationSeconds();
  calculateWPM(typeValue, totalDuration);
  let calculatedErrors = calculateErrors(typeValue, targetTextLength);
  calculateAccuracy(calculatedErrors, typeValue.length);
  calculateAveragePause(keystrokes);
}
