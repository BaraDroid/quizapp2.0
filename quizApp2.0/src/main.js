import './style.css'
import { quizQuestions } from './questions.js'
import { stats } from './questions.js'
import JSConfetti from 'js-confetti';
const jsConfetti = new JSConfetti();

let questionsCounter = 0;
let timerRunning = false;
let quizRunning = false;
let responseTimes = [];
let timeTrackingIntervalId;
export let badAnswerCounter = 0;
export let goodAnswerCounter = 0;

document.addEventListener("DOMContentLoaded", renderQuestion);

function renderQuestion() {
  const questionIndex = questionsCounter;
  if (questionsCounter <= quizQuestions.length - 1) {
    quizRunning = true;
    getQuizCardTemplate(questionIndex);
    startTimeTracking();
    questionsCounter++;
  } else {
    quizRunning = false;
    renderFinalTab();
    setCountersBack();
  }
}

function getQuizCardTemplate(index) {
  const wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = "";
  const cardTab = document.createElement("div");
  cardTab.className = "quiz_tab";
  cardTab.id = quizQuestions[index].questionId;
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title_container");
  const title = document.createElement("h1");
  title.textContent = "Quiz";
  const timerDiv = document.createElement("div");
  timerDiv.id = 'timer';
  const timerSpan = document.createElement("span");
  timerSpan.id = 'timerText';
  const timerImage = document.createElement("img");
  timerImage.setAttribute("src", "timer_icone.png");
  timerImage.classList.add("timer_image");
  const questionTitle = document.createElement("h2");
  questionTitle.id = "question";
  questionTitle.innerHTML = quizQuestions[index].questionName;

  const answers = document.createElement("div");
  answers.classList.add("answer_container");
  const answerToShuffle = shuffleAnswers(quizQuestions[index].answers);
  createAnswerButtons(answerToShuffle, cardTab.id, answers);

  const btnBar = document.createElement("div");
  btnBar.classList.add("button_bar");
  const solveBtn = document.createElement("button");
  solveBtn.className = "action_button";
  solveBtn.textContent = "Lösen";
  solveBtn.addEventListener("click", () => {showSolution(cardTab.id)});

  const nextBtn = document.createElement("button");
  nextBtn.className = "action_button";
  nextBtn.textContent = "Weiter";
  nextBtn.addEventListener('click', () => {renderQuestion()});

  wrapper.appendChild(cardTab);
  cardTab.appendChild(titleContainer);
  titleContainer.appendChild(title);
  titleContainer.appendChild(timerDiv);
  timerDiv.appendChild(timerImage);
  timerDiv.appendChild(timerSpan);
  cardTab.appendChild(questionTitle);
  cardTab.appendChild(answers);
  cardTab.appendChild(btnBar);
  btnBar.appendChild(solveBtn);
  btnBar.appendChild(nextBtn);
}

function validateAnswer(questionId, replyId) {
  const currentQuestion = quizQuestions[questionId - 1];
  const correctAnswer = currentQuestion.answers.find((answer) => {
  return answer.correct;
  });
  if (correctAnswer.answerId === replyId) {
    getGoodAnswerStyle(replyId);
    stopTimeTracking();
  } else {
    getBadAnswerStyle(replyId);
  }
}

function showSolution(questionId) {
    stopTimeTracking();
    const currentQuestion = quizQuestions[questionId - 1];
    const correctAnswer = currentQuestion.answers.find((answer) => {
    return answer.correct;
  });
  document.getElementById(correctAnswer.answerId).classList.add("correct");
}

function shuffleAnswers(array) {
  let shuffledAnswers = [];
  let usedIndexes = [];
  let i = 0;
  while(i < array.length) {
    let randomIndex = Math.floor(Math.random() * array.length);
    if(!usedIndexes.includes(randomIndex)) {
      shuffledAnswers.push(array[randomIndex]);
      usedIndexes.push(randomIndex);
      i++
    }
  }
  return shuffledAnswers;
}

function startTimeTracking() {
  clearInterval(timeTrackingIntervalId);
  timerRunning = true;
  const startTime = Date.now();
  timeTrackingIntervalId = setInterval(function () {
    if(timerRunning && quizRunning) {
      let elapsedTime = Date.now() - startTime;
      document.getElementById("timerText").textContent = (elapsedTime / 1000).toFixed(1);
    }
  }, 100);
}

function stopTimeTracking() {
  timerRunning = false;
  const timeValue = document.getElementById("timer").textContent;
  responseTimes.push(Number(timeValue));
}

function renderFinalTab() {
  const wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = "";
  const cardTab = document.createElement("div");
  cardTab.className = "quiz_tab";
  const titleContainer = document.createElement("div");
  titleContainer.classList.add("title_container");
  const title = document.createElement("h1");
  title.textContent = "Quiz";
  const questionTitle = document.createElement("h2");
  questionTitle.id = "statistikTitle";
  questionTitle.textContent = "Deine Statistik: ";

  const myData = document.createElement("div");
  myData.classList.add("stats");
  createDataBubbles(myData);

  const btnBar = document.createElement("div");
  btnBar.classList.add("button_bar");
  const playAgainBtn = document.createElement("button");
  playAgainBtn.className = "action_button";
  playAgainBtn.id = 'playAgain';
  playAgainBtn.textContent = "Nochmal spielen";
  playAgainBtn.addEventListener('click', () => {renderQuestion()});

  wrapper.appendChild(cardTab);
  cardTab.appendChild(titleContainer);
  titleContainer.appendChild(title);
  cardTab.appendChild(questionTitle);
  cardTab.appendChild(myData);
  cardTab.appendChild(btnBar);
  btnBar.appendChild(playAgainBtn);
}

function createDataBubbles(parent) {
    const dataBubbles = stats.forEach((item, index) => {
    let dataBubble;
    dataBubble = document.createElement("div");
    dataBubble.classList.add("one_answer");
    dataBubble.classList.add("my_data");
    const statsTitle = document.createElement("span");
    statsTitle.textContent = stats[index].title;
    const statsSum = document.createElement("span");
    statsSum.textContent = stats[index].data();
    parent.appendChild(dataBubble);
    dataBubble.appendChild(statsTitle);
    dataBubble.appendChild(statsSum);
    decreaseFont(item, statsSum);
  });
}

function decreaseFont(element, sum) {
      if (element.title === "Durchschnittliche Antwortdauer:" && getAverageTime() === "Keine Frage beantwortet.") {
      sum.id = "specialFontStyle";
    }
}

export function getAverageTime() {
  if(responseTimes.length >0) {
    let timeSum = responseTimes.reduce((sum, num) => {
    return sum + num;
  });
  let averageTime = timeSum / responseTimes.length;
  return averageTime.toFixed(2);
  }
  else {
    return "Keine Frage beantwortet.";
  }
}

function setCountersBack() {
    questionsCounter = 0;
    badAnswerCounter = 0;
    goodAnswerCounter = 0;
    responseTimes = [];
}

function createAnswerButtons(givenAnswers, cardId, divElement) {
    givenAnswers.forEach((oneAnswer) => {
    const answerBtn = document.createElement("button");
    answerBtn.classList.add("one_answer");
    answerBtn.innerHTML = oneAnswer.answerContent;
    answerBtn.id = oneAnswer.answerId;
    answerBtn.addEventListener("click", () => {validateAnswer(cardId, oneAnswer.answerId)});
    divElement.appendChild(answerBtn);
  });
}

function getGoodAnswerStyle(idOfReply) {
    goodAnswerCounter++;
    document.getElementById(idOfReply).classList.add("correct");
    jsConfetti.addConfetti({confettiColors: [
    '#FF8A5B', '#FFD262', '#7ED957', '#75C7FF', '#B679FF', '#FF99C2',
  ], confettiRadius: 4,});
}

function getBadAnswerStyle(idOfReply) {
  const answerBtn = document.getElementById(idOfReply);
  badAnswerCounter++;
  answerBtn.classList.add("shake");
  answerBtn.classList.add("incorrect");
  setTimeout(() => {
    answerBtn.classList.remove("incorrect");
    answerBtn.classList.remove("shake");
  }, 850);
}
