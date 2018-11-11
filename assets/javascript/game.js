////NOV 5 - Basics of game complete. 
////Need to debug. some times when entering letters over and over, game will just reset ?
////Game only resets after another letter is pushed not immediately after the word is guessed
////Some letters do not show in user's past guess for some reason
////Need to actually implement number of guesses left rules
////Need to implement check if past letter has been entered - complete
////Split game back into game, player, and primary javascript to clean code - ask if you can have multiple javascript files linked or google it

var userGuessDisplay = document.getElementById("user-guess");
var wordDisplay = document.getElementById("word");
var numGuessDisplay = document.getElementById("guesses-left");
var pastGuessDisplay = document.getElementById("past-guesses");
var statusDislay = document.getElementById("status");
var wordSolved = true;
var currentGameWord;

var testVar1;
var testVar2;


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

var game = {
    maxGuesses: 10,
    wordBank: ['kirby','pit','zelda','link','pikachu'],
    currentWord: [], //word pulled from the bank in an array of characters
    //numGuesses : 0,
    wordDisplayed: [], //successful guesses and display// ex: a__l_
    pastGuesses: [],
    isSolved: false,

    isWordSolved: function(){
        for (var i in this.currentWord){
            if(this.currentWord[i] === this.wordDisplayed[i]){
                this.isSolved = true;
            }else{
                this.isSolved = false;
            }
        }
        return this.isSolved;
    },

    clear: function(){ // clears all arrays
        this.currentWord.length = 0;
        this.wordDisplayed.length = 0;
        this.pastGuesses.length = 0;
        this.maxGuesses = 10;
        numGuessDisplay.textContent = this.maxGuesses;
        wordDisplay.innerHTML = "";
        pastGuessDisplay.innerHTML = "";
        userGuessDisplay.innerHTML = "";
        console.log("cleared");
    },

    compareAndUpdate: function(letter){
        var previouslyFound;
        var letterFound = false;
        for (var i in this.pastGuesses){
            if(letter === this.pastGuesses[i]){
                previouslyFound = true;
            } else {
                previouslyFound = false;
            }
        }
        for(var i in this.currentWord){
            if(letter === this.currentWord[i] && !previouslyFound){
                //letterLocation.push(i);
                //this.pastGuesses.push(letter);
                this.wordDisplayed[i] = letter;
                letterFound = true;
            } else if (previouslyFound){
                console.log("letter was previously found");
            } else {
                console.error("incorrect letter");
            }
        }
        if(letterFound===false){
            this.setGuessesLeft();
        }
        wordDisplay.textContent = this.wordDisplayed;
        //pastGuessDisplay.textContent = this.pastGuesses;
    },

    convert: function(word){ // converts word from bank to an array and also updates wordDisplay to have underscores
        for(var i = 0; i < word.length; i++){
            //console.log(word.charAt(i));
            this.currentWord.push(word.charAt(i));
        }

        for(var i = 0; i < this.currentWord.length; i++){
            this.wordDisplayed.push("_");
        }
        wordDisplay.textContent = this.wordDisplayed;
    },

    getWordFromBank: function(){
        var random = getRandomInt(0,this.wordBank.length);
        return this.wordBank[random];
    },

    setPastGuesses: function(guess){
        var index = this.pastGuesses.indexOf(guess);
        if(index === -1) {
            this.pastGuesses.push(guess);
        }
        pastGuessDisplay.textContent = this.pastGuesses;
    },


    setGuessesLeft: function(){
        this.maxGuesses --;
        numGuessDisplay.textContent = this.maxGuesses;
    }
    
}



document.onkeyup = function(e) {
    var userInput = e.key;
    userGuessDisplay.textContent = userInput;

    
    if(wordSolved){//initial start 
        //game.clear();
        currentGameWord = game.getWordFromBank();
        console.log(currentGameWord);
        game.convert(currentGameWord);
        game.compareAndUpdate(userInput);
        game.setPastGuesses(userInput);
        //game.setGuessesLeft();
        wordSolved = false;
    } else if (game.maxGuesses === 0){
        wordSolved = true;
        //alert("Game over!");
        statusDislay.textContent = "You lost.";
        game.clear();

    }else{
        game.compareAndUpdate(userInput);
        game.setPastGuesses(userInput);
        //game.setGuessesLeft();
        wordSolved = game.isWordSolved();
        console.log(game.maxGuesses);
        if(wordSolved === true){
            statusDislay.textContent = "You Won.";
            game.clear();
        }
    }

    

    
}



