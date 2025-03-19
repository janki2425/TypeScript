var quiz = [
    {
        question: "What is the capital city of France?",
        options: ["Florida", "Paris", "London", "Texas"],
        answer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Jupiter", "Venus", "Mars", "Saturn"],
        answer: "Mars"
    },
    {
        question: "What is 5 + 7?",
        options: ["10", "11", "12", "13"],
        answer: "12"
    },
    {
        question: "Which animal is known as man's best friend'?",
        options: ["Cat", "Dog", "Bird", "Fish"],
        answer: "Dog"
    },
    {
        question: "What color is the sky on a clear day?",
        options: ["Green", "Blue", "Red", "Yellow"],
        answer: "Blue"
    },
    {
        question: "How many legs does a spider typically have?",
        options: ["6", "8", "10", "4"],
        answer: "8"
    },
    {
        question: "Which of these is a fruit?",
        options: ["Carrot", "Potato", "Apple", "Broccoli"],
        answer: "Apple"
    },
    {
        question: "What do plants need to grow?",
        options: ["Chocolate", "Water", "Sand", "Stones"],
        answer: "Water"
    },
    {
        question: "Which of these is a type of bird?",
        options: ["Crocodile", "Snake", "Eagle", "Lizard"],
        answer: "Eagle"
    },
    {
        question: "How many days are in a week?",
        options: ["5", "6", "7", "8"],
        answer: "7"
    }
];
var question = document.getElementById("question");
var options = document.getElementById("options");
var nextBtn = document.getElementById("next-btn");
var result = document.getElementById("result");
var score = 0;
var currentQuestion = 0;
var userAnswers = [];
function loadQuestion() {
    var q = quiz[currentQuestion];
    question.textContent = "Q".concat(currentQuestion + 1, ": ").concat(q.question);
    options.innerHTML = '';
    q.options.forEach(function (option) {
        var lable = document.createElement("label");
        lable.innerHTML = "<input type=\"radio\" name=\"option\" value=\"".concat(option, "\"> ").concat(option);
        options.appendChild(lable);
    });
}
function showResult() {
    question.style.display = "none";
    options.style.display = "none";
    nextBtn.style.display = "none";
    result.style.display = "block";
    var resultHTML = "<h2>Your Score: ".concat(score, "/").concat(quiz.length, "</h2>");
    quiz.forEach(function (q, index) {
        var userAnswer = userAnswers[index];
        resultHTML += "<p><strong>Q".concat(index + 1, ": ").concat(q.question, "</strong></p>");
        resultHTML += "<ul>";
        q.options.forEach(function (option) {
            var className = "";
            if (option === q.answer && userAnswer !== undefined) {
                className = "correct";
            }
            else if (option === userAnswers[index] && option !== q.answer) {
                className = "wrong";
            }
            resultHTML += "<li class=\"".concat(className, "\">").concat(option, "</li>");
        });
        resultHTML += "</ul><hr>";
    });
    result.innerHTML = resultHTML;
}
nextBtn.addEventListener("click", function () {
    var selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        var userAnswer = selectedOption.value;
        userAnswers[currentQuestion] = userAnswer;
        if (userAnswer === quiz[currentQuestion].answer) {
            score++;
        }
    }
    currentQuestion++;
    if (currentQuestion < quiz.length) {
        loadQuestion();
    }
    else {
        showResult();
    }
});
loadQuestion();
