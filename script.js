const words = ["javascript", "hangman", "coding", "programming", "developer"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingGuesses = 6;

const wordDisplay = document.getElementById("word-display");
const letterButtons = document.getElementById("letter-buttons");
const message = document.getElementById("message");

function initializeGame() {
    for (let i = 0; i < selectedWord.length; i++) {
        guessedLetters.push("_");
    }
    wordDisplay.textContent = guessedLetters.join(" ");
    createLetterButtons();
}

function createLetterButtons() {
    for (let i = 65; i <= 90; i++) {
        const button = document.createElement("button");
        button.textContent = String.fromCharCode(i);
        button.addEventListener("click", () => guessLetter(button.textContent));
        letterButtons.appendChild(button);
    }
}

function guessLetter(letter) {
    let correctGuess = false;
    for (let i = 0; i < selectedWord.length; i++) {
        if (selectedWord[i].toUpperCase() === letter) {
            guessedLetters[i] = selectedWord[i];
            correctGuess = true;
        }
    }

    if (!correctGuess) {
        remainingGuesses--;
    }

    wordDisplay.textContent = guessedLetters.join(" ");
    checkGameStatus();
}

function checkGameStatus() {
    if (guessedLetters.join("") === selectedWord) {
        message.textContent = "Congratulations! You've won!";
        disableAllButtons();
    } else if (remainingGuesses === 0) {
        message.textContent = `Game Over! The word was: ${selectedWord}`;
        disableAllButtons();
    }
}

function disableAllButtons() {
    const buttons = document.querySelectorAll("#letter-buttons button");
    buttons.forEach(button => {
        button.disabled = true;
    });
}

initializeGame();
