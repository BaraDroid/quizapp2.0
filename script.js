let questionsCounter = 0; //ten se bude navysovat pri kazdym Durchlaufu

//<h2 id="question">Wie viele Augen hat ein Mensch?</h2>
// <div class="answer_container">
//     <button class="one_answer incorrect" id="answerIndex0">Möglichst viele.</button>
//     <button class="one_answer">Nur ein einziges in der Stirnmitte.</button>
//     <button class="one_answer">Zwei.</button>
//     <button class="one_answer correct">Es ist eine Trickfrage, ein Mensch hat keine Augen.</button>
// </div>
// <div class="button_bar">
//     <button class="action_button">Lösung</button>
//     <button class="action_button">Weiter</button>
// </div>

function renderQuestion() {
    if (questionsCounter <= quizQuestions.length - 1) {
        getQuizCardTemplate();
    }
    
}

document.addEventListener("DOMContentLoaded", renderQuestion);

function getQuizCardTemplate() {
  let questionIndex = questionsCounter;

  let wrapper = document.getElementById("wrapper");
  let cardTab = document.createElement('div');
  cardTab.className = 'quiz_tab';
  let title = document.createElement('h1');
  title.textContent = 'Quiz';


  let questionTitle = document.createElement("h2");
  questionTitle.id = "question";
  questionTitle.innerHTML = quizQuestions[questionIndex].questionName;

  let answers = document.createElement("div");
  answers.classList.add("answer_container");

  let answerA = document.createElement("button");
  answerA.classList.add("one_answer");
  answerA.innerHTML = quizQuestions[questionIndex].answers[0].answerContent;

  let answerB = document.createElement("button");
  answerB.classList.add("one_answer");
  answerB.innerHTML = quizQuestions[questionIndex].answers[1].answerContent;

  let answerC = document.createElement("button");
  answerC.classList.add("one_answer");
  answerC.innerHTML = quizQuestions[questionIndex].answers[2].answerContent;

  let answerD = document.createElement("button");
  answerD.classList.add("one_answer");
  answerD.innerHTML = quizQuestions[questionIndex].answers[1].answerContent;

  let btnBar = document.createElement("div");
  btnBar.classList.add("button_bar");
  let solveBtn = document.createElement("button");
  solveBtn.className = "action_button";
  solveBtn.textContent = "Lösen";
  let nextBtn = document.createElement("button");
  nextBtn.className = "action_button";
  nextBtn.textContent = "Weiter";
  nextBtn.setAttribute("onclick", "renderQuestion()");

  wrapper.appendChild(cardTab);
  cardTab.appendChild(title);
  cardTab.appendChild(questionTitle);
  cardTab.appendChild(answers);
  answers.appendChild(answerA);
  answers.appendChild(answerB);
  answers.appendChild(answerC);
  answers.appendChild(answerD);
  cardTab.appendChild(btnBar);
  btnBar.appendChild(solveBtn);
  btnBar.appendChild(nextBtn);

  questionsCounter++;
  console.log(questionsCounter);
}
