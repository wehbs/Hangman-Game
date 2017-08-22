// GLOBAL VARIABLES
// =====================================================================
// Arrays and Variables for holding data
var wordOptions = ["bitcoin", "ethereum", "litecoin"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// Game Counters
var winCount = 0;
var guessesLeft = 9;

// FUNCTIONS (Reusable blocks of code that I will call upon when needed)
// =====================================================================
function startGame() {
  // Chooses a random word from my wordOptions array
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  // Fills in the lettersinWord variable with the value of the random word chosen and then splits the contents of the string into multiple items in an array
  lettersinWord = selectedWord.split("");
  // Figures out how many blanks I need based on the length of the random word that was chosen and injects that value into the numBlanks variable
  numBlanks = lettersinWord.length;

  // Reset's these variables after a win or lose
  guessesLeft = 9;
  wrongLetters = [];
  blanksAndSuccesses = [];

  // Populate blanksAndSuccesses array with right number of blanks based on the length of the random word chosen / .push = push an item into an array
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  // Change the wordToGuess HTML ID by joining the elements of my blanksAndSuccesses array into a String
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  // Change the amount of guesses left within my remain HTML ID to the value of my guessesLeft variable
  document.getElementById("remain").innerHTML = guessesLeft;
  // Change the amount of wins within my wins HTML ID to the value of my guessesLeft variable
  document.getElementById("wins").innerHTML = winCount;

}
  // Function that creates a new variabe to hold the value of whether the letter is in the word or not. It does this by initially assigning the value of false to the isLetterInWord variabe. Then it assigns the argument letter to the function. 
function checkLetters(letter) {
  // Check if letter exist in word at all
  var isLetterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (selectedWord[i] == letter) {
      isLetterInWord = true;
    }
  }

  // Check where in the word the letter exists, then populate out blanksAndSuccesses array.
  if (isLetterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if (selectedWord[i] == letter) {
        blanksAndSuccesses[i] = letter;
      }

    }

  }

  // Letter wasn't found
  else {
    wrongLetters.push(letter);
    guessesLeft--
  }

  // Testing / Debugging
  console.log(blanksAndSuccesses);

}

function roundComplete() {
  console.log("Win Count: " + winCount + " | Guesses Left: " + guessesLeft);

  // Update the HTML to reflect the most recent count stats
  document.getElementById("remain").innerHTML = guessesLeft;
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("guessed").innerHTML = wrongLetters.join(" ");

  // Check if user won
  if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
    winCount++;
    alert("You Won!");

    // Update the win counter in the HTML
    document.getElementById("wins").innerHTML = winCount;

    startGame();

  }

  // Check if the user lost
  else if (guessesLeft == 0) {
    alert("You Lost!");

    startGame();

  }

}

// MAIN PROCESS
// =====================================================================

// Initiates the code the first time
startGame();

// Register keyclicks

document.onkeyup = function(event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();

  // Testing / Debugging
  console.log(letterGuessed);
}

// Show keyboard on mobile browsers

document.getElementById('openKeyboard').addEventListener('click', function(){
  var inputElement = document.getElementById('hiddenInput');
  inputElement.style.visibility = 'visible'; // unhide the input
  inputElement.focus(); // focus on it so keyboard pops
  inputElement.style.visibility = 'hidden'; // hide it again
});
