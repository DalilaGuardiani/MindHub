// Griglia iniziale: 0 significa cella vuota
const initialBoard = [
    [5, 3, 0, 0, 7, 0, 0, 0, 0],
    [6, 0, 0, 1, 9, 5, 0, 0, 0],
    [0, 9, 8, 0, 0, 0, 0, 6, 0],
    [8, 0, 0, 0, 6, 0, 0, 0, 3],
    [4, 0, 0, 8, 0, 3, 0, 0, 1],
    [7, 0, 0, 0, 2, 0, 0, 0, 6],
    [0, 6, 0, 0, 0, 0, 2, 8, 0],
    [0, 0, 0, 4, 1, 9, 0, 0, 5],
    [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

// Soluzione corretta della griglia
const solutionBoard = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

const boardElement = document.getElementById("sudoku-board");
const numberButtons = document.querySelectorAll(".number-btn");
const checkBtn = document.getElementById("check-btn");
const resetBtn = document.getElementById("reset-btn");
const message = document.getElementById("sudoku-message");

let selectedCell = null;
let currentBoard = [];

// Copia la griglia iniziale
function copyBoard(board) {
    return board.map(row => [...row]);
}

// Crea la griglia HTML
function createBoard() {
    boardElement.innerHTML = "";
    message.textContent = "";

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

// Seleziona una cella vuota
function selectCell() {
  if (selectedCell) {
    selectedCell.classList.remove("selected");
  }

  selectedCell = this;
  selectedCell.classList.add("selected");

  message.textContent = "";
}


// Inserisce un numero nella cella selezionata
function insertNumber(number) {
    if (!selectedCell) {
        message.textContent = "Seleziona prima una cella.";
        return;
    }

    const row = selectedCell.dataset.row;
    const col = selectedCell.dataset.col;

    selectedCell.textContent = number;
    currentBoard[row][col] = Number(number);
}

// Controlla se la griglia è corretta
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
        message.textContent = "Ci sono degli errori.";
        message.style.color = "#ff0055";
        return;
    }

    if (hasEmptyCells) {
        message.textContent = "Ci sono ancora celle vuote.";
        message.style.color = "#00ffff";
        return;
    }

    message.textContent = "Complimenti! Sudoku completato!";
    message.style.color = "#00ffff";
}

// Reset della partita
function resetSudoku() {
    selectedCell = null;
    createBoard();
}

// Eventi bottoni numerici
numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        insertNumber(button.dataset.number);
    });
});

// Eventi bottoni azione
checkBtn.addEventListener("click", checkSudoku);
resetBtn.addEventListener("click", resetSudoku);

// Avvio gioco
createBoard();