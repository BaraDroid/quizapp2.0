let questionsCounter = 0;
const jsConfetti = new JSConfetti();


let timerRunning = false;
let quizRunning = false;
let responseTimes = [];
let timeTrackingIntervalId;
let badAnswerCounter = 0;
let goodAnswerCounter = 0;

//*region One card as HTML template for renderQuestion function.
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
  timerImage.setAttribute("src", "assets/timer_icone.png");
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
  //solveBtn.setAttribute("onclick",`showSolution(${cardTab.id})`);
  //oder moderne Lösung für unobtrusives JS:
  solveBtn.addEventListener("click", () => {showSolution(cardTab.id)});

  const nextBtn = document.createElement("button");
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
  const currentQuestion = quizQuestions[questionId - 1];
  const correctAnswer = currentQuestion.answers.find((answer) => {
  return answer.correct;
  });
  if (correctAnswer.answerId === replyId) {
    getGoodAnswerStyle(replyId);
    stopTimeTracker();
  } else {
    getBadAnswerStyle(replyId);
  }
}

function showSolution(questionId) {
    stopTimeTracker();
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

//*region Oficial given solution of shuffle function, not used

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
//*endregion

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

function stopTimeTracker() {
  timerRunning = false;
  let timeValue = document.getElementById("timer").textContent;
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
  myData.classList.add("one_answer");
  myData.id = 'myData';
  const average = document.createElement("p");
  average.textContent = 'Durchschnittliche Antwortdauer: ' + getAverageTime();
  const goodOnes = document.createElement("p");
  goodOnes.textContent = 'Richtig beantwortete Fragen: ' + goodAnswerCounter;
  const badOnes = document.createElement("p");
  badOnes.textContent = 'Falsch geklickte Antworten: ' + badAnswerCounter;

  const btnBar = document.createElement("div");
  btnBar.classList.add("button_bar");
  const playAgainBtn = document.createElement("button");
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
    return " Keine Frage beantwortet.";
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
    answerBtn.setAttribute("onclick", `validateAnswer(${cardId}, '${oneAnswer.answerId}')`);
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
  badAnswerCounter++;
  document.getElementById(idOfReply).classList.add("incorrect");
  document.getElementById(idOfReply).classList.add("shake");
  document.getElementById(idOfReply).classList.add("incorrect");
  setTimeout(() => {
    document.getElementById(idOfReply).classList.remove("incorrect");
    document.getElementById(idOfReply).classList.remove("shake");
  }, 850);
}