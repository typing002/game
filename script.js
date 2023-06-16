const sushiNames = [
  "寿司",
  "マグロ",
  "サーモン",
  "エビ",
  "イカ",
  "タコ",
  "ユニ",
  "アナゴ",
  "ハマチ",
  "サバ"
  "キッズ"
  "障害"
  "ゆうと"
  "タイムアイ"
];

let currentSushiIndex = 0;
let score = 0;
let timer;
let timeRemaining;

const sushiElement = document.getElementById("sushi");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");

inputElement.addEventListener("input", checkInput);

function startGame() {
  currentSushiIndex = 0;
  score = 0;
  timeRemaining = 60;
  inputElement.value = "";
  scoreElement.textContent = "0";
  inputElement.disabled = false;
  inputElement.focus();
  showNextSushi();
  startTimer();
  document.getElementById("start-button").disabled = true;
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
  });
}

startGame();
