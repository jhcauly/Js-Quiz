var timerElement = document.querySelector("#time");
var myP = document.getElementById("myP");
var bottom = document.getElementById("bottom");
var bottomAnswer = document.getElementById("bottomAnswer");
var myUl = document.getElementById("myUl");
var liShowList = document.getElementById("showList");
var liShowList1 = document.getElementById("showList1");
var question = window.document.getElementById('question');
var h2Answer = window.document.getElementById('h2Answer');
h2Answer.style.color = "grey";
h2Answer.style.marginLeft = "-530px";
var answerQuiz = window.document.querySelector('.answer');
var storedTodos = JSON.parse(localStorage.getItem("todos"));
var todos = [];
let questionQuiz = ['Inside which HTML element do we put the JavaScript?', '<p id="demo">This is a demonstration.</p>',
    'How do you write "Hello World" in an alert box?', 'How to write an IF statement in JavaScript?'
];
let answerCorrect = ['2. <script>', '3. document.getElementById("demo").innerHTML = "Hello World!"',
    '3. alert("Hello World");', '1. if (i == 5)'
];
let answer = [''];
var y = 0;
var x = 0;
var timer;
var timerCount;
var winCounter = 0;
var isWin = false;

//Here we start the Quiz, we get all the information from LocalStorage and save in array!
function init() {
    /*   var storedTodos = JSON.parse(localStorage.getItem("todos")); */
    if (storedTodos !== null) {
        todos = storedTodos;
    }
}

//Here we start time ti user see how many seconds user have
function startTimer() {

    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = "Time: " + timerCount;

        if (timerCount >= 0) {
            // Tests if win condition is met
            if (isWin && timerCount > 0) {
                clearInterval(timer);
            }
        }
        if (timerCount === 0) {
            clearInterval(timer);
            nextPart()
        }
    }, 1000);
}

//Here we hide same div and start cont seconds and show the question to user!
function startQuestion() {
    clearPage('3')
    y = 0;
    timerCount = 60;
    startTimer()
    insertText(y);
}

// Here we can see the quiz start with questions and answers that user can select correct or wrong!
function insertText(y) {
    question.innerText = questionQuiz[y];
    if (y === 0) {
        answer = ['1. <javascript>', '2. <script>', '3. <js>', '4. <scripting>'];
    }
    if (y === 1) {
        answer = ['1. document.getElement("p").innerHTML = "Hello World!";', '2. document.getElementByName("p").innerHTML = "Hello World!";',
            '3. document.getElementById("demo").innerHTML = "Hello World!"', '4. #demo.innerHTML = "Hello World!";'
        ];
    }
    if (y === 2) {
        answer = ['1. msgBox("Hello World");', '2. alertBox("Hello World");',
            '3. alert("Hello World");', '4. msg("Hello World");";'
        ];
    }
    if (y === 3) {
        answer = ['1. if (i == 5)', '2. if i == 5 then',
            '3. if i = 5 then', '4. if i = 5";'
        ];
    }
    for (var i = 0; i < answer.length; i++) {
        var liAnswer = window.document.getElementById('li' + [i])
        liAnswer.innerText = answer[i];
        liAnswer.className = 'box';
        document.getElementById('li' + [i]).value = answer[i];
    }
}

//Here the program will get the user answer and look if is the correct answer, if we will show MSG "Correct" if no "Wrong"!
function selectAnswerCorrect(cont) {
    var liAnswer = document.getElementById('li' + [cont]).textContent
    if (answerCorrect[y] === liAnswer) {
        y = y + 1;
        x = x + 1;
        h2Answer.innerText = "Correct!";
        if (x < 4) {
            insertText(y)
        } else {
            nextPart()
        }
    } else {
        y = y + 1;
        x = x + 1;
        h2Answer.innerText = "Wrong!";
        if (x < 4) {
            insertText(y)
        } else {
            nextPart()
        }
    }
}

//Here is the last part off program, where we will show the time user get and save the score!
function nextPart() {
    question.innerText = "All Done!";
    clearPage('2')
    clearInterval(timer);
    timerElement.textContent = 'Time: 0';
    createButtonElement('Elemment')
    createButtonElement('Submit')
};

//Here is where we save the user in Local Storage to see after the user save!
function storeTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}
//Here is where will hide same divs in Page
function clearPage(clear) {
    if (clear == '1') {
        //here is to remove the <p> i created to show Score to user!
        var gfg_down =
            document.getElementById("newP");
        if (gfg_down != null) {
            gfg_down.remove();

        }
        myUl.style.display = "none";
        myP.style.display = "none";
        bottom.style.display = "none";
        bottomAnswer.style.display = "none";
        question.style.display = "none";
        h2Answer.style.display = "none";
    }
    if (clear == '2') {
        myUl.style.display = "none";
    }
    if (clear == '3') {
        myP.style.display = "none";
        bottom.style.display = "none";
        bottomAnswer.style.display = "none";
        myUl.style.display = "visible";
    }

}
//Here is where show the list for user see the score!
function renderTodos() {
    clearPage('1')

    liShowList.innerHTML = "";
    if (storedTodos === null) {
        location = location;
    } else {
        var showList = document.getElementById("showList");
        var h1 = document.createElement("h1");
        h1.textContent = "High scores";
        liShowList1.appendChild(h1);
        for (var i = 0; i < storedTodos.length; i++) {
            var todo = storedTodos[i];
            var li = document.createElement("li");
            li.style.background = "rgb(214, 122, 127)";
            li.textContent = todo + " Seconds";
            li.setAttribute("data-index", i);

            liShowList1.appendChild(li);
        }
        createButtonElement('Clear')
        createButtonElement('Back')
    }
}
//Here is where i created same buttons
function createButtonElement(valor) {
    var newButton = document.createElement('button')
    if (valor === "Clear") {

        newButton.type = 'button';
        newButton.value = 'Submit';
        newButton.className = 'btn';
        newButton.textContent = 'Clear high scores';
        liShowList1.appendChild(newButton)

        newButton.onclick = function() {
            window.localStorage.clear();
            location = location;
        };
    }
    if (valor === "Back") {

        newButton.type = 'button';
        newButton.value = 'Submit';
        newButton.className = 'btn';
        newButton.textContent = 'Go back';
        liShowList1.appendChild(newButton)
        newButton.onclick = function() {
            location = location;
        };
    }
    if (valor === "Submit") {

        newButton.type = 'submit';
        newButton.className = 'btn';
        newButton.textContent = 'Submit';
        showList.appendChild(newButton)
        newButton.onclick = function() {
            var todoText = document.getElementById("inputScore").value
            if (todoText === "") {
                location = location;
            } else {
                todoText = todoText + " - " + timerCount
                todos.push(todoText);
                storeTodos();
                renderTodos()
            }
        }
    }
    if (valor === "Elemment") {
        var newP = document.createElement('p')
        var newPinput = document.createElement('label')
        newPinput.className = 'hour';
        var newInput = document.createElement('input')
        newInput.id = 'btn';
        newPinput.className = 'textarea';
        newP.id = 'newP';
        var textP = document.createTextNode("Your final score is " + timerCount)
        var textPinput = document.createTextNode("Enter initials: ")
        newP.appendChild(textP)
        newPinput.appendChild(textPinput)
        showList1.appendChild(newP)
        showList.appendChild(newPinput)
        showList.appendChild(newInput)
    }
}
init()