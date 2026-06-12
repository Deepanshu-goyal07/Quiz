const API = "https://opentdb.com/api.php?amount=10&category=9&difficulty=hard&type=multiple";
let questions = [];
let index = 0;
let score = 0;


async function fetchQuestions() {
    const res = await fetch(API);
    const data = await res.json();
    questions = data.results;
    showQuestion();
}

// Decode special HTML characters
function decode(text) {
    const txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
}


function showQuestion() {

    // Hide next button until answer is selected
    document.getElementById("nextBtn").style.display = "none";
    const q = questions[index];
    document.getElementById("question").innerHTML =
    (index + 1) + ". " + decode(q.question);


    const answersDiv = document.getElementById("answers");

    // Clear old buttons
    answersDiv.innerHTML = "";
    const options = [...q.incorrect_answers, q.correct_answer];
    options.sort(() => Math.random() - 0.5);

    options.forEach(option => {
        const btn = document.createElement("button");
        // Add CSS class
        btn.className = "btn";
        btn.innerHTML = decode(option);
        btn.onclick = () => checkAnswer(btn, option, q.correct_answer);
        answersDiv.appendChild(btn);
    });
}

// Check selected answer
function checkAnswer(btn, selected, correct) {
    const buttons = document.querySelectorAll(".btn");
    buttons.forEach(b => b.disabled = true);
    // If answer is correct
    if (selected === correct) {
        // Make button green
        btn.classList.add("correct");
        score++;

    }

    // If answer is wrong
    else {
        btn.classList.add("wrong"); // Make selected button red
        buttons.forEach(b => {
            if (b.innerHTML === decode(correct)) {
                b.classList.add("correct");
            }
        });
    }
    // Show next button
    document.getElementById("nextBtn").style.display = "block";

}

// Next button click event
document.getElementById("nextBtn").onclick = function () {
    index++;
    // If questions are left
    if (index < questions.length) {
        // Show next question
        showQuestion();
    }

    else {
        // Display final score
        document.querySelector(".quiz-box").innerHTML =
        "<h2>Quiz Finished!</h2><br><h3>Your Score: " +
        score + "/" + questions.length + "</h3>";

    }

}

fetchQuestions();