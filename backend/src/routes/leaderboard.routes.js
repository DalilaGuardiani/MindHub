const express = require("express");
const supabase = require("../config/db");

const router = express.Router();

const allowedGames = ["Memory", "Sudoku", "Tic Tac Toe", "Snake"];

async function getLeaderboard(req, res, selectedGame = null) {
  try {
    // Se il filtro è diverso da All/null, controllo che il gioco sia valido
    if (selectedGame) {
      if (!allowedGames.includes(selectedGame)) {
        return res.status(400).json({
          success: false,
          message: "Gioco non valido"
        });
      }
    }

    // Prendo i punteggi dal database
    let query = supabase
      .from("scores")
      .select(`
        id,
        user_id,
        game,
        score,
        created_at,
        users (
          username
        )
      `);

    // Se è stato scelto un gioco, prendo solo i punteggi di quel gioco
    if (selectedGame) {
      query = query.eq("game", selectedGame);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Errore durante il recupero della leaderboard"
      });
    }

    const totalsByUser = {};

    // Sommo i punteggi per utente
    (data || []).forEach((item) => {
      const userId = item.user_id;
      const username = item.users ? item.users.username : "Utente";
      const points = Number(item.score) || 0;

      if (!totalsByUser[userId]) {
        totalsByUser[userId] = {
          user_id: userId,
          username: username,
          game: selectedGame || "All",
          score: 0
        };
      }

      totalsByUser[userId].score += points;
    });

    // Trasformo l'oggetto in array, ordino dal totale più alto e prendo i primi 10
    const leaderboard = Object.values(totalsByUser)
      .sort((a, b) => Number(b.score) - Number(a.score))
      .slice(0, 10);

    return res.json({
      success: true,
      leaderboard: leaderboard
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Errore interno del server"
    });
  }
}

router.get("/", (req, res) => {
  return getLeaderboard(req, res, req.query.game || null);
});

router.get("/:game", (req, res) => {
  return getLeaderboard(req, res, req.params.game);
});

module.exports = router;