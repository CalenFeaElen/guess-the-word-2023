// The unordered list where the player's guessed letters will appear
let guessedLettersElement = document.querySelector(".guessed");
// The submit button
let button = document.querySelector(".button");
// The text input where the player will guess a letter
let guess = document.querySelector("#guess");
//The empty paragraph where the word in progress will appear.
let secretWord = document.querySelector(".word");
// paragraph where the remaining guesses will display.
let remaining = document.querySelector("#remaining");
// span inside the paragraph where the remaining guesses will display.
let numOfRemaining = document.querySelector(".remaining");
// empty paragraph where messages will appear when the player guesses a letter.
let message = document.querySelector(".player-msg");
// hidden button that will appear prompting the player to play again.
let playAgainButton = document.querySelector("#play-again");

const word = "Magnolia";
const guessedLetters = [];

const placeholder = function (word) {
  const placeholderLetters = [];
  for (const letter of word) {
    console.log(letter);
    placeholderLetters.push(" 🐾 ");
  }
  secretWord.innerText = placeholderLetters.join("");
};

placeholder(word);

button.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guessed = guess.value;
  const goodGuess = checkInput(guessed);
  if (goodGuess) {
    makeGuess(guessed);
  }
  guess.value = "";
});

const checkInput = function (guessedLetter) {
  const acceptedLetter = /[a-zA-Z]/;
  if (guessedLetter.length === 0) {
    message.innerText = "Please enter a letter.";
  } else if (guessedLetter.length > 1) {
    message.innerText = "Only enter one letter per guess.";
  } else if (!guessedLetter.match(acceptedLetter)) {
    message.innerText = "Please enter a letter from A to Z.";
  } else return guessedLetter;
};

const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if (guessedLetters.includes(guess)) {
    message.innerText = "You already guessed that letter, silly. Try again";
  } else {
    guessedLetters.push(guess);
    console.log(guessedLetters);
  }
};
