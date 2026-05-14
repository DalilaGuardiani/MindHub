const cards = [
   "brain.svg", "brain.svg",
   "alien.svg", "alien.svg",
   "bolt.svg", "bolt.svg",
   "device-gamepad-2.svg", "device-gamepad-2.svg",
   "rocket.svg", "rocket.svg",
   "ufo.svg", "ufo.svg"
];

const grid = document.getElementById("memory-grid");
const movesText = document.getElementById("moves");
const matchesText = document.getElementById("matches");
const winMessage = document.getElementById("win-message");
const restartBtn = document.getElementById("restart-btn");

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matches = 0;

function shuffleCards() {
    return cards.sort(() => Math.random() - 0.5);
}

function createBoard() {
    grid.innerHTML = "";
    winMessage.textContent = "";

    const shuffledCards = shuffleCards();

    shuffledCards.forEach(symbol => {
        const card = document.createElement("div");

        card.classList.add("memory-card");
        card.dataset.symbol = symbol;
        card.textContent = "?";

        card.addEventListener("click", flipCard);

        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains("matched")) return;

    this.innerHTML = `<img src="../assets/memory/${this.dataset.symbol}" class="memory-icon">`;
    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    moves++;
    movesText.textContent = moves;

    checkMatch();
}

function checkMatch() {
    if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add("matched");
        secondCard.classList.add("matched");

        matches++;
        matchesText.textContent = matches;

        resetTurn();
        checkWin();
    } else {
        lockBoard = true;

        setTimeout(() => {
            firstCard.innerHTML= "?";
            secondCard.innerHTML = "?";

            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");

            resetTurn();
        }, 800);
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function checkWin() {
    if (matches === 6) {
        winMessage.textContent = `Hai vinto in ${moves} mosse!`;
    }
}

function restartGame() {
    moves = 0;
    matches = 0;
    firstCard = null;
    secondCard = null;
    lockBoard = false;

    movesText.textContent = moves;
    matchesText.textContent = matches;

    createBoard();
}

restartBtn.addEventListener("click", restartGame);

createBoard();