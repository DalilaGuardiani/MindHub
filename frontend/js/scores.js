// Recupera tutti i punteggi locali dell'utente loggato
function getScores() {
    return JSON.parse(localStorage.getItem("mindhubScores")) || [];
}

// Salva un nuovo punteggio
async function saveScore(game, score) {
    const isGuest = localStorage.getItem("mindhubGuest") === "true";
    const userId = localStorage.getItem("mindhubUserId");
    const username = localStorage.getItem("mindhubUser");

    // Se l'utente è ospite, il punteggio NON viene salvato
    if (isGuest || !userId || !username) {
        console.log("Modalità ospite: punteggio non salvato.");
        return;
    }

    const scores = getScores();

    const newScore = {
        username: username,
        game: game,
        score: score,
        date: new Date().toISOString()
    };

    // Salvataggio locale per statistiche temporanee del frontend
    scores.push(newScore);
    localStorage.setItem("mindhubScores", JSON.stringify(scores));

    // Salvataggio sul backend per classifica globale
    if (typeof saveScoreToBackend === "function") {
        const result = await saveScoreToBackend(userId, game, score);

        if (!result.success) {
            console.error("Errore salvataggio backend:", result.message);
        }
    }
}

// Recupera il miglior punteggio di un gioco specifico
function getBestScore(game) {
    const scores = getScores().filter(score => score.game === game);

    if (scores.length === 0) {
        return 0;
    }

    return Math.max(...scores.map(score => Number(score.score)));
}