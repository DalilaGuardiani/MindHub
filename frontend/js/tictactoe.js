const cells = document.querySelectorAll(".cell");
const modeOverlay = document.getElementById("mode-overlay");
const statusText = document.getElementById("game-status");

const pvpBtn = document.getElementById("pvp-btn");
const cpuBtn = document.getElementById("cpu-btn");
const resetBtn = document.getElementById("reset-btn");

const resultOverlay = document.getElementById("result-overlay");
const resultTitle = document.getElementById("result-title");
const resultText = document.getElementById("result-text");
const playAgainBtn = document.getElementById("play-again-btn");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let gameMode = "";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

pvpBtn.addEventListener("click", () => startGame("pvp"));
cpuBtn.addEventListener("click", () => startGame("cpu"));
resetBtn.addEventListener("click", resetGame);

cells.forEach(cell => {
  cell.addEventListener("click", handleCellClick);
});

function startGame(mode) {
  gameMode = mode;
  gameActive = true;
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];

  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("x", "o");
  });

  if (mode === "pvp") {
    statusText.textContent = "Modalità: Player vs Player — Turno di X";
  } else {
    statusText.textContent = "Modalità: Player vs CPU — Turno di X";
  }
  modeOverlay.classList.add("hidden");
}

function handleCellClick() {
  const index = this.dataset.index;

  if (!gameActive || board[index] !== "") {
    return;
  }

  makeMove(index, currentPlayer);

  if (checkWinner(currentPlayer)) {
    let finalScore;

    if (gameMode == "cpu") {
      finalScore = 500;
    }else {
      finalScore = 300;
    }

    saveScore("Tic Tac Toe", finalScore);

    showResult(
      `${currentPlayer} ha vinto!`,
      `Complimenti! Score: ${finalScore}`
    );

    gameActive = false;
    return;
    }

  if (checkDraw()) {
    let finalScore = 0;

    saveScore("Tic Tac Toe", finalScore);
    showResult(
      "Pareggio!",
      "Nessun giocatore ha vinto."
    );
    
    gameActive = false;
    return;
  }

  if (gameMode === "cpu") {
    currentPlayer = "O";
    statusText.textContent = "Turno della CPU";

    setTimeout(cpuMove, 500);
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Turno di ${currentPlayer}`;
  }
}

function makeMove(index, player) {
  board[index] = player;

  const cell = cells[index];
  cell.textContent = player;

  if (player === "X") {
    cell.classList.add("x");
  } else {
    cell.classList.add("o");
  }
}

function cpuMove() {
  if (!gameActive) return;

  const emptyCells = board
    .map((value, index) => value === "" ? index : null)
    .filter(index => index !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

  makeMove(randomIndex, "O");

  if (checkWinner("O")) {
    const finalScore = -100;

    saveScore("Tic Tac Toe", finalScore);

    showResult(
      "La CPU ha vinto!",
      `Hai perso ${Math.abs(finalScore)} punti.`
    );

    gameActive = false;
    return;
  }

  if (checkDraw()) {
    const finalScore = 0;

    saveScore("Tic Tac Toe", finalScore);
    showResult(
      "Pareggio!",
      "Nessun giocatore ha vinto."
    );

    gameActive = false;
    return;
  }

  currentPlayer = "X";
  statusText.textContent = "Turno di X";
}

function checkWinner(player) {
  return winningCombinations.some(combination => {
    return combination.every(index => board[index] === player);
  });
}

function checkDraw() {
  return board.every(cell => cell !== "");
}

function resetGame() {
  if (!gameMode) {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => {
      cell.textContent = "";
      cell.classList.remove("x", "o");
    });
    statusText.textContent = "Seleziona una modalità";
    gameActive = false;
    return;
  }

  startGame(gameMode);
}

function showResult(title, text) {

  resultTitle.textContent = title;
  resultText.textContent = text;

  resultOverlay.classList.add("show");
}

playAgainBtn.addEventListener("click", () => {

  resultOverlay.classList.remove("show");

  startGame(gameMode);
});