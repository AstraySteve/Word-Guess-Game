/*
    Steven Tran
    Assignment 3 Javascript file, 2018
    UofT SCS Coding Bootcamp
*/

//HTML hookup variables
var userGuess = document.getElementById("userGuess"); //TODO link to show past wrong guess
var userAnswer = document.getElementById("userAnswer"); //TODO link to show users right guesses

//Object Class that holds the game core data
var gameCore = {
    
    winCount: 0,
    loseCount: 0,
    triesLeft: 10,
    wordList: ['test','word','Hello World'], //List of words for game
    wrongGuess: [], //Empty list to hold letters that the user guessed wrong
    rightGuess: [], //Empty list to hold letters that the user guessed right

    gameStart: false, //trigger flag for press anykey

    gameReset: function() {
        //Resets the guess list and number of tries
        this.triesLeft = 10;
        this.wrongGuess = [];
        this.rightGuess = [];
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
};

//Functions
function isAlphaNum(x){
    //Function checks if input (event.keyCode) is AlphaNumeric, returns true or false
    //keyCode 48-57 (0-9), 65-90 (A-Za-z)
    return ((x >= 48 && x <= 57)||(x >= 65 && x <= 90));
}

//Main
//var answer = gameCore.wordList[Math.floor(Math.random() * gameCore.wordList.length)];
//Detects a key up event to start or run game
document.onkeyup = function(event){
    if (gameCore.gameStart == false){
        //Game hasn't started, 'press anykey event' flag
        gameCore.gameStart = true;
    }
    else if (gameCore.triesLeft > 0){
        //Round is not over
        var userInput = event.key;
        
        if(isAlphaNum(event.keyCode)){
            //Valid Input, Start Comparing
            alert("Hello World!");
        }
        else{
            //Invalid Input
            alert("Please press a valid key!");
        }

    }
    else{
        //Round Lost
    }
    
}