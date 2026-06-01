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
    profileEmail.textContent = localStorage.getItem("mindhubUserEmail") || "Email non disponibile";
}

// Carica i punteggi dell'utente dal backend
async function loadUserScores() {
    const userId = localStorage.getItem("mindhubUserId");
    
    if (!userId) {
        console.warn("ID utente non trovato, impossibile caricare i punteggi.");
        return;
    }

    if (typeof getUserScores !== "function") {
        console.error("Funzione getUserScores non disponibile");
        return;
    }

    const result = await getUserScores(userId);
    const userScores = result.scores || [];

    // Somma totale dei punti
    const totalPoints = userScores.reduce((total, score) => {
        return total + Number(score.score);
    }, 0);

    if (profilePoints) {
        profilePoints.textContent = totalPoints;
    }

    // Aggiorna statistiche giochi usando le funzioni da scores.js
    if (memoryBest && typeof getBestScore === "function") {
        const memoryScore = await getBestScore("Memory");
        memoryBest.textContent = memoryScore;
    }

    if (sudokuBest && typeof getBestScore === "function") {
        const sudokuScore = await getBestScore("Sudoku");
        sudokuBest.textContent = sudokuScore;
    }

    if (tictactoePoints && typeof getTotalPointsForGame === "function") {
        const tictactoeTotal = await getTotalPointsForGame("Tic Tac Toe");
        tictactoePoints.textContent = tictactoeTotal;
    }

    if (snakeBest && typeof getBestScore === "function") {
        const snakeScore = await getBestScore("Snake");
        snakeBest.textContent = snakeScore;
    }
}

// Carica i punteggi al caricamento della pagina
loadUserScores();

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("mindhubUser");

        window.location.href = "../index.html";
    });
}