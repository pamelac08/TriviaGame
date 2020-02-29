$(document).ready(function() {

    var questionKey = [ 
        "Q1: What country is accredited for first giving us coffee?", 
        "Q2: Before coffee beans were used to make a drink, East Africans used the berries to do what?", 
        "Q3: What color is a ripe coffee bean?", 
        "Q4: Which is the only US state that coffee is grown commercially?", 
        "Q5: The most expensive coffee in the world is 'Kopi Luwak.' What kind of coffee is it?", 
        "Q6: When did coffee get its start as a beverage?", 
        "Q7: Roughly how many coffee beans are needed to make one espresso?", 
        "Q8: Which country produces about one third of the world's coffee?", 
        "Q9: In America, drinking coffee became prevalent in late 18th century because:", 
        "Q10: Which US city has the most coffee shops per capita?", 
    ]
    var answerKey = [
        ["Indonesia", "Italy", "Colombia", "Ethiopia"],
        ["Make a snack mixed with animal fat", "Dye clothes", "Make a muscle balm, like an early Ben-Gay", "Enhance the feed of plow oxen"],
        ["black", "red", "green", "blue"],
        ["California", "Florida", "Hawaii", "Oregon"],
        ["Coffee from a tree on the top of a 16,400 feet (5,000m) mountain", "Coffee from a Sumatran wild-cat that cannot digest coffee beans", "A very rare white coffee", "Character in a Dr. Seuss story who does not like purple coffee"],
        ["1000 B.C.", "1000 A.D.", "14th century A.D.", "17th century A.D."],
        ["12", "25", "42", "60"],
        ["Ethiopia", "Colombia", "Indonesia", "Brazil"],
        ["There was little tea available in most households.", "Taxes on tea which resulted in the Boston Tea Party.", "Protests against alcohol consumption.", "Belief it had healing properties."],
        ["Seattle", "Los Angeles", "New York", "New Orleans"]
    ];
    
    var correctAnswer = [
        answerKey[0][3], 
        answerKey[1][0], 
        answerKey[2][1], 
        answerKey[3][2], 
        answerKey[4][1], 
        answerKey[5][1], 
        answerKey[6][2], 
        answerKey[7][3], 
        answerKey[8][1], 
        answerKey[9][0]
    ];
    
    
    var correct = 0;
    var incorrect = 0;
    var noAnswer = 0;
    var time = 20
    
    var countdownInterval;
    var clockRunning = false;
    var selectedAnswer;
    // var ifSelected = false;
    
    var questionNumber=0;
    
    //on click of start button, disappear, add elements
    $("#startButton").on("click", display);
    $("#startButton").on("click", play);
    
    
    function display() {
        $(this).hide();
        $("#results").hide();
    
    
        $("#containerInside").prepend("<div id='answers'></div>")
        $("#containerInside").prepend("<div id='question'></div>")
        $("#containerInside").prepend("<div id='timeRemaining'></div>");
        $("#timeRemaining").text("Time Remaining: " + time + " seconds"); 
      
        // $("#containerInside").append("<div id='image'></div>")
    
        
        
        $("#answers").append("<button class='answer' id='answer1'></button><br>")
        $("#answers").append("<button class='answer' id='answer2'></button><br>")
        $("#answers").append("<button class='answer' id='answer3'></button><br>")
        $("#answers").append("<button class='answer' id='answer4'></button><br>")
    
        $(".answer").on("click", onClickAnswer);
    
        $("#results").append("<div class='results' id='correct'></div>");
        $("#results").append("<div class='results' id='incorrect'></div>");
        $("#results").append("<div class='results' id='noAnswer'></div>");
        
    
        $("#results").append("<button type='button' id='restartButton'>Restart</button>");
        $("#restartButton").click(resetGame);
    
    }
    
    function play() {
    
        startCountdown();
        $("#answers").show();
    
        console.log('Question Number: ', questionNumber);
        $("#question").html(questionKey[questionNumber]);
        $("#answer1").html(answerKey[questionNumber][0]);
        $("#answer2").html(answerKey[questionNumber][1]);
        $("#answer3").html(answerKey[questionNumber][2]);
        $("#answer4").html(answerKey[questionNumber][3]);
        
    }
    
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
             $("#question").html("Oh no, that's incorrect! <br> The correct answer is: " + correctAnswer[questionNumber]);
             console.log('Incorrect: ', incorrect);
         }
        
                    // $("#answers").hide();
                    // showImages();
        runAfterQuestion();
    }


    function showImages() {
        if (questionNumber == 0){
            $("#images").html("<img class='images' id='0' src='assets/images/coffee_q1.gif'>");
        }
        if (questionNumber == 1){
            $("#images").html("<img class='images' id='1' src='assets/images/coffee_q2.gif'>");
        }
        if (questionNumber == 2){
            $("#images").html("<img class='images' id='1' src='assets/images/coffee_q3gif.gif'>");
        }
        if (questionNumber == 3){
            $("#images").html("<img class='images' id='1' src='assets/images/coffee_q4.gif'>");
        }
        if (questionNumber == 4){
            $("#images").html("<img class='images' id='1' src='assets/images/coffee_q5.gif'>");
        }
        if (questionNumber == 5){
            $("#images").html("<img class='images' id='1' src='assets/images/coffee_q6.gif'>");
        }
        if (questionNumber == 6){
            $("#images").html("<img class='images' id='1' src='assets/images/coffee_q7.gif'>");
        }
        if (questionNumber == 7){
            $("#images").html("<img class='images' id='1' src='assets/images/coffee_q8.gif'>");
        }
        if (questionNumber == 8){
            $("#images").html("<img class='images' id='1' src='assets/images/coffee_q9.gif'>");
        }
        if (questionNumber == 9){
            $("#images").html("<img class='images' id='1' src='assets/images/coffee_q10.gif'>");
        }

        // runAfterQuestion();
    }
    
    
    
    
    function runAfterNoAnswer() {
        noAnswer++; 
        console.log('No Answer: ', noAnswer);
        $("#question").html("Oh no, out of time! <br> The correct answer is: " + correctAnswer[questionNumber]);
        runAfterQuestion();
      }
    
    function runAfterQuestion() {
        $("#answers").hide();
        showImages();

        if (questionNumber == 9) {
            setTimeout(displayAnswers, 3000);
        }
        else {
            setTimeout(resetAndPlay, 3000);
        }
      }
    
    function resetAndPlay() {
        time = 20;
        questionNumber++;
        $("#images").html("");
        // console.log('New question number: ', questionNumber);
        play();
    }
    
    function resetGame() {
        $("#results").hide();
        $("#containerInside").show();
        // $("#answers").show();
        // $("#images").clear();
        questionNumber = 0;
        correct = 0;
        incorrect = 0
        noAnswer = 0;
        time = 20;
        play();
    }
    
    
    function displayAnswers() {
        stopCountdown();
        $("#images").html("");
        $("#containerInside").hide();
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
      
    });