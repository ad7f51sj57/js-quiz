import data from "../data.json" assert { type: "json" };

const pageNumber = document.getElementById("page-number");

const problemTitle = document.querySelector("h2");
const choicesContainer = document.getElementById("choices-container");

const checkBtn = document.querySelector(".check-btn");
const nextBtn = document.getElementById("next-btn");

const dialog = document.querySelector("dialog");
const dialogCount = document.getElementById("correct-answers-count");
const dialogRestart = document.getElementById("restart-btn");

const MAX_PAGE_NUMBER = 5;
let currentPageIndex = 0;
let choiceIndex = -1;
let answer = -1;
let correctAnswersCount = 0;
let selectedBtn = null;

/** 문제 생성 */
function createChoice(choices) {
  choices.forEach((choice, index) => {
    const choiceBtn = document.createElement("button");
    choiceBtn.classList.add("choice-btn");
    choiceBtn.innerText = choice;

    choiceBtn.onclick = function () {
      choiceIndex = index;
      checkBtn.disabled = false;
      checkBtn.classList.add("active");

      document.querySelectorAll(".choice-btn").forEach((btn) => {
        btn.classList.remove("selected");
      });

      this.classList.add("selected");
      selectedBtn = this;
    };

    choicesContainer.appendChild(choiceBtn);
  });
}

const showProblem = () => {
  const currentProblem = data[currentPageIndex];
  answer = currentProblem.answer;
  problemTitle.innerText = currentProblem.problem;
  checkBtn.disabled = true;
  createChoice(currentProblem.choices);
};

/** 결과 확인 버튼 */
const choicesBtnDisabledTrue = () => {
  document.querySelectorAll(".choice-btn").forEach((btn) => (btn.disabled = true));
  checkBtn.style.display = "none";
  nextBtn.style.display = "inline";
};

const checkPlayerAnswer = () => {
  if (choiceIndex === -1) return;

  if (answer === choiceIndex) {
    selectedBtn.classList.add("correct");
    correctAnswersCount++;
  } else {
    selectedBtn.classList.add("incorrect");
  }

  choicesBtnDisabledTrue();
};

checkBtn.onclick = () => checkPlayerAnswer();

/** 다음 버튼 */
const showDialog = () => {
  dialogCount.innerText = correctAnswersCount;
  dialog.showModal();
  dialogRestart.onclick = () => location.reload();
};

nextBtn.onclick = function () {
  choiceIndex = -1;
  if (currentPageIndex === MAX_PAGE_NUMBER) {
    showDialog();
    return;
  }

  choicesContainer.replaceChildren();
  pageNumber.innerText = ++currentPageIndex + 1;
  this.style.display = "none";
  checkBtn.classList.remove("active");
  checkBtn.style.display = "inline";
  showProblem();
};

showProblem();
