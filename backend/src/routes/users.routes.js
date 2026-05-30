const express = require("express");
const supabase = require("../config/db");

const router = express.Router();

function buildStats(scores) {
  const stats = {
    totalPoints: 0,
    bestByGame: {
      Memory: 0,
      Sudoku: 0,
      "Tic Tac Toe": 0,
      Snake: 0
    }
  };

  scores.forEach((item) => {
    const score = Number(item.score);
    stats.totalPoints += score;

    if (score > stats.bestByGame[item.game]) {
      stats.bestByGame[item.game] = score;
    }
  });

  return stats;
}

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { data: user, error: userError } = await supabase
      .from("users")
      .select("id, username, email, created_at")
      .eq("id", id)
      .maybeSingle();

    if (userError || !user) {
      return res.status(404).json({
        success: false,
        message: "Utente non trovato"
      });
    }

    const { data: scores, error: scoresError } = await supabase
      .from("scores")
      .select("id, game, score, created_at")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (scoresError) {
      return res.status(500).json({
        success: false,
        message: "Errore durante il recupero delle statistiche"
      });
    }

    const stats = buildStats(scores || []);

    return res.json({
      success: true,
      user: {
        ...user,
        totalPoints: stats.totalPoints,
        stats: stats.bestByGame
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Errore interno del server"
    });
  }
});

router.get("/:id/scores", async (req, res) => {
  try {
    const { id } = req.params;

    const { data: scores, error } = await supabase
      .from("scores")
      .select("id, game, score, created_at")
      .eq("user_id", id)
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Errore durante il recupero dei punteggi"
      });
    }

    return res.json({
      success: true,
      scores: scores || [],
      stats: buildStats(scores || [])
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Errore interno del server"
    });
  }
});

module.exports = router;
