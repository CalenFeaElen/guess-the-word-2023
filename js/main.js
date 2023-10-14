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
let playAgainButton = document.querySelector(".play-again");
// Section where the player enters their input
let playerInput = document.querySelector(".player-input");

let word = "";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
  const response = await fetch(
    "https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt"
  );
  const words = await response.text();
  const wordArray = words.split("\n");
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  placeholder(word);
};

getWord();

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
    guessesRemaining(guess);
    showGuesses();
    updateWord(guessedLetters);
  }
};

const showGuesses = function () {
  guessedLettersElement.innerHTML = "";
  for (const letter of guessedLetters) {
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersElement.append(li);
  }
};

const updateWord = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordUpperArray = wordUpper.split("");
  const revealWord = [];
  for (const letter of wordUpperArray) {
    if (guessedLetters.includes(letter)) {
      revealWord.push(letter.toUpperCase());
    } else {
      revealWord.push("🐾");
    }
  }
  console.log(revealWord);
  secretWord.innerText = revealWord.join("");
  checkIfWon();
};

const guessesRemaining = function (guess) {
  const upperWord = word.toUpperCase();
  if (!upperWord.includes(guess)) {
    message.innerText = `Sorry. There is no ${guess}. Guess again.`;
    remainingGuesses -= 1;
  } else {
    message.innerText = `Good guess! The word has the letter ${guess}.`;
  }

  if (remainingGuesses === 0) {
    message.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`;
    startOver();
  } else if (remainingGuesses === 1) {
    numOfRemaining.innerText = `${remainingGuesses} guess `;
  } else {
    numOfRemaining.innerText = `${remainingGuesses} guesses `;
  }
};

const checkIfWon = function () {
  if (word.toUpperCase() === secretWord.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
    startOver();
  }
};

const startOver = function () {
  button.classList.add("hide");
  remaining.classList.add("hide");
  guessedLettersElement.classList.add("hide");
  playAgainButton.classList.remove("hide");
  playerInput.classList.add("hide");
};

playAgainButton.addEventListener("click", function () {
  message.classList.remove("win");
  guessedLetters = [];
  remainingGuesses = 8;
  numOfRemaining.innerText = `${remainingGuesses} guesses `;
  guessedLettersElement.innerHTML = "";
  message.innerText = "";
  getWord();

  button.classList.remove("hide");
  playAgainButton.classList.add("hide");
  remaining.classList.remove("hide");
  guessedLettersElement.classList.remove("hide");
  playerInput.classList.remove("hide");
});
