const board = document.getElementById("snake-board");
const scoreElement = document.getElementById("score");
const bestScoreElement = document.getElementById("best-score");
const message = document.getElementById("snake-message");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

const upBtn = document.getElementById("up-btn");
const downBtn = document.getElementById("down-btn");
const leftBtn = document.getElementById("left-btn");
const rightBtn = document.getElementById("right-btn");

const snakeGameOverOverlay = document.getElementById("snake-gameover-overlay");
const snakeGameOverText = document.getElementById("snake-gameover-text");
const snakeNewGameBtn = document.getElementById("snake-new-game-btn");

const boardSize = 18;
const totalCells = boardSize * boardSize;

let snake = [40, 39, 38];
let food = 120;
let direction = 1;
let nextDirection = 1;

let score = 0;
let bestScore = localStorage.getItem("snakeBestScore") || 0;

let gameInterval = null;
let gameRunning = false;

bestScoreElement.textContent = bestScore;

/* Crea tutte le celle della griglia */
function createBoard() {
    board.innerHTML = "";

    for (let i = 0; i < totalCells; i++) {
        const cell = document.createElement("div");
        cell.classList.add("snake-cell");
        board.appendChild(cell);
    }

    drawGame();
}

/* Disegna serpente e cibo */
function drawGame() {
    const cells = document.querySelectorAll(".snake-cell");

    cells.forEach(cell => {
        cell.classList.remove("snake", "food");
    });

    snake.forEach(index => {
        cells[index].classList.add("snake");
    });

    cells[food].classList.add("food");
}

/* Avvio del gioco */
function startGame() {
    if (gameRunning) {
        return;
    }

    gameRunning = true;
    message.textContent = "Usa frecce, WASD o controlli touch";

    gameInterval = setInterval(moveSnake, 180);
}

/* Reset totale della partita */
function restartGame() {
    clearInterval(gameInterval);

    snake = [40, 39, 38];
    food = 120;
    direction = 1;
    nextDirection = 1;

    score = 0;
    scoreElement.textContent = score;

    gameRunning = false;
    message.textContent = "Premi Start per iniziare";

    generateFood();
    drawGame();
}

/* Movimento principale */
function moveSnake() {
    direction = nextDirection;

    const head = snake[0];
    const newHead = head + direction;

    if (hasCollision(newHead)) {
        endGame();
        return;
    }

    snake.unshift(newHead);

    if (newHead === food) {
        score += 10;
        scoreElement.textContent = score;

        generateFood();
    } else {
        snake.pop();
    }

    drawGame();
}

/* Controlla collisioni con bordi e corpo */
function hasCollision(newHead) {
    const head = snake[0];

    const hitLeftWall = head % boardSize === 0 && direction === -1;
    const hitRightWall = head % boardSize === boardSize - 1 && direction === 1;
    const hitTopWall = newHead < 0;
    const hitBottomWall = newHead >= totalCells;

    const hitBody = snake.includes(newHead);

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall || hitBody;
}

/* Genera cibo in una cella libera */
function generateFood() {
    do {
        food = Math.floor(Math.random() * totalCells);
    } while (snake.includes(food));
}

/* Fine partita */
function endGame() {
    clearInterval(gameInterval);
    gameRunning = false;

    message.textContent = "Game Over!";

    saveScore("Snake", score);
    
    if (score > bestScore) {
        bestScore = score;
        localStorage.setItem("snakeBestScore", bestScore);
        bestScoreElement.textContent = bestScore;
    }

    snakeGameOverText.textContent = `Score: ${score} | Best: ${bestScore}`;
    snakeGameOverOverlay.classList.add("show");
}

/* Cambia direzione evitando inversioni impossibili */
function changeDirection(newDirection) {
    const oppositeDirection = direction * -1;

    if (newDirection === oppositeDirection) {
        return;
    }

    nextDirection = newDirection;
}

/* Tastiera desktop */
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        changeDirection(-boardSize);
    }

    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        changeDirection(boardSize);
    }

    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        changeDirection(-1);
    }

    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        changeDirection(1);
    }
});

/* Controlli mobile */
upBtn.addEventListener("click", () => changeDirection(-boardSize));
downBtn.addEventListener("click", () => changeDirection(boardSize));
leftBtn.addEventListener("click", () => changeDirection(-1));
rightBtn.addEventListener("click", () => changeDirection(1));

/* Bottoni */
startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);

snakeNewGameBtn.addEventListener("click", () => {
    snakeGameOverOverlay.classList.remove("show");
    restartGame();
    startGame();
});

/* Avvio */
createBoard();