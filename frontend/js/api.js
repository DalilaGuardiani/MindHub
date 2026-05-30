const API_URL = "/api";

async function apiRequest(endpoint, method = "GET", body = null) {
    try {
        const options = {
        method: method,
        headers: {"Content-Type": "application/json"}
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    const response = await fetch(`${API_URL}${endpoint}`, options);
    const data = await response.json();

    return data;

    } catch (error) {
        console.error("Errore nella richiesta API:", error);
        return {
            success: false,
            message: "Errore di connessione al server"
    };
  }
}

function loginUser(email, password) {
    return apiRequest("/auth/login", "POST", {
        email: email,
        password: password
    });
}

function registerUser(username, email, password) {
    return apiRequest("/auth/register", "POST", {
        username: username,
        email: email,
        password: password
    });
}

function getLeaderboard() {
    return apiRequest("/leaderboard");
}

function saveScoreToBackend(userId, game, score) {
    return apiRequest("/scores", "POST", {
        userId: userId,
        game: game,
        score: score
    });
}

function getUserProfile(userId) {
    return apiRequest(`/users/${userId}`);
}

function getUserScores(userId) {
    return apiRequest(`/users/${userId}/scores`);
}