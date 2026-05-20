/*Per le immagini svg ho usato tabler icone*/ 
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

const memoryWinOverlay = document.getElementById("memory-win-overlay");
const memoryWinText = document.getElementById("memory-win-text");
const memoryNewGameBtn = document.getElementById("memory-new-game-btn");

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
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">?</div>
                <div class="card-back">
                    <img src="../assets/memory/${symbol}" class="memory-icon">
                </div>
            </div>
        `;

        card.addEventListener("click", flipCard);

        grid.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    if (this.classList.contains("matched")) return;

    
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

        memoryWinText.textContent = `Hai completato il Memory in ${moves} mosse.`;

        memoryWinOverlay.classList.add("show");
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
memoryNewGameBtn.addEventListener("click", () => {
    memoryWinOverlay.classList.remove("show");

    restartGame();
});
createBoard();