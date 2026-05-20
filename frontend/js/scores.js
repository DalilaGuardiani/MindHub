// Recupera tutti i punteggi salvati
function getScores() {
    return JSON.parse(localStorage.getItem("mindhubScores")) || [];
}

// Salva un nuovo punteggio
function saveScore(game, score) {
    const scores = getScores();

    const username = localStorage.getItem("mindhubUser") || "Guest";

    const newScore = {
        username: username,
        game: game,
        score: score,
        date: new Date().toISOString()
    };

    scores.push(newScore);

    localStorage.setItem("mindhubScores", JSON.stringify(scores));
}

// Recupera il miglior punteggio di un gioco specifico
function getBestScore(game) {
    const scores = getScores().filter(score => score.game === game);

    if (scores.length === 0) {
        return 0;
    }

    return Math.max(...scores.map(score => score.score));
}