const quotes = [
  "寿司",
  "マグロ",
  "サーモン",
  "エビ",
  "イカ",
  "ヤマシタ",
  "ツインターボ",
  "マッキー",
  "ニシカワ",
  "ヤマダ"
];


let currentQuoteIndex = 0;
let score = 0;
let timer;
let timeRemaining;


const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");


inputElement.addEventListener("input", checkInput);


function startGame() {
  currentQuoteIndex = 0;
  score = 0;
  timeRemaining = 60;
  inputElement.value = "";
  scoreElement.textContent = "スコア: 0";
  timerElement.textContent = "残り時間: 60秒";
  inputElement.focus();
  showNextQuote();
  startTimer();
}


function showNextQuote() {
  if (currentQuoteIndex >= quotes.length) {
    endGame();
    return;
  }


  quoteElement.textContent = quotes[currentQuoteIndex];
}


function checkInput() {
  const typedText = inputElement.value.trim();
  const currentQuote = quotes[currentQuoteIndex];


  if (typedText === currentQuote) {
    inputElement.classList.remove("incorrect");
    inputElement.classList.add("correct");
    score++;
    scoreElement.textContent = `スコア: ${score}`;
    currentQuoteIndex++;
    inputElement.value = "";
    showNextQuote();
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
  timerElement.textContent = `残り時間: ${timeRemaining}秒`;


  if (timeRemaining <= 0) {
    endGame();
  }
}


function endGame() {
  clearInterval(timer);
  inputElement.disabled = true;


  alert(`ゲーム終了！\nスコア: ${score}`);


  inputElement.disabled = false;
  startGame();
}


startGame();