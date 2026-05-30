const logoutBtn = document.getElementById("logout-btn");

const profileUsername = document.getElementById("profile-username");
const profileUsernameTitle = document.getElementById("profile-username-title");
const profileEmail = document.getElementById("profile-email");
const profilePoints = document.getElementById("profile-points");

const memoryBest = document.getElementById("memory-best");
const sudokuBest = document.getElementById("sudoku-best");
const tictactoePoints = document.getElementById("tictactoe-points");
const snakeBest = document.getElementById("snake-best");

const loggedUser = localStorage.getItem("mindhubUser");

// Se non c'è nessun utente salvato, rimanda al login
if (!loggedUser) {
    alert("Devi essere loggato per accedere al profilo.");
    window.location.href = "login.html";
}

// Mostra username nel profilo
if (loggedUser && profileUsername) {
    profileUsername.textContent = loggedUser;
}

if (loggedUser && profileUsernameTitle) {
    profileUsernameTitle.textContent = loggedUser;
}

// Per ora l'email non è disponibile perché non abbiamo ancora il backend
if (profileEmail) {
    profileEmail.textContent = "Not available";
}

// Recupera tutti i punteggi salvati
const allScores = JSON.parse(localStorage.getItem("mindhubScores")) || [];

// Prende solo i punteggi dell'utente loggato
const userScores = allScores.filter(score => score.username === loggedUser);

// Somma totale dei punti
const totalPoints = userScores.reduce((total, score) => {
    return total + Number(score.score);
}, 0);

if (profilePoints) {
    profilePoints.textContent = totalPoints;
}

// Funzione per prendere il miglior punteggio di un gioco
function getBestScore(gameName) {
    const gameScores = userScores.filter(score => score.game === gameName);

    if (gameScores.length === 0) {
        return 0;
    }

    return Math.max(...gameScores.map(score => Number(score.score)));
}

// Funzione per sommare i punti di un gioco
function getTotalPointsForGame(gameName) {
    const gameScores = userScores.filter(score => score.game === gameName);

    return gameScores.reduce((total, score) => {
        return total + Number(score.score);
    }, 0);
}

// Aggiorna statistiche giochi
if (memoryBest) {
    memoryBest.textContent = getBestScore("Memory");
}

if (sudokuBest) {
    sudokuBest.textContent = getBestScore("Sudoku");
}

if (tictactoePoints) {
    tictactoePoints.textContent = getTotalPointsForGame("Tic Tac Toe");
}

if (snakeBest) {
    snakeBest.textContent = getBestScore("Snake");
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("mindhubUser");

        window.location.href = "../index.html";
    });
}