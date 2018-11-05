var userGuessDisplay = document.getElementById("user-guess");
var wordDisplay = document.getElementById("word");
var numGuessDisplay = document.getElementById("guesses-left");
var pastGuessDisplay = document.getElementById("past-guesses");
var statusDislay = document.getElementById("status");

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

    compareAndUpdate: function(letter){
        var letterLocation = [];
        var letterFound;
        for(var i in this.currentWord){
            if(letter === currentWord[i]){
                letterLocation.push(i);
                letterFound = true;
            }else{
                letterFound = false;
            }
        }
        if(letterFound){
            for(var i in letterLocation){
                this.wordDisplayed[letterLocation[i]] = letter;
                console.log("letter has been updated");
            }
        }else{
            console.error("No letter was found");
        }
    },

    convert: function(word){ // converts word from bank to an array and also updates wordDisplay to have underscores
        for(var i = 0; i < word.length; i++){
            //console.log(word.charAt(i));
            this.currentWord.push(word.charAt(i));
            console.log("letter: " + this.currentWord[i]);
        }

        for(var i = 0; i < this.currentWord; i++){
            this.wordDisplayed.push("_");
            console.log("Testing current word: " + wordDisplayed[i]);
        }

    },

    getWordFromBank: function(){
        var random = getRandomInt(0,this.wordBank.length);
        return this.wordBank[random];
    },

    setPastGuesses: function(guess){
        this.pastGuesses.push(guess);
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




