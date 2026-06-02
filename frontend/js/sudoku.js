const sudokuGames = [

  {
    puzzle: [
      [5, 3, 0, 0, 7, 0, 0, 0, 0],
      [6, 0, 0, 1, 9, 5, 0, 0, 0],
      [0, 9, 8, 0, 0, 0, 0, 6, 0],
      [8, 0, 0, 0, 6, 0, 0, 0, 3],
      [4, 0, 0, 8, 0, 3, 0, 0, 1],
      [7, 0, 0, 0, 2, 0, 0, 0, 6],
      [0, 6, 0, 0, 0, 0, 2, 8, 0],
      [0, 0, 0, 4, 1, 9, 0, 0, 5],
      [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],

    solution: [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ]
  },

  {
    puzzle: [
      [0, 0, 0, 2, 6, 0, 7, 0, 1],
      [6, 8, 0, 0, 7, 0, 0, 9, 0],
      [1, 9, 0, 0, 0, 4, 5, 0, 0],
      [8, 2, 0, 1, 0, 0, 0, 4, 0],
      [0, 0, 4, 6, 0, 2, 9, 0, 0],
      [0, 5, 0, 0, 0, 3, 0, 2, 8],
      [0, 0, 9, 3, 0, 0, 0, 7, 4],
      [0, 4, 0, 0, 5, 0, 0, 3, 6],
      [7, 0, 3, 0, 1, 8, 0, 0, 0]
    ],

    solution: [
      [4, 3, 5, 2, 6, 9, 7, 8, 1],
      [6, 8, 2, 5, 7, 1, 4, 9, 3],
      [1, 9, 7, 8, 3, 4, 5, 6, 2],
      [8, 2, 6, 1, 9, 5, 3, 4, 7],
      [3, 7, 4, 6, 8, 2, 9, 1, 5],
      [9, 5, 1, 7, 4, 3, 6, 2, 8],
      [5, 1, 9, 3, 2, 6, 8, 7, 4],
      [2, 4, 8, 9, 5, 7, 1, 3, 6],
      [7, 6, 3, 4, 1, 8, 2, 5, 9]
    ]
  },

  {
    puzzle: [
      [0, 2, 0, 6, 0, 8, 0, 0, 0],
      [5, 8, 0, 0, 0, 9, 7, 0, 0],
      [0, 0, 0, 0, 4, 0, 0, 0, 0],
      [3, 7, 0, 0, 0, 0, 5, 0, 0],
      [6, 0, 0, 0, 0, 0, 0, 0, 4],
      [0, 0, 8, 0, 0, 0, 0, 1, 3],
      [0, 0, 0, 0, 2, 0, 0, 0, 0],
      [0, 0, 9, 8, 0, 0, 0, 3, 6],
      [0, 0, 0, 3, 0, 6, 0, 9, 0]
    ],

    solution: [
      [1, 2, 3, 6, 7, 8, 9, 4, 5],
      [5, 8, 4, 2, 3, 9, 7, 6, 1],
      [9, 6, 7, 1, 4, 5, 3, 2, 8],
      [3, 7, 2, 4, 6, 1, 5, 8, 9],
      [6, 9, 1, 5, 8, 3, 2, 7, 4],
      [4, 5, 8, 7, 9, 2, 6, 1, 3],
      [8, 3, 6, 9, 2, 4, 1, 5, 7],
      [2, 1, 9, 8, 5, 7, 4, 3, 6],
      [7, 4, 5, 3, 1, 6, 8, 9, 2]
    ]
  }

];

let initialBoard;
let solutionBoard;
function chooseRandomSudoku() {

    const randomIndex =
        Math.floor(Math.random() * sudokuGames.length);

    initialBoard =
        sudokuGames[randomIndex].puzzle;

    solutionBoard =
        sudokuGames[randomIndex].solution;
}

const boardElement = document.getElementById("sudoku-board");
const numberButtons = document.querySelectorAll(".number-btn");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");
const message = document.getElementById("sudoku-message");
const winOverlay = document.getElementById("win-overlay");
const newGameBtn = document.getElementById("new-game-btn");
const sudokuTime = document.getElementById("sudoku-time");

let selectedCell = null;
let currentBoard = [];
let seconds = 0;
let timerInterval = null;
let timerStarted = false;

// Copia la griglia iniziale
function copyBoard(board) {
    return board.map(row => [...row]);
}

function startTimer() {
    if (timerStarted) {
        return;
    }

    timerStarted = true;

    timerInterval = setInterval(() => {
        seconds++;
        sudokuTime.textContent = seconds;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerStarted = false;
}

function resetTimer() {
    clearInterval(timerInterval);
    seconds = 0;
    timerStarted = false;
    sudokuTime.textContent = seconds;
}

// Crea la griglia HTML
function createBoard() {
    boardElement.innerHTML = "";
    message.textContent = "";
    selectedCell = null; //con il reset non rimane selezionata nessuna cella

    currentBoard = copyBoard(initialBoard);

    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            const cell = document.createElement("div");

            cell.classList.add("sudoku-cell");

            cell.dataset.row = row;
            cell.dataset.col = col;

            const value = currentBoard[row][col];

            if (value !== 0) {
                cell.textContent = value;
                cell.classList.add("fixed");
            } else {
                cell.addEventListener("click", selectCell);
            }

            boardElement.appendChild(cell);
        }
    }
}

function selectCell() {
  if (selectedCell) {
    selectedCell.classList.remove("selected");
  }

  selectedCell = this;
  selectedCell.classList.add("selected");

  message.textContent = "";
}

function insertNumber(number) {
    if (!selectedCell) {
        message.textContent = "Select a cell first.";
        return;
    }

    const row = selectedCell.dataset.row;
    const col = selectedCell.dataset.col;

    selectedCell.textContent = number;
    selectedCell.classList.remove("error");
    currentBoard[row][col] = Number(number);
}

function checkSudoku() {
    let hasErrors = false;
    let hasEmptyCells = false;

    const cells = document.querySelectorAll(".sudoku-cell");

    cells.forEach(cell => {
        cell.classList.remove("error");

        const row = Number(cell.dataset.row);
        const col = Number(cell.dataset.col);

        const value = currentBoard[row][col];

        if (value === 0) {
            hasEmptyCells = true;
            return;
        }

        if (value !== solutionBoard[row][col]) {
            cell.classList.add("error");
            hasErrors = true;
        }
    });

    if (hasErrors) {
        message.textContent = "There are some mistakes.";
        message.style.color = "#ff0055";
        return;
    }

    if (hasEmptyCells) {
        message.textContent = "There are still empty cells.";
        message.style.color = "#00ffff";
        return;
    }

   const finalScore = Math.max(1000 - seconds, 100);

    saveScore("Sudoku", finalScore);

    message.textContent = "Congratulations! Sudoku completed!";
    message.style.color = "#00ffff";
    winOverlay.classList.add("show");
    
}

function resetSudoku() {
    currentBoard = copyBoard(initialBoard);

    createBoard();

    resetTimer();
    startTimer();

    message.textContent = "";
}

// Eventi bottoni numerici
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        insertNumber(button.dataset.number);
    });
});

newGameBtn.addEventListener("click", () => {
    chooseRandomSudoku();
    createBoard();
    resetTimer();
    startTimer();
    winOverlay.classList.remove("show");
});

// Eventi bottoni azione
checkBtn.addEventListener("click", checkSudoku);
resetBtn.addEventListener("click", resetSudoku);

// Avvio gioco
chooseRandomSudoku();
createBoard();
startTimer();