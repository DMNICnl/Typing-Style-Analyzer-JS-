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
      backspaces.textContent = `Backspaces: ${backspaceCount}`
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
  let time = Date.now() - startTime;
  return time;
}

function calculateWPM(text, seconds) {
  let words = text.trim().split(/\s+/).length;
  let minutes = seconds / 60;
  let wpm = words / minutes;
  statWpm.textContent = `PauseAvg: ${Math.floor(wpm)}`
  return Math.floor(wpm);
}

function calculateErrors(typedText, targetText) {
  for (let i = 0; i < keystrokes.length; i++) {
    const stroke = keystrokes[i];
    if (typedText.length > targetText.length) {
      return;
    }
  }
}
