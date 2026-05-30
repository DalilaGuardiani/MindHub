const express = require("express");
const supabase = require("../config/db");

const router = express.Router();

const allowedGames = ["Memory", "Sudoku", "Tic Tac Toe", "Snake"];

async function getLeaderboard(req, res, selectedGame = null) {
  try {
    let query = supabase
      .from("scores")
      .select(`
        id,
        game,
        score,
        created_at,
        users (
          username
        )
      `)
      .order("score", { ascending: false })
      .limit(10);

    if (selectedGame) {
      if (!allowedGames.includes(selectedGame)) {
        return res.status(400).json({
          success: false,
          message: "Gioco non valido"
        });
      }

      query = query.eq("game", selectedGame);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Errore durante il recupero della leaderboard"
      });
    }

    const leaderboard = (data || []).map((item) => ({
      id: item.id,
      username: item.users ? item.users.username : "Utente",
      game: item.game,
      score: item.score,
      date: item.created_at
    }));

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
