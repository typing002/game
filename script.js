const sushiNames = [
  "たいむあい",
  "桃",
  "みつばち",
  "たまご",
  "卵焼き",
  "目玉焼き",
  "ゆで卵",
  "炒め卵",
  "オムレツ",
  "豆腐",
  // 以下、全ての寿司名を追加
  // ...
  "うな丼"
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
  showNextSushi();
  startTimer();
  document.getElementById("start-button").disabled = true;
  // 寿司の名前を表示するための関数を呼び出す
  showNextSushi();
}

function showNextSushi() {
  if (currentSushiIndex >= sushiNames.length) {
    endGame();
    return;
  }

  sushiElement.textContent = sushiNames[currentSushiIndex];
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
  return text.replace(/[\u30a1-\u30f6]/g, function(match) {
    const charCode = match.charCodeAt(0) - 0x60;
    return String.fromCharCode(charCode);
  }).replace(/[\u4e00-\u9fff]/g, function(match) {
    return String.fromCharCode(match.charCodeAt(0) + 0x60);
  });
}

window.onload = function() {
  document.getElementById("start-button").disabled = false;
};
