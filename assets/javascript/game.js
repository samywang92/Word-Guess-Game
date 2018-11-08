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
    numGuesses : 0,
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
        console.log("cleared");
    },

    compareAndUpdate: function(letter){
        var letterLocation = [];
        var letterFound;
        var previouslyFound;
        for (var i in this.pastGuesses){
            if(letter === this.pastGuesses[i]){
                previouslyFound = true;
            } else {
                previouslyFound = false;
            }
        }
        for(var i in this.currentWord){
            if(letter === this.currentWord[i] && !previouslyFound){
                letterLocation.push(i);
                //this.pastGuesses.push(letter);
                letterFound = true;
            } else if (previouslyFound){
                console.log("letter was previously found");
            } else {
                console.error("invalid input of some sort");
            }
        }
        if(letterFound){
            for(var i in letterLocation){
                this.wordDisplayed[letterLocation[i]] = letter; //updates display
            }
        }else{
            console.error("No letter was found or it was previously inputted");
        }
        wordDisplay.textContent = this.wordDisplayed;
        pastGuessDisplay.textContent = this.pastGuesses;
        letterFound = false; //set letterFound to default;
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
        if(this.pastGuesses.length == 0){
            this.pastGuesses.push(guess);
        }
        for (var i in this.pastGuesses){
            if(!(this.pastGuesses[i].includes(guess))){
                this.pastGuesses.push(guess);
            } 
        }
    },

    getPastGuesses: function(){
        return this.pastGuesses;
    },

    setGuessesLeft: function(maxGuesses){
        return maxGuesses - this.numGuesses;
    }
    
}
// console.log("test generator")
// testVar1 = game.getWordFromBank()
// console.log(testVar1);
// console.log("test convert to array of letters")
// game.convert(testVar1);
// for(var i in game.currentWord){
//     console.log(game.currentWord[i]);
// }
// this.CurrentWord.forEach(element => {
//     console.log(currentWord[element]);
// });
// console.log(this.currentWord.length);
// for(var i = 0; i < this.currentWord.length; i++){
//     console.log(currentWord[i]);
// }


document.onkeyup = function(e) {
    var userInput = e.key;
    userGuessDisplay.textContent = userInput;
    
    if(wordSolved){ //initial start 
        game.clear();
        currentGameWord = game.getWordFromBank();
        console.log(currentGameWord);
        game.convert(currentGameWord);
        game.compareAndUpdate(userInput);
        game.setPastGuesses(userInput);
        wordSolved = false;
    }else{
        game.compareAndUpdate(userInput);
        game.setPastGuesses(userInput);
        wordSolved = game.isWordSolved();
    }
}



