const leaderboardContainer = document.getElementById("leaderboard-container");
const filterButtons = document.querySelectorAll(".filter-btn");

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

// Recupera i dati della leaderboard in base al filtro scelto
function getLeaderboardData(selectedGame = "All") {
    const savedScores = getSavedScores();

    let data;

    if (savedScores.length === 0) {
        data = defaultLeaderboardData;
    } else {
        data = savedScores;
    }

    if (selectedGame !== "All") {
        data = data.filter(score => score.game === selectedGame);
    }

    return data
        .sort((a, b) => Number(b.score) - Number(a.score))
        .slice(0, 5);
}

// Crea graficamente la leaderboard
function loadLeaderboard(selectedGame = "All") {
    leaderboardContainer.innerHTML = "";

    const leaderboardData = getLeaderboardData(selectedGame);

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

// Avvio iniziale
loadLeaderboard();