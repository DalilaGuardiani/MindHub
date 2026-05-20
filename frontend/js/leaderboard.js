const leaderboardContainer = document.getElementById("leaderboard-container");

// Dati di esempio da mostrare solo se non ci sono ancora punteggi salvati
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
    }
];

// Recupera i punteggi salvati nel localStorage
function getSavedScores() {
    return JSON.parse(localStorage.getItem("mindhubScores")) || [];
}

// Ordina i punteggi dal più alto al più basso
function getLeaderboardData() {
    const savedScores = getSavedScores();

    if (savedScores.length === 0) {
        return defaultLeaderboardData;
    }

    return savedScores
        .sort((a, b) => b.score - a.score)
        .slice(0, 5);
}

// Crea graficamente la leaderboard
function loadLeaderboard() {
    leaderboardContainer.innerHTML = "";

    const leaderboardData = getLeaderboardData();

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

loadLeaderboard();