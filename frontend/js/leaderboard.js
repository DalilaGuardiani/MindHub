const leaderboardData = [
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
        username: "MazeRunner",
        game: "Tic Tac Toe",
        score: 1750
    },
    {
        username: "NeonBrain",
        game: "Memory",
        score: 1420
    }
];

const leaderboardContainer = document.getElementById("leaderboard-container");

function loadLeaderboard() {
    leaderboardContainer.innerHTML = "";

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