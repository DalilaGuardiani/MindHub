const leaderboardContainer = document.getElementById("leaderboard-container");
const filterButtons = document.querySelectorAll(".filter-btn");

/*
// Dati di esempio mostrati solo se non ci sono ancora punteggi salvati
const defaultLeaderboardData = [
    {
        username: "PlayerOne",
        game: "Memory",
        score: 2450
    },
    {
        username: "CyberMind",
        game: "Sudoku",
        score: 1980
    },
    {
        username: "SnakePro",
        game: "Snake",
        score: 1200
    },
    {
        username: "Strategist",
        game: "Tic Tac Toe",
        score: 900
    }
];

// Recupera i punteggi salvati nel localStorage
function getSavedScores() {
    return JSON.parse(localStorage.getItem("mindhubScores")) || [];
}
*/

const REFRESH_INTERVAL = 30000; // 30 secondi


// Recupera i dati della leaderboard in base al filtro scelto
async function getLeaderboardData(selectedGame = "All") {

    try {
        const response = await getLeaderboard(selectedGame);
        let data= [];

        if (response.success && response.leaderboard) {
            data=response.leaderboard;
        } else {
            console.error("Errore nel recupero della leaderboard:", response.message);
            return [];
        }
    if (selectedGame !== "All") {
        data = data.filter(score => score.game === selectedGame);
    }

    return data
        .sort((a, b) => Number(b.score) - Number(a.score))
        .slice(0, 5); // Prendi solo i primi 5 risultati

    } catch (error) {
        console.error("Errore nella richiesta API:", error);
        return [];
    }
}

// Crea graficamente la leaderboard
async function loadLeaderboard(selectedGame = "All") {
    leaderboardContainer.innerHTML = "";

    const leaderboardData =  await getLeaderboardData(selectedGame);

    if (leaderboardData.length === 0) {
        leaderboardContainer.innerHTML = `
            <p class="empty-leaderboard">
                Nessun punteggio disponibile per ${selectedGame}.
            </p>
        `;
        return;
    }

    leaderboardData.forEach((player, index) => {
        const card = document.createElement("div");

        card.classList.add("leaderboard-card");

        card.innerHTML = `
            <span class="rank">#${index + 1}</span>

            <div class="player-info">
                <h3>${player.username}</h3>
                <p>${player.game} — ${player.score} points</p>
            </div>
        `;

        leaderboardContainer.appendChild(card);
    });
}

// Gestisce il click sui filtri
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        const selectedGame = button.dataset.game;

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        loadLeaderboard(selectedGame);
    });
});


// Funzione per aggiornare la leaderboard ogni 30 secondi
document.addEventListener("DOMContentLoaded", () => {
    loadLeaderboard("All");

    // Aggiorna la leaderboard ogni 30 secondi
    setInterval(() => {
        const activeGame = document.querySelector(".filter-btn.active")
        const selectedGame = activeGame ? activeGame.dataset.game : "All";
        loadLeaderboard(selectedGame);
    }, REFRESH_INTERVAL);
});

// Avvio iniziale
loadLeaderboard();