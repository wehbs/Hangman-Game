// GLOBAL VARIABLES
var wordOptions = ["bitcoin", "ethereum", "litecoin"];
var selectedWord = "";
var lettersinWord = [];
var numBlanks = 0;
var blanksAndSuccesses = [];
var wrongLetters = [];

// Game Counters
var winCount = 0;
var guessesLeft = 9;

// FUNCTIONS
function startGame() {
  // Chooses a random word from my wordOptions array.
  selectedWord = wordOptions[Math.floor(Math.random() * wordOptions.length)];
  // Fills in the lettersinWord variable with the value of the random word chosen and then splits the contents of the string into multiple items in an array.
  lettersinWord = selectedWord.split("");
  // Figures out how many blanks I need based on the length of the random word that was chosen and injects that value into the numBlanks variable.
  numBlanks = lettersinWord.length;

  // Reset's these variables after a win or lose.
  guessesLeft = 9;
  wrongLetters = [];
  blanksAndSuccesses = [];

  // Populate blanksAndSuccesses array with right number of blanks based on the length of the random word chosen / .push = push an item into an array.
  for (var i = 0; i < numBlanks; i++) {
    blanksAndSuccesses.push("_");
  }

  // Change the wordToGuess HTML ID by joining the elements of my blanksAndSuccesses array into a String.
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  // Change the amount of guesses left within my remain HTML ID to the value of my guessesLeft variable.
  document.getElementById("remain").innerHTML = guessesLeft;
  // Change the amount of wins within my wins HTML ID to the value of my guessesLeft variable.
  document.getElementById("wins").innerHTML = winCount;

}
// Function that contains a new variabe to hold the boolean value true/false of whether the letter is in the word or not. It does this by initially assigning the value of false to the isLetterInWord variabe. Then it assigns the argument (letter) to the function. The argument is later changed to run the "letterGuessed" variable which is found later in the code and also now "letter" and "letterGuessed" are the same value which contains the letter pressed by the user. Since numBlanks is already equal to lettersinWord.length I can use it in the for loop. Then if the the letter pressed matches one of the letters from the selected word it is true if not is false which tells if the letter even exists in the word at all.
function checkLetters(letter) {
  var isLetterInWord = false;
  for (var i = 0; i < numBlanks; i++) {
    if (selectedWord[i] == letter) {
      isLetterInWord = true;
    }
  }

  // Check where in the word the letter exists, then replace the location of letter in the word which has the placeholer "_" from blanksAndSuccesses.push earlier in the code with the correct letter in the blanksAndSuccesses array.
  if (isLetterInWord) {
    for (var i = 0; i < numBlanks; i++) {
      if (selectedWord[i] == letter) {
        blanksAndSuccesses[i] = letter;
      }

    }

  }

  // If the letter was not found it uses .push to move that letter into the "wrongLetters" array. It also decreases value of "guessesLeft" by 1.
  else {
    wrongLetters.push(letter);
    guessesLeft--
  }

}

function roundComplete() {
  // Change the amount of guesses left within my remain HTML ID to the value of my guessesLeft variable.
  document.getElementById("remain").innerHTML = guessesLeft;
  // Change the wordToGuess HTML ID by joining the elements of my blanksAndSuccesses array into a String.
  document.getElementById("wordToGuess").innerHTML = blanksAndSuccesses.join(" ");
  // Takes the wrong letters and joins them into a string which fills in the HTML element with ID guessed.
  document.getElementById("guessed").innerHTML = wrongLetters.join(" ");

  // Check if user won then add 1 to win count and show an alert saying you won.
  if (lettersinWord.toString() == blanksAndSuccesses.toString()) {
    winCount++;
    alert("You Won!");

    // Update the win counter in the HTML to match the winCount variable.
    document.getElementById("wins").innerHTML = winCount;

    startGame();

  }

  // Check if the user lost.
  else if (guessesLeft == 0) {
    alert("You Lost!");

    startGame();

  }

}


// Start the game for the first time.
startGame();

// Register keyclicks.

document.onkeyup = function(event) {
  var letterGuessed = String.fromCharCode(event.keyCode).toLowerCase();
  checkLetters(letterGuessed);
  roundComplete();

}

// Show keyboard on mobile browsers.

document.getElementById('openKeyboard').addEventListener('click', function() {
  var inputElement = document.getElementById('hiddenInput');
  inputElement.style.visibility = 'visible'; // unhide the input.
  inputElement.focus(); // focus on it so keyboard pops.
  inputElement.style.visibility = 'hidden'; // hide it again.
});
