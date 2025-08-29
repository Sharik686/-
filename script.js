// Создаю переменные для очков, пустой массив для ответов пользователя, и текущий вопрос 0 так как начинаем с 1 .
let score = 0;
let currentQuestion = 0;
let userAnswers = [];

// Вопросы для теста--------------------------------------------------------------------------------

const questions = [
  {
    type: "choice",
    question: "Какой фильм получил больше всего Оскаров в истории?",
    options: [
      "a) Титаник",
      "b) Властелин колец: Возвращение короля",
      "c) Бен-Гур",
      "d) Аватар",
    ],
    correct: "b",
  },
  {
    type: "choice",
    question: "Кто режиссер фильма 'Крестный отец'?",
    options: [
      "a) Мартин Скорсезе",
      "b) Фрэнсис Форд Коппола",
      "c) Стивен Спилберг",
      "d) Квентин Тарантино",
    ],
    correct: "b",
  },
  {
    type: "choice",
    question: "В каком году вышел первый фильм о Гарри Поттере?",
    options: ["a) 1999", "b) 2001", "c) 2003", "d) 2005"],
    correct: "b",
  },
  {
    type: "choice",
    question: "Какой актер сыграл Тони Старка в фильмах Marvel?",
    options: [
      "a) Крис Эванс",
      "b) Крис Хемсворт",
      "c) Роберт Дауни-младший",
      "d) Марк Руффало",
    ],
    correct: "c",
  },
  {
    type: "choice",
    question: "Какой фильм является самым кассовым в истории?",
    options: [
      "a) Аватар",
      "b) Мстители: Финал",
      "c) Титаник",
      "d) Звездные войны: Пробуждение силы",
    ],
    correct: "a",
  },
  {
    type: "choice",
    question: "Кто сыграл Джокера в фильме 'Темный рыцарь'?",
    options: [
      "a) Хоакин Феникс",
      "b) Джаред Лето",
      "c) Хит Леджер",
      "d) Джек Николсон",
    ],
    correct: "c",
  },
  {
    type: "choice",
    question: "Какой студии принадлежит франшиза 'Мстители'?",
    options: [
      "a) DC Comics",
      "b) Sony Pictures",
      "c) Marvel Studios",
      "d) Universal Pictures",
    ],
    correct: "c",
  },
  {
    type: "input",
    question: "Какой актер сыграл Нео в матрице?",
    correctAnswer: "Киану Ривз",
    synonyms: ["Киану Ривз", "Keanu Reeves", "Ривз"],
  },
  {
    type: "input",
    question: "Как называется первая часть трилогии 'Властелин колец'?",
    correctAnswer: "Братство кольца",
    synonyms: [
      "Братство кольца",
      "Братство Кольца",
      "The Fellowship of the Ring",
    ],
  },
  {
    type: "input",
    question: "Кто режиссер фильма 'Побег из Шоушенка'?",
    correctAnswer: "Фрэнк Дарабонт",
    synonyms: ["Фрэнк Дарабонт", "Frank Darabont", "Дарабонт"],
  },
];

// создаю инициализацию страницы которая запускает начальный экран в контейнере вопросов. и обработчик кликов на весь документ

document.addEventListener("DOMContentLoaded", function () {
  showStartScreen();

  document.addEventListener("click", function (e) {
    if (e.target.id === "start-btn") {
      startTest();
    } else if (e.target.classList.contains("option-btn")) {
      handleAnswer(e.target);
    } else if (e.target.id === "submit-answer") {
      handleInputAnswer();
    } else if (e.target.id === "next-btn") {
      nextQuestion();
    } else if (e.target.id === "restart-btn") {
      restartTest();
    }
  });
});

function showStartScreen() {
  const testContainer = document.getElementById("test__container");

  let html = `
    <div class="start-screen">
    <h2 class="start-title">Давай начнем викторину</h2>
    <p class="start-desc">В этом тесте будет 10 вопросов. 7 с выбором ответов и 3 с полем для ввода. За 1 вопрос с выбором ответа ты получаешь 1 балл, а за вопрос с полем ввода 2 балла</p>
    <button id="start-btn">Не будем тянуть</button>
    </div>
    `;

  testContainer.innerHTML = html;
}

function startTest() {
  score = 0;
  userAnswers = [];
  currentQuestion = 0;
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
  }

  const testContainer = document.getElementById("test__container");

  let html = `
    <div class="question">
    <h3>Вопрос : ${currentQuestion + 1}/${questions.length}</h3>
    <div class="question-disc">${questions[currentQuestion].question}</div>
    <div class="answers">
    `;

  if (questions[currentQuestion].type === "choice") {
    questions[currentQuestion].options.forEach((option, i) => {
      html += `
            <button class="option-btn" data-value="${option[0]}">${option}</button>
            `;
    });
  } else if (questions[currentQuestion].type === "input") {
    html += `
        <input id="input-answer" placeholder="Введите ваш ответ">
        <button id="submit-answer">Ответить</button>
        `;
  }
  html += `</div><div id="feedback"></div></div>`;

  testContainer.innerHTML = html;
}

function handleAnswer(button) {
  const allButons = document.querySelectorAll(".option-btn");
  allButons.forEach((btn) => {
    btn.disabled = true;
  });

  const question = questions[currentQuestion].question;
  const userAnswer = button.dataset.value;
  const isCorrect = userAnswer === questions[currentQuestion].correct;

  userAnswers.push({
    question: question,
    userAnswer: userAnswer,
    correctAnswer: questions[currentQuestion].correct,
    isCorrect: isCorrect,
  });

  allButons.forEach((btn) => {
    if (btn.dataset.value === questions[currentQuestion].correct) {
      btn.classList.add("correct");
    }
    if (btn === button && !isCorrect) {
      btn.classList.add("incorrect");
    }
  });
  if (isCorrect) {
    score++;
  }
  showFeedback(isCorrect);
  console.log(userAnswers);
  
}

function handleInputAnswer() {
  const question = questions[currentQuestion].question;
  const input = document.getElementById("input-answer");
  const userAnswer = input.value.trim().toLowerCase();
  let isCorrect =
    userAnswer === questions[currentQuestion].correctAnswer.toLowerCase();
  input.disabled = true;
  document.getElementById("submit-answer").disabled = true;

  if (!isCorrect && questions[currentQuestion].synonyms) {
    isCorrect = questions[currentQuestion].synonyms.some(
      (synonym) => userAnswer === synonym.toLowerCase()
    );
  }

  userAnswers.push({
    question: question,
    userAnswer: userAnswer,
    correctAnswer: questions[currentQuestion].correctAnswer,
    isCorrect: isCorrect,
  });
  if (isCorrect) {
    score += 2;
  }
  showFeedback(isCorrect);
}

function showFeedback(isCorrect) {
  const feedback = document.getElementById("feedback");

  let html = `
    <div class="correct-answer">${isCorrect ? "✅ ВЕРНО!" : "❌ НЕВЕРНО!"}</div>
    <button id="next-btn">Следующий вопрос</button>`;
  feedback.innerHTML = html;
}

function nextQuestion() {
  currentQuestion++;
  showQuestion();
}

function showResults() {
  const testContainer = document.getElementById("test__container");

  let html = `
    <div class="results">
    <h2 class="result-title">🎬 Итоги Викторины</h2>
    <p class="result-desc">Ваш результат: ${score}/${questions.length + 3}</p>
    <div class="result-score">${
      score <= 6
        ? "Тебе нужно подтянуть знания по кинофильмам"
        : score  <= 9
        ? "Все не так уж плохо, не хватило совсем немного"
        : "Ты молодец, у тебя хорошие познания в киноиндустрии"
    }
    </div>`;
    userAnswers.forEach((answer, index) => {
    
    html += `
    <div class=${answer.isCorrect ? "correct-user-answer" : "incorrect-user-answer"}>
    <p><strong>Вопрос ${index + 1}:</strong>${answer.question}</p>
    <p>Ваш ответ: ${answer.userAnswer}</p>
    <p>Правильный ответ: ${answer.correctAnswer}</p>
    <p>${answer.isCorrect ? '✅ Верно' : '❌ Неверно'}</p>
    </div>`;
    });

    html += `
    <div class="restart-btn">
    <button id="restart-btn">Начать заново</button>
    </div>
    `;

    testContainer.innerHTML = html;
}

function restartTest() {
    score = 0;
    userAnswers = [];
    currentQuestion = 0;
    showStartScreen();
}