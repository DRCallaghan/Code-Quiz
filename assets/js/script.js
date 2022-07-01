// global static variable declaration
var viewHighScoresEl = $('#view-high-scores');
var startOverEl = $('#start-over');
var timerEl = $('#timer');
var starterBl = $('#block0');
var startButtonEl = $('#start');
// first dynamic block variable declaration
var questionBl = $('#block1');
var questionEl = $('#question');
var choice0El = $('#choice0');
var choice1El = $('#choice1');
var choice2El = $('#choice2');
var choice3El = $('#choice3');
// dynamic div variable declaration
var gradingBl = $('#grading');
var gradeEl = $('#grade');
// second dynamic block variable declaration
var finishedBl = $('#block2');
var finishedEl = $('#finished');
var finalScoreEl = $('#final-score');
var submittedNameEl = document.querySelector('#submitted-name');
// third dynamic block variable declaration
var highScoresBl = $('#block3');
var scoreListEl = document.querySelector('#score-list');
var clearAllEl = $('#clear-all');

// making the top buttons work
viewHighScoresEl.on('click', function () {
    starterBl.hide();
    questionBl.hide();
    finishedBl.hide();
    highScoresBl.show();
})

startOverEl.on('click', function () {
    location.reload();
})
// initial questions and answer choices
var questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: {
            a: "<script>",
            b: "<scripting>",
            c: "<js>",
            d: "<javascript>"
        },
        correctAnswer: "a"
    },
    {
        question: 'What is the correct JavaScript syntax to change the content of the following HTML element: <p id="demo">This is a demonstration.</p>',
        answers: {
            a: '#demo.innerHTML = "Hello World!";',
            b: 'document.getElementById("demo").innerHTML = "Hello World!";',
            c: 'document.getElementByName("p").innerHTML = "Hello World!";',
            d: 'document.getElement("p").innerHTML = "Hello World!";'
        },
        correctAnswer: 'b'
    },
    {
        question: 'How do you write "Hello World" in an alert box?',
        answers: {
            a: 'alert("Hello World");',
            b: 'alertBox("Hello World");',
            c: 'msg("Hello World");',
            d: 'msgBox("Hello World");'
        },
        correctAnswer: 'a'
    },
    {
        question: 'How to write an IF statement in JavaScript?',
        answers: {
            a: 'if i = 5 then',
            b: 'if i = 5',
            c: 'if (i == 5)',
            d: 'if i == 5 then'
        },
        correctAnswer: 'c'
    },
    {
        question: 'How to write an IF statement for executing some code if "i" is NOT equal to 5?',
        answers: {
            a: 'if (i <> 5)',
            b: 'if i =! 5 then',
            c: 'if i <> 5',
            d: 'if (i != 5)'
        },
        correctAnswer: 'd'
    },
    {
        question: 'How does a WHILE loop start?',
        answers: {
            a: 'while i = 1 to 10',
            b: 'while (i <= 10)',
            c: 'while (i <= 10; i++)',
            d: 'while i <= 10'
        },
        correctAnswer: 'b'
    },
    {
        question: 'How does a FOR loop start?',
        answers: {
            a: 'for (i = 0; i <= 5; i++)',
            b: 'for (i <= 5; i++)',
            c: 'for i = 1 to 5',
            d: 'for (i = 0; i <= 5)'
        },
        correctAnswer: 'a'
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        answers: {
            a: '<!--This is a comment-->',
            b: '"This is a comment',
            c: '/*This is a comment',
            d: '//This is a comment'
        },
        correctAnswer: 'd'
    },
    {
        question: 'What is the correct way to write a JavaScript array?',
        answers: {
            a: 'var colors = 1 = ("red"), 2 = ("green"), 3 = ("blue")',
            b: 'var colors = {"red", "green", "blue"}',
            c: 'var colors = (1:"red", 2:"green", 3:"blue")',
            d: 'var colors = ["red", "green", "blue"]'
        },
        correctAnswer: 'd'
    },
    {
        question: 'How do you round the number 7.25, to the nearest integer?',
        answers: {
            a: 'Math.rnd(7.25)',
            b: 'Math.round(7.25)',
            c: 'rnd(7.25)',
            d: 'round(7.25)'
        },
        correctAnswer: 'b'
    },
    {
        question: 'How do you find the number with the highest value of x and y?',
        answers: {
            a: 'top(x, y)',
            b: 'ceil(x, y)',
            c: 'Math.max(x, y)',
            d: 'Math.ceil(x, y)'
        },
        correctAnswer: 'c'
    },
    {
        question: 'Which event occurs when the user clicks on an HTML element?',
        answers: {
            a: 'onmouseover',
            b: 'onchange',
            c: 'onclick',
            d: 'onmouseclick'
        },
        correctAnswer: 'c'
    }
];

// definining initial question and prepping for iteration on submit
var num = 0;
questionEl.text(questions[num].question);
choice0El.text(questions[num].answers.a);
choice1El.text(questions[num].answers.b);
choice2El.text(questions[num].answers.c);
choice3El.text(questions[num].answers.d);

// switching from starter block to questions block when the quiz is started
var timer = 60;
timerEl.attr("class", "clear");
startButtonEl.click(function () {
    starterBl.hide();
    questionBl.show();
    gradingBl.hide();
    // setting up the timer interval function
    timerEl.text("Time Remaining: " + timer + "s");
    var timeInterval = setInterval(() => {
        timer--;
        timerEl.text("Time Remaining: " + timer + "s");
        // setting a class for css
        if (timer <= 20) {
            timerEl.attr("class", "warning");
        }
        // hiding the question area when the timer hits 0, setting the player's score to 0, and stopping the timer
        if (timer <= 0) {
            questionBl.hide();
            finishedBl.show();
            finishedEl.text("You have failed the quiz! Try again!");
            timer = 0;
            finalScoreEl.text("Your final score is " + timer + ".");
            clearInterval(timeInterval);
        }
        // stopping the timer once the player finishes the game (see line 224)
        if (num === 100) {
            clearInterval(timeInterval);
        }
    }, 1000);
});

// make the next question appear on selecting any choice and submitting the question, also ends the quiz once the user has answered all questions
function handleQuestionSubmit(event) {
    event.preventDefault();
    // if the player clicks the right answer, display correct
    if (questions[num].correctAnswer == $(this).attr('value')) {
        $('#grade').text("Correct!");
        $('#grade').attr("class", "correct");
    } else {
        // if the player clicks the wrong answer, display incorrect and decrement the timer by 10
        $('#grade').text("Incorrect!");
        $('#grade').attr("class", "incorrect");
        timer = timer - 10;
        timerEl.text("Time Remaining: " + timer + "s");
    }
    // show the divider and whether the player was correct or incorrect
    gradingBl.show();
    // increment up to the next question
    if (num < questions.length - 1) {
        num++;
        questionEl.text(questions[num].question);
        choice0El.text(questions[num].answers.a);
        choice1El.text(questions[num].answers.b);
        choice2El.text(questions[num].answers.c);
        choice3El.text(questions[num].answers.d);
    } else {
        // stopping the timer once the player finishes the game (see line 196) and showing the section of html where the player can submit their score and name
        num = 100;
        questionBl.hide();
        finishedBl.show();
        finishedEl.text("You have finished the quiz! Great job!");
        finalScoreEl.text("Your final score is " + timer);
    }
}

// running the handleQuestionSubmit function when the player clicks on ANY of the answer choices
choice0El.on('click', handleQuestionSubmit);
choice1El.on('click', handleQuestionSubmit);
choice2El.on('click', handleQuestionSubmit);
choice3El.on('click', handleQuestionSubmit);

// on finishing the quiz, prompt the user to enter their initials to store their high score
var highScores = [];
function renderHighScores() {
    // clearing the content of the score list
    scoreListEl.innerHTML = "";
    highScores.sort(function (a, b) { return a - b });
    // writes the list of things to do for each element
    for (var i = 0; i < highScores.length; i++) {
        // stores the individual highscores into the score variable
        var score = highScores[i];
        //creates a list element to attach to the ordered list
        var li = document.createElement("li");
        // sets the text content of each list element to the name and score on each high score
        li.textContent = score[0] + " - " + score[1] + "    ";
        // sets an attribute of data-index to the iterator
        li.setAttribute("data-index", i);

        // creates a button for deleting individual highscores
        var button = document.createElement("button");
        button.textContent = "Delete";
        button.setAttribute("class", "delete")
        li.appendChild(button);
        scoreListEl.appendChild(li);
    }
}

// storing all high scores locally
function storeHighScores() {
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

// pushing submitted scores to the array of all high scores and clearing the name input field
var scoreForm = $('#initials');
submittedNameEl.value = "";
scoreForm.on('submit', function (event) {
    event.preventDefault();
    var score = [submittedNameEl.value.trim(), timer];
    if (score[0] === "") {
        return;
    }
    highScores.push(score);
    submittedNameEl.value = "";
    storeHighScores();
    renderHighScores();
    highScoresBl.show();
    finishedBl.hide();
});

// adding a function to allow for deleting individual scores if a user clicks on a button in the list
scoreListEl.addEventListener('click', function (event) {
    var element = event.target;

    if (element.matches('button') === true) {
        var index = element.parentElement.getAttribute("data-index");
        highScores.splice(index, 1);
        storeHighScores();
        renderHighScores();
    }
})

// clearing all scores if the user clicks clear all
document.querySelector('#clear-all').addEventListener('click', function () {
    highScores = [];
    storeHighScores();
    renderHighScores();
})


// build an init function to hide the question block, finished block, and high scores block as the web page loads
var init = function () {
    questionBl.hide();
    finishedBl.hide();
    highScoresBl.hide();
    var storedScores = JSON.parse(localStorage.getItem("highScores"));
    if (storedScores !== null) {
        highScores = storedScores;
    }
    renderHighScores();
}

// calling init() before doing anything dynamic to the page
init();