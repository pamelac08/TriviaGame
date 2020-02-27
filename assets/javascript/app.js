



var questionKey = [ 
    "question 1", 
    "question 2", 
    "question 3", 
    "question 4", 
    "question 5", 
    "question 6", 
    "question 7", 
    "question 8", 
    "question 9", 
    "question 10", 
]
var answerKey = [
    ["answer1.1", "answer1.2", "answer1.3", "answer1.4"],
    ["answer2.1", "answer2.2", "answer2.3", "answer2.4"],
    ["answer3.1", "answer3.2", "answer3.3", "answer3.4"],
    ["answer4.1", "answer4.2", "answer4.3", "answer4.4"],
    ["answer5.1", "answer5.2", "answer5.3", "answer5.4"],
    ["answer6.1", "answer6.2", "answer6.3", "answer6.4"],
    ["answer7.1", "answer7.2", "answer7.3", "answer7.4"],
    ["answer8.1", "answer8.2", "answer8.3", "answer8.4"],
    ["answer9.1", "answer9.2", "answer9.3", "answer9.4"],
    ["answer10.1", "answer10.2", "answer10.3", "answer10.4"]
];

var correctAnswer = [answerKey[0][0], answerKey[1][0], answerKey[2][0], 
answerKey[3][0], answerKey[4][0], answerKey[5][0], answerKey[6][0], answerKey[7][0], 
answerKey[8][0], answerKey[9][0]];



var correct = 0;
var incorrect = 0;
var noAnswer = 0;
var time = 20

var countdownInterval;
var clockRunning = false;
var selectedAnswer;
var ifSelected = false;

var questionNumber=0;

//on click of start button, disappear, add elements
$("#startButton").on("click", display);
$("#startButton").on("click", play);


function onClickAnswer() {
    stopCountdown();

     //save value of button clicked
     selectedAnswer = $(this).text();
     //console.log(selectedAnswer);
 
     if (selectedAnswer === correctAnswer[questionNumber]) {
         correct++;
         $("#question").text("That is correct!");
         console.log('Correct: ', correct);
     }
     else {
         incorrect++;
         $("#question").text("Oh no, that's incorrect! The correct answer is: " + correctAnswer[questionNumber]);
         console.log('Incorrect: ', incorrect);
     }
     
    runAfterQuestion();
}


function display() {
    $(this).hide();
    $("#results").hide();

    $("#container").append("<div id='timeRemaining'></div>");
    $("#timeRemaining").text("Time Remaining: " + time + " seconds"); 

    $("#container").append("<div id='question'></div>")
    $("#container").append("<button class='answer' id='answer1'></button><br>")
    $("#container").append("<button class='answer' id='answer2'></button><br>")
    $("#container").append("<button class='answer' id='answer3'></button><br>")
    $("#container").append("<button class='answer' id='answer4'></button><br>")

    $(".answer").on("click", onClickAnswer);

    $("#results").append("<div id='correct'></div>");
    $("#results").append("<div id='incorrect'></div>");
    $("#results").append("<div id='noAnswer'></div>");
    

    $("#results").append("<button type='button' id='restartButton'>Restart</button>");
    $("#restartButton").click(resetGame);

}

function play() {

    startCountdown();

    console.log('Question Number: ', questionNumber);
    $("#question").html(questionKey[questionNumber]);
    $("#answer1").html(answerKey[questionNumber][0]);
    $("#answer2").html(answerKey[questionNumber][1]);
    $("#answer3").html(answerKey[questionNumber][2]);
    $("#answer4").html(answerKey[questionNumber][3]);
    
}

function runAfterNoAnswer() {
    noAnswer++; 
    console.log('No Answer: ', noAnswer);
    runAfterQuestion();
  }

function runAfterQuestion() {
    if (questionNumber == 9) {
        displayAnswers();
    }
    else {
        setTimeout(resetAndPlay, 4000);
    }
  }

function resetAndPlay() {
    time = 30;
    questionNumber++;
    // console.log('New question number: ', questionNumber);
    play();
}

function resetGame() {
    $("#results").hide();
    $("#container").show();
    questionNumber = 0;
    correct = 0;
    incorrect = 0
    noAnswer = 0;
    play();
}


function displayAnswers() {
    $("#container").hide();
    $("#results").show();

    $('#correct').html("Correct Answers: " + correct);
    $('#incorrect').html("Inorrect Answers: " + incorrect);
    $('#noAnswer').html("No Answer: " + noAnswer);

}




//start countdown
function startCountdown () {
if (!clockRunning) {
    countdownInterval = setInterval(count, 1000);
    clockRunning = true;
}
}

function count() {
    time--;
    var converted = timeConverter(time);
//    console.log(converted);

    if (time <= 0) {
        stopCountdown();
        runAfterNoAnswer();
    }

    $("#timeRemaining").text("Time Remaining: " + converted + " seconds");
}

function stopCountdown() {
    clearInterval(countdownInterval);
    clockRunning = false;
}

function timeConverter(t) {

    //  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
  
    else if (minutes < 10) {
      minutes = "0" + minutes;
    }
  
    return minutes + ":" + seconds;
  }
  