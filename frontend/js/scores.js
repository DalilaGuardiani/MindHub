// Recupera i punteggi dell'utente dal backend
async function getScores() {
    const userId = localStorage.getItem("mindhubUserId");
    
    if (!userId) {
        return [];
    }

    if (typeof getUserScores === "function") {
        const result = await getUserScores(userId);
        return result.scores || [];
    }
    
    return [];
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

    // Salvataggio sul backend
    if (typeof saveScoreToBackend === "function") {
        const result = await saveScoreToBackend(userId, game, score);

        if (!result.success) {
            console.error("Errore salvataggio backend:", result.message);
        }
    }
}

// Recupera il miglior punteggio di un gioco specifico
async function getBestScore(game) {
    const scores = await getScores();
    const gameScores = scores.filter(score => score.game === game);

    if (gameScores.length === 0) {
        return 0;
    }

    return Math.max(...gameScores.map(score => Number(score.score)));
}

// Recupera la somma totale dei punti di un gioco
async function getTotalPointsForGame(gameName) {
    const scores = await getScores();
    const gameScores = scores.filter(score => score.game === gameName);

    return gameScores.reduce((total, score) => {
        return total + Number(score.score);
    }, 0);
}