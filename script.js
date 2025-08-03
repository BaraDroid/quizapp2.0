let questionsCounter = 0; //ten se bude navysovat pri kazdym Durchlaufu
let button = document.getElementById("confettiBtn");
const canvas = document.getElementById('confettiCanvas');
const jsConfetti = new JSConfetti({ canvas })

// <div class="quiz_tab" id="questionId">
//     <h1>Quiz</h1>
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

function renderQuestion() {
  let questionIndex = questionsCounter;
  if (questionsCounter <= quizQuestions.length - 1) {
    getQuizCardTemplate(questionIndex);
    questionsCounter++;
  } else {
    renderFinalTab();
    //statistiky
    //dat questionCounter na nulu
  }
}

document.addEventListener("DOMContentLoaded", renderQuestion);

function getQuizCardTemplate(index) {
  let wrapper = document.getElementById("wrapper");
  wrapper.innerHTML = "";
  let cardTab = document.createElement("div");
  cardTab.className = "quiz_tab";
  cardTab.id = quizQuestions[index].questionId;
  let title = document.createElement("h1");
  title.textContent = "Quiz";

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
  cardTab.appendChild(title);
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
    document.getElementById(replyId).classList.add("correct");
    jsConfetti.addConfetti({confettiColors: [
    '#FF8A5B', '#FFD262', '#7ED957', '#75C7FF', '#B679FF', '#FF99C2',
  ], confettiRadius: 4,});
  } else {
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

console.log("hello from script");
