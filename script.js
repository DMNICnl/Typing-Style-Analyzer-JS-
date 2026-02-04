let sessionActive = false;
let startTime = null;
let endTime = null;
let backspaceCount = 0;
let keystrokes = [];

let typingArea = document.querySelector("#typingArea");
let allStats = document.querySelectorAll(".stats");
// buttons
const startBtn = document.querySelector("#startBtn");
const resetBtn = document.querySelector("#resetBtn");

typingArea.addEventListener("keydown", function (event) {
  if (sessionActive === false) {
    return;
  } else{

      let keyObject = { key: event.key, time: Date.now(), type: event.code };
      console.log(event.key);
      console.log(event.code);
      keystrokes.push(keyObject);      
      if ((keyObject.key === "Backspace")) {
        backspaceCount++;
        console.log(backspaceCount);
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
  allStats.forEach((stat) => {
    stat.textContent = "";
  });
  endTime = Date.now();
  sessionActive = false;
  startTime = null;
  backspaceCount = 0;
});

function getDurationSeconds(){
    
}