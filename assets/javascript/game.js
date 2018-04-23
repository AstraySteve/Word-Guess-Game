/*
    Steven Tran
    Assignment 3 Javascript file, 2018
    UofT SCS Coding Bootcamp
*/

//HTML hookup variables
var userGuess = document.getElementById("userGuess"); //TODO link to show past wrong guess
var userAnswer = document.getElementById("userAnswer"); //TODO link to show users right guesses
var userWins = document.getElementById("win"); //TODO link to show users right guesses
var userLoss = document.getElementById("lose"); //TODO link to show users right guesses
var userTries = document.getElementById("tries"); //TODO link to show users right guesses
var tempStart = document.getElementById("start");


//Object Class that holds the game core data
var gameCore = {
    
    winCount: 0,
    loseCount: 0,
    triesLeft: 10,
    wordList: ['TEST!','WORD!','HELLO WORLD'], //List of words for game
    answers: "",
    displayWord: [], //Empty list to display word as '_'
    wrongGuess: [], //Empty list to hold letters that the user guessed wrong
    rightGuess: [], //Empty list to hold letters that the user guessed right

    gameStart: false, //trigger flag for press anykey

    gameReset: function() {
        //Resets the guess list and number of tries
        this.triesLeft = 10;
        this.wrongGuess = [];
        this.rightGuess = [];
        this.displayWord = [];

        //randomly choose new word from list of game words
        this.answers = this.wordList[Math.floor(Math.random() * this.wordList.length)];
        console.log(this.answers); //DEBUG CODE/ GAME CHEAT REMOVE WHEN DONE
        this.displayWordBlank();

        userGuess.textContent = "guess";
        userTries.textContent = this.triesLeft;

    },

    pastGuess: function(letter, state) {
        //Populate wrongGuess or rightGuess lists with the user's past guesses
        if (state == 1){
            //correct guess
            this.rightGuess.push(letter);
        }
        else if (state == 2){
            //incorrect guess
            this.wrongGuess.push(letter);
        }
    },

    displayWordBlank: function() {
        //Display answer word as '_ '
        for (i=0; i<this.answers.length; i++){
            if (isAlpha(this.answers.charCodeAt(i))){
                this.displayWord.push('_');
            }
            else{
                //if the element is not AlphaNumeric leave as is
                this.displayWord.push(this.answers[i]);
            }
        }
        userAnswer.textContent = "";
        for (j=0; j<this.displayWord.length; j++){
            userAnswer.textContent += (this.displayWord[j] + "\xa0"); 
        }
    },
};

//Functions
function isAlpha(keyCode){
    //Function checks if input (event.keyCode) is AlphaNumeric, returns true or false
    //keyCode 48-57 (0-9), 65-90 (A-Z)
    //Note: Keyboard input 65-90 (A-Z == a-Z)
    return ((keyCode >= 65 && keyCode <= 90));
}

function isInWord(letter){
    //Takes a 'string' and returns true if it is part of the answer, false otherwise
    return (gameCore.answers.indexOf(letter) != -1);
}

function replaceBlank(letter){
    //replace '_ ' with the correct letter according to answers
    for (i=0; i<gameCore.displayWord.length; i++){
        if (letter == gameCore.answers[i]){
            gameCore.displayWord[i] = letter;
        }
    }
    userAnswer.textContent = "";
    for (j=0; j<gameCore.displayWord.length; j++){
        userAnswer.textContent += (gameCore.displayWord[j] + "\xa0"); 
    } 
}

function checkAnswer(){
    //Checks if the user got the whole word
    var inputWord = "";
    for (i=0; i<gameCore.displayWord.length; i++){
        inputWord += gameCore.displayWord[i];
    }
    return (inputWord == gameCore.answers);
}

//Main
//Detects a key up event to start or run game
document.onkeyup = function(event){
    if (gameCore.gameStart == false){
        //Game hasn't started, 'press anykey event' flag
        gameCore.gameStart = true;
        tempStart.textContent = "Please enter Letters or Numbers"; //TODO TEMPS

        gameCore.gameReset();

    }
    else if(checkAnswer()){
        gameCore.gameReset();
        tempStart.textContent = "Please enter Letters or Numbers"; //TODO TEMPS
    }
    else if (gameCore.triesLeft > 0){
        //Round is not over
        var userInput = event.key;
        //Check for valid input
        if(isAlpha(event.keyCode)){
            var inputUpper = userInput.toUpperCase();
            //Valid Input, Start Comparing, ignore cases of repeted letter guess
            if (isInWord(inputUpper) && (gameCore.rightGuess.indexOf(inputUpper)==-1)){
                gameCore.pastGuess(inputUpper, 1);
                replaceBlank(inputUpper);

                if(checkAnswer()){
                    //User Win Condition
                    gameCore.winCount++;
                    userWins.textContent = gameCore.winCount;
                    tempStart.textContent = "Press Any Key To Continue"; //TODO TEMPS
                }
            }
            else if ((gameCore.wrongGuess.indexOf(inputUpper)==-1) && (gameCore.rightGuess.indexOf(inputUpper)==-1)){
                gameCore.pastGuess(inputUpper, 2);
                gameCore.triesLeft--;

                //Link values to HTML
                userGuess.textContent += inputUpper;
                userTries.textContent = gameCore.triesLeft;
            }

            //DEBUG CODE REMOVE WHEN DONE
            //console.log("right " + gameCore.rightGuess);
            //console.log("wrong " +gameCore.wrongGuess);
            //console.log(gameCore.triesLeft);
        }
        else{
            //Invalid Input
            alert("Please press only letters!");
        }

    }
    else{
        //Round Lost
        gameCore.gameReset();
        gameCore.loseCount++;
        userLoss.textContent = gameCore.loseCount;
    }
    
}