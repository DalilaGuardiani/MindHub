const express = require("express");
const supabase = require("../config/db");
const { validateScore } = require("../schemas/score.schema");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const data = req.body;

    if (!validateScore(data)) {
      return res.status(400).json({
        success: false,
        message: "Dati del punteggio non validi",
        errors: validateScore.errors
      });
    }

    const { data: user } = await supabase
      .from("users")
      .select("id")
      .eq("id", data.userId)
      .maybeSingle();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Utente non trovato"
      });
    }

    const { data: newScore, error } = await supabase
      .from("scores")
      .insert({
        user_id: data.userId,
        game: data.game,
        score: data.score
      })
      .select("id, user_id, game, score, created_at")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Errore durante il salvataggio del punteggio"
      });
    }

    return res.status(201).json({
      success: true,
      message: "Punteggio salvato",
      score: newScore
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Errore interno del server"
    });
  }
});

module.exports = router;
