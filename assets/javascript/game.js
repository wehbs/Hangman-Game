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
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  lettersinWord = selectedWord.split("");
  numBlanks = lettersinWord.length;

  // Reset
  guessesLeft = 9;
  wrongLetters = [];
  blanksAndSuccesses = [];

  // Populate blanks and successes with right number of blanks.
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  // Change HTML to reflect round conditions
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  document.getElementById("remain").innerHTML = guessesLeft;
  document.getElementById("wins").innerHTML = winCount;

  // Testing / Debugging
  console.log(selectedWord);
  console.log(lettersinWord);
  console.log(numBlanks);
  console.log(blanksAndSuccesses);
}

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
