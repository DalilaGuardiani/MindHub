require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./src/routes/auth.routes");
const usersRoutes = require("./src/routes/users.routes");
const scoresRoutes = require("./src/routes/scores.routes");
const leaderboardRoutes = require("./src/routes/leaderboard.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ["http://localhost:5500", "http://127.0.0.1:5500", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

/*Serve i file statici del frontend*/
app.use(express.static(path.join(__dirname, "../frontend")));
/*Homepage del sito*/
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend MindHub attivo"
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/scores", scoresRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Endpoint non trovato"
  });
});

app.listen(PORT, () => {
  console.log(`Server MindHub avviato su http://localhost:${PORT}`);
});
