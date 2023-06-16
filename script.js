const sushiNames = [
  "寿司",
  "桃",
  "みつばち",
  "たまご",
  "卵焼き",
  "目玉焼き",
  "ゆで卵",
  "炒め卵",
  "オムレツ",
  "豆腐",
];

let currentSushiIndex = 0;
let score = 0;
let timer;
let timeRemaining;

const sushiElement = document.getElementById("sushi");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");

inputElement.addEventListener("input", checkInput);

function startGame() {
  currentSushiIndex = 0;
  score = 0;
  timeRemaining = 60;
  inputElement.value = "";
  scoreElement.textContent = "0";
  inputElement.disabled = false;
  inputElement.focus();
  progressElement.textContent = "";
  startTimer();
  document.getElementById("start-button").disabled = true;
  showNextSushi();
  progressElement.textContent = "";
}

function showNextSushi() {
  if (currentSushiIndex >= sushiNames.length) {
    endGame();
    return;
  }

  const currentSushi = sushiNames[currentSushiIndex];
  const hiraganaCurrentSushi = convertToHiragana(currentSushi);
  sushiElement.textContent = hiraganaCurrentSushi;
}

function checkInput() {
  const typedText = inputElement.value.trim();
  const currentSushi = sushiNames[currentSushiIndex];

  const hiraganaCurrentSushi = convertToHiragana(currentSushi);
  const hiraganaTypedText = convertToHiragana(typedText);

  if (hiraganaTypedText === hiraganaCurrentSushi) {
    inputElement.classList.remove("incorrect");
    inputElement.classList.add("correct");
    score++;
    scoreElement.textContent = score;
    currentSushiIndex++;
    inputElement.value = "";
    showNextSushi();
  } else {
    inputElement.classList.remove("correct");
    inputElement.classList.add("incorrect");
  }

  progressElement.textContent = typedText + "  (" + hiraganaTypedText + ")";
}

function startTimer() {
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeRemaining--;
  document.getElementById("timer").textContent = `残り時間: ${timeRemaining}秒`;

  if (timeRemaining <= 0) {
    endGame();
  }
}

function endGame() {
  clearInterval(timer);
  inputElement.disabled = true;
  document.getElementById("start-button").disabled = false;

  alert(`ゲーム終了！\nスコア: ${score}`);
}

function convertToHiragana(text) {
  const katakanaToHiragana = (char) => {
    const katakanaStart = 0x30a1;
    const hiraganaStart = 0x3041;
    const katakanaEnd = 0x30f6;
    const charCode = char.charCodeAt(0);
    if (charCode >= katakanaStart && charCode <= katakanaEnd) {
      return String.fromCharCode(charCode - (katakanaStart - hiraganaStart));
    }
    return char;
  };

  const kanjiToHiragana = (char) => {
    const kanjiStart = 0x4e00;
    const kanjiEnd = 0x9fff;
    const hiraganaStart = 0x3041;
    const charCode = char.charCodeAt(0);
    if (charCode >= kanjiStart && charCode <= kanjiEnd) {
      return String.fromCharCode(charCode + (hiraganaStart - kanjiStart));
    }
    return char;
  };

  return text
    .split("")
    .map((char) => katakanaToHiragana(kanjiToHiragana(char)))
    .join("");
}

window.onload = function () {
  document.getElementById("start-button").disabled = false;
};
