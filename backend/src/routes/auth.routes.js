const express = require("express");
const bcrypt = require("bcryptjs");
const supabase = require("../config/db");
const { validateRegister, validateLogin } = require("../schemas/auth.schema");

const router = express.Router();

router.post("/register", async (req, res) => {

  try {
    const data = req.body;

    if (!validateRegister(data)) {
      return res.status(400).json({
        success: false,
        message: "Dati di registrazione non validi",
        errors: validateRegister.errors
      });
    }

    const username = data.username.trim();
    const email = data.email.trim().toLowerCase();
    const passwordHash = await bcrypt.hash(data.password, 10);

    const { data: existingUser } = await supabase
      .from("users")
      .select("id")
      .or(`username.eq.${username},email.eq.${email}`)
      .maybeSingle();

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username o email già registrati"
      });
    }

    const { data: newUser, error } = await supabase
      .from("users")
      .insert({
        username: username,
        email: email,
        password_hash: passwordHash
      })
      .select("id, username, email, created_at")
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        message: "Errore durante la registrazione"
      });
    }

    return res.status(201).json({
      success: true,
      message: "Registrazione completata",
      user: newUser
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Errore interno del server"
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const data = req.body;

    if (!validateLogin(data)) {
      return res.status(400).json({
        success: false,
        message: "Dati di login non validi",
        errors: validateLogin.errors
      });
    }

    const email = data.email.trim().toLowerCase();

    const { data: user, error } = await supabase
      .from("users")
      .select("id, username, email, password_hash, created_at")
      .eq("email", email)
      .maybeSingle();

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: "Email o password non corretti"
      });
    }

    const passwordOk = await bcrypt.compare(data.password, user.password_hash);

    if (!passwordOk) {
      return res.status(401).json({
        success: false,
        message: "Email o password non corretti"
      });
    }

    delete user.password_hash;

    return res.json({
      success: true,
      message: "Login effettuato",
      user: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Errore interno del server"
    });
  }
});

module.exports = router;
