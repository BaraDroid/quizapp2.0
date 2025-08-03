let questionsCounter = 0; //ten se bude navysovat pri kazdym Durchlaufu
let button = document.getElementById("confettiBtn");
const canvas = document.getElementById('confettiCanvas');
const jsConfetti = new JSConfetti({ canvas })
let timerRunning = false;
let quizRunning = false;
let responseTimes = [];
let timeTrackingIntervalId;
let badAnswerCounter = 0;
let goodAnswerCounter = 0;
console.log("hello from script");

// <div class="quiz_tab" id="questionId">
//     <div class="title_container">
//       <h1>Quiz</h1>
//     </div>
//     <h2 id="question">Wie viele Augen hat ein Mensch?</h2>
//     <div class="answer_container">
//         <button class="one_answer incorrect" id="answerIndex0">Möglichst viele.</button>
//         <button class="one_answer">Nur ein einziges in der Stirnmitte.</button>
//         <button class="one_answer">Zwei.</button>
//         <button class="one_answer correct">Es ist eine Trickfrage, ein Mensch hat keine Augen.</button>
//     </div>
//     <div class="button_bar">
//         <button class="action_button">Lösung</button>
//         <button class="action_button">Weiter</button>
//     </div>
// </div>

document.addEventListener("DOMContentLoaded", renderQuestion);
//document.addEventListener('DOMContentLoaded', renderFinalTab);

function renderQuestion() {
  let questionIndex = questionsCounter;
  if (questionsCounter <= quizQuestions.length - 1) {
    timerRunning = true;
    quizRunning = true;
    startTimeTracking();
    getQuizCardTemplate(questionIndex);
    questionsCounter++;
  } else {
    quizRunning = false;
    questionsCounter = 0;
    renderFinalTab();
    badAnswerCounter = 0;
    goodAnswerCounter = 0;
    responseTimes = [];
  }
}

function getQuizCardTemplate(index) {
  let wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = "";
  let cardTab = document.createElement("div");
  cardTab.className = "quiz_tab";
  cardTab.id = quizQuestions[index].questionId;
  let titleContainer = document.createElement("div");
  titleContainer.classList.add("title_container");
  let title = document.createElement("h1");
  title.textContent = "Quiz";
  let timerDiv = document.createElement("div");
  timerDiv.id = 'timer';
  let timerSpan = document.createElement("span");
  timerSpan.id = 'timerText';
  let timerImage = document.createElement("img");
  timerImage.setAttribute("src", "assets/timer_icone.png");
  timerImage.classList.add("timer_image");
  let questionTitle = document.createElement("h2");
  questionTitle.id = "question";
  questionTitle.innerHTML = quizQuestions[index].questionName;

  let answers = document.createElement("div");
  answers.classList.add("answer_container");

  let answerToShuffle = shuffleAnswers(quizQuestions[index].answers)
  
  answerToShuffle.forEach((oneAnswer) => {
    let answerBtn = document.createElement("button");
    answerBtn.classList.add("one_answer");
    answerBtn.innerHTML = oneAnswer.answerContent;
    answerBtn.id = oneAnswer.answerId;
    answerBtn.setAttribute("onclick", `validateAnswer(${cardTab.id}, '${oneAnswer.answerId}')`);
    answers.appendChild(answerBtn);
  });

  let btnBar = document.createElement("div");
  btnBar.classList.add("button_bar");
  let solveBtn = document.createElement("button");
  solveBtn.className = "action_button";
  solveBtn.textContent = "Lösen";
  solveBtn.setAttribute("onclick",`showSolution(${cardTab.id})`);

  let nextBtn = document.createElement("button");
  nextBtn.className = "action_button";
  nextBtn.textContent = "Weiter";
  nextBtn.setAttribute("onclick", "renderQuestion()");

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
  let currentQuestion = quizQuestions[questionId - 1];
  let correctAnswer = currentQuestion.answers.find((answer) => {
  return answer.correct;
  });
  if (correctAnswer.answerId === replyId) {
    goodAnswerCounter++;
    document.getElementById(replyId).classList.add("correct");
    jsConfetti.addConfetti({confettiColors: [
    '#FF8A5B', '#FFD262', '#7ED957', '#75C7FF', '#B679FF', '#FF99C2',
  ], confettiRadius: 4,});
  stopTimeTracker();
  } else {
    badAnswerCounter++;
    document.getElementById(replyId).classList.add("incorrect");
    document.getElementById(replyId).classList.add("shake");
    document.getElementById(replyId).classList.add("incorrect");
    setTimeout(() => {
          document.getElementById(replyId).classList.remove("incorrect");
          document.getElementById(replyId).classList.remove("shake");
    }, 850);
  }
}

function showSolution(questionId) {
    stopTimeTracker();
    let currentQuestion = quizQuestions[questionId - 1];
    let correctAnswer = currentQuestion.answers.find((answer) => {
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

//official solution:
//dasda hat er nicht als eigene Funktion gespeichert, sonder direkt in dem renderCard (er hat alles auf einmal, ich habe auch noch template)
//deswegen wird das bei mir möglichst nicht funktionieren
//außerdem zeigt es alle Antworten zweimal - einmal angegebe Folge, einmal zufällige
function shuffleAnswerArray() {
  let answersCopy = [];
  quizQuestions.answers.forEach(answer => answersCopy.push(answer));

  while(answersCopy.length > 0) {
    const randomPointer = Math.floor(Math.random() * answersCopy.length);
    let answers = answersCopy.splice(randomPointer, 1)[0]; //da uns splice array zurückgibt

    let answerBtn = document.createElement("button");
    answerBtn.classList.add("one_answer");
    answerBtn.innerHTML = oneAnswer.answerContent;
    answerBtn.id = oneAnswer.answerId;
    answerBtn.setAttribute("onclick", `validateAnswer(${cardTab.id}, '${oneAnswer.answerId}')`);
    answers.appendChild(answerBtn);
  }
}

function startTimeTracking() {
  clearInterval(timeTrackingIntervalId);
  const startTime = Date.now();

  timeTrackingIntervalId = setInterval(function () {
    if(timerRunning && quizRunning) {
      let elapsedTime = Date.now() - startTime;
      document.getElementById("timerText").textContent = (elapsedTime / 1000).toFixed(1);
    }
  }, 100);
}

function stopTimeTracker() {
  timerRunning = false;
  let timeValue = document.getElementById("timer").textContent;
  responseTimes.push(parseInt(timeValue));
  console.log(responseTimes);
}

function renderFinalTab() {
  let wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = "";
  let cardTab = document.createElement("div");
  cardTab.className = "quiz_tab";
  let titleContainer = document.createElement("div");
  titleContainer.classList.add("title_container");
  let title = document.createElement("h1");
  title.textContent = "Quiz";
  let questionTitle = document.createElement("h2");
  questionTitle.id = "statistikTitle";
  questionTitle.textContent = "Deine Statistik: ";

  let myData = document.createElement("div");
  myData.classList.add("one_answer");
  myData.id = 'myData';
  let average = document.createElement("p");
  average.textContent = 'Durchschnittliche Antwortdauer: ' + getAverageTime();
  let goodOnes = document.createElement("p");
  goodOnes.textContent = 'Richtig beantwortete Fragen: ' + goodAnswerCounter;
  let badOnes = document.createElement("p");
  badOnes.textContent = 'Falsch geklickte Antworten: ' + badAnswerCounter;

  let btnBar = document.createElement("div");
  btnBar.classList.add("button_bar");
  let playAgainBtn = document.createElement("button");
  playAgainBtn.className = "action_button";
  playAgainBtn.id = 'playAgain';
  playAgainBtn.textContent = "Nochmal spielen";
  playAgainBtn.setAttribute("onclick",`renderQuestion()`);

  wrapper.appendChild(cardTab);
  cardTab.appendChild(titleContainer);
  titleContainer.appendChild(title);
  cardTab.appendChild(questionTitle);
  cardTab.appendChild(myData);
  myData.appendChild(average);
  myData.appendChild(goodOnes);
  myData.appendChild(badOnes);
  cardTab.appendChild(btnBar);
  btnBar.appendChild(playAgainBtn);
}

function getAverageTime() {
  if(responseTimes.length >0) {
    let timeSum = responseTimes.reduce((sum, num) => {
    return sum + num;
  });
  let averageTime = timeSum / responseTimes.length;
  return averageTime.toFixed(2);
  }
  else {
    return "Zeit konnte man nicht messen."
  }
}