const words = ["javascript", "hangman", "coding", "programming", "developer"];
let selectedWord = words[Math.floor(Math.random() * words.length)];
let guessedLetters = [];
let remainingGuesses = 6;

const wordDisplay = document.getElementById("word-display");
const letterButtons = document.getElementById("letter-buttons");
const message = document.getElementById("message");
const hangmanCanvas = document.getElementById("hangman-canvas");
const ctx = hangmanCanvas.getContext("2d");

function initializeGame() {
    for (let i = 0; i < selectedWord.length; i++) {
        guessedLetters.push("_");
    }
    wordDisplay.textContent = guessedLetters.join(" ");
    createLetterButtons();
    drawHangman();
}

function createLetterButtons() {
    for (let i = 65; i <= 90; i++) {
        const button = document.createElement("button");
        button.textContent = String.fromCharCode(i);
        button.dataset.letter = String.fromCharCode(i);
        button.addEventListener("click", (event) => {
            guessLetter(event.target.dataset.letter);
            event.target.disabled = true; // Disable button after click
        });
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

    if (correctGuess) {
        document.querySelector(`button[data-letter="${letter}"]`).classList.add("correct");
    } else {
        document.querySelector(`button[data-letter="${letter}"]`).classList.add("incorrect");
        remainingGuesses--;
    }

    wordDisplay.textContent = guessedLetters.join(" ");
    checkGameStatus();
    drawHangman();
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

function drawHangman() {
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#000";

    // Draw base
    ctx.beginPath();
    ctx.moveTo(10, 190);
    ctx.lineTo(190, 190);
    ctx.stroke();

    // Draw pole
    ctx.beginPath();
    ctx.moveTo(50, 190);
    ctx.lineTo(50, 20);
    ctx.lineTo(150, 20);
    ctx.lineTo(150, 40);
    ctx.stroke();

    if (remainingGuesses < 6) {
        // Draw head
        ctx.beginPath();
        ctx.arc(150, 60, 20, 0, Math.PI * 2);
        ctx.stroke();
    }

    if (remainingGuesses < 5) {
        // Draw body
        ctx.beginPath();
        ctx.moveTo(150, 80);
        ctx.lineTo(150, 140);
        ctx.stroke();
    }

    if (remainingGuesses < 4) {
        // Draw left arm
        ctx.beginPath();
        ctx.moveTo(150, 100);
        ctx.lineTo(120, 120);
        ctx.stroke();
    }

    if (remainingGuesses < 3) {
        // Draw right arm
        ctx.beginPath();
        ctx.moveTo(150, 100);
        ctx.lineTo(180, 120);
        ctx.stroke();
    }

    if (remainingGuesses < 2) {
        // Draw left leg
        ctx.beginPath();
        ctx.moveTo(150, 140);
        ctx.lineTo(120, 170);
        ctx.stroke();
    }

    if (remainingGuesses < 1) {
        // Draw right leg
        ctx.beginPath();
        ctx.moveTo(150, 140);
        ctx.lineTo(180, 170);
        ctx.stroke();
    }
}

initializeGame();
