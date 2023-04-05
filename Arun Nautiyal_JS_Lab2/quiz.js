
function Quiz(questions) {
  this.score = 0;
  this.currQuestIndex = 0;
  this.questions = questions;
}

Quiz.prototype.getCurrentQuestionIndex = function () {
  return this.questions[this.currQuestIndex];
};

Quiz.prototype.isEnded = function () {
  return this.currQuestIndex === this.questions.length;
};


Quiz.prototype.validateAnswerAndUpdateScore = function (choice) {
  let question = this.getCurrentQuestionIndex();
  if (question.answer === choice) {
    this.score++;
  }
  this.currQuestIndex++;
};

function Question(text, options, answer) {
  this.text = text;
  this.options = options;
  this.answer = answer;
}

let questions = [
  new Question(
    "What is the capital of Uttar Pradesh?",
    ["Prayaagraj", "Lucknow", "Dehradun", "Jhanshi"],
    "Lucknow"
  ),
  new Question(
    "Who was the first prime minister of India?",
    ["Jawaharlal Nehru", "Indira Gandhi", "Narendra Modi", "Lal Bahadur Shastri"],
    "Jawaharlal Nehru"
  ),
  new Question(
    "Who penned the book Wings of Fire?",
    ["Dr APJ Abdul Kalam", "Jawaharlal Nehru","Khuswant Singh", "Indira Gandhi"],
    "Dr APJ Abdul Kalam"
  )
];

function showScores() {
  console.log("Scores :-", quiz.score);
  let gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += `<h2 id='score'> Your Scores:- ${
    quiz.score
  } and mark percentage is :- ${(quiz.score / questions.length) * 100}% </h1>`;
  document.getElementById("quiz").innerHTML = gameOverHTML;
}

function loadQuestions() {
  if (quiz.isEnded()) {
    showScores();
  } else {
    //Show current question!
    let curQuest = quiz.getCurrentQuestionIndex();
    if (curQuest.text) {
      let questionEle = document.getElementById("question");
      questionEle.innerHTML = curQuest.text;

      //Show current question's options
      let options = curQuest.options;
      for (var i = 0; i < options.length; i++) {
        let currOption = options[i];
        let eachOptElement = document.getElementById("choice" + i);
        eachOptElement.innerHTML = currOption;
        handleOptionBtn("btn" + i, currOption);
      }
    } 
    showProgress();
  }
}

function showProgress() {
  let curQuestNumber = quiz.currQuestIndex + 1;
  let progress = document.getElementById("progress");
  progress.innerHTML = `Question ${curQuestNumber} of ${quiz.questions.length}`;
}

function handleOptionBtn(btnId, choice) {
  let btn = document.getElementById(btnId);
  btn.onclick = () => {
    quiz.validateAnswerAndUpdateScore(choice);
    loadQuestions();
  };
}

let quiz = new Quiz(questions);

//Load questions
loadQuestions();
