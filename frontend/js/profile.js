const logoutBtn = document.getElementById("logout-btn");

const profileUsername = document.getElementById("profile-username");
const profileUsernameTitle = document.getElementById("profile-username-title");
const profileEmail = document.getElementById("profile-email");
const profilePoints = document.getElementById("profile-points");

const memoryBest = document.getElementById("memory-best");
const sudokuBest = document.getElementById("sudoku-best");
const tictactoePoints = document.getElementById("tic-tac-toe-points");
const snakeBest = document.getElementById("snake-best");

const profileImageInput = document.getElementById("profile-image-input");
const profileImage = document.getElementById("profile-image");
const defaultAvatar = document.getElementById("default-avatar");
const removeProfileImageBtn = document.getElementById("remove-profile-image");

const loggedUser = localStorage.getItem("mindhubUser");
const loggedUserId = localStorage.getItem("mindhubUserId");
const loggedUserEmail = localStorage.getItem("mindhubUserEmail");

// Se non c'è nessun utente salvato, rimanda al login
if (!loggedUser) {
    alert("Devi essere loggato per accedere al profilo.");
    window.location.href = "login.html";
}

function showProfileImage(imageSrc) {
    if (profileImage && defaultAvatar) {
        profileImage.src = imageSrc;
        profileImage.style.display = "block";
        defaultAvatar.style.display = "none";
    }
}

function showDefaultAvatar() {
    if (profileImage && defaultAvatar) {
        profileImage.src = "";
        profileImage.style.display = "none";
        defaultAvatar.style.display = "block";
    }
}

async function loadUserProfile() {
    try {
        const result = await getUserProfile(loggedUserId);

        if (result.success) {
            const user = result.user;

            if (profileUsername) {
                profileUsername.textContent = user.username;
            }

            if (profileUsernameTitle) {
                profileUsernameTitle.textContent = user.username;
            }

            if (profileEmail) {
                profileEmail.textContent = user.email;
            }

            if (user.profile_image) {
                showProfileImage(user.profile_image);
            } else {
                showDefaultAvatar();
            }

        } else {
            console.error(result.message);
            showDefaultAvatar();
        }

    } catch (error) {
        console.error("Errore caricamento profilo:", error);

        if (profileUsername) {
            profileUsername.textContent = loggedUser;
        }

        if (profileUsernameTitle) {
            profileUsernameTitle.textContent = loggedUser;
        }

        if (profileEmail) {
            profileEmail.textContent = loggedUserEmail || "Not available";
        }

        showDefaultAvatar();
    }
}

async function loadProfileScores() {
    let userScores = [];

    try {
        const result = await getUserScores(loggedUserId);

        if (result.success) {
            userScores = result.scores.map(score => {
                return {
                    game: score.game,
                    score: Number(score.score),
                    date: score.created_at
                };
            });
        } else {
            console.error(result.message);
        }

    } catch (error) {
        console.error("Errore caricamento punteggi:", error);
    }

    const totalPoints = userScores.reduce((total, score) => {
        return total + Number(score.score);
    }, 0);

    if (profilePoints) {
        profilePoints.textContent = totalPoints;
    }

    function getBestScore(gameName) {
        const gameScores = userScores.filter(score => score.game === gameName);

        if (gameScores.length === 0) {
            return 0;
        }

        return Math.max(...gameScores.map(score => Number(score.score)));
    }

    function getTotalPointsForGame(gameName) {
        const gameScores = userScores.filter(score => score.game === gameName);

        return gameScores.reduce((total, score) => {
            return total + Number(score.score);
        }, 0);
    }

    if (memoryBest) {
        memoryBest.textContent = getBestScore("Memory");
    }

    if (sudokuBest) {
        sudokuBest.textContent = getBestScore("Sudoku");
    }

    if (tictactoePoints) {
        tictactoePoints.textContent = getTotalPointsForGame("Tic Tac Toe");
    }

    if (snakeBest) {
        snakeBest.textContent = getBestScore("Snake");
    }
}

if (profileImageInput) {
    profileImageInput.addEventListener("change", () => {
        const file = profileImageInput.files[0];

        if (!file) {
            return;
        }

        if (!file.type.startsWith("image/")) {
            alert("Devi scegliere un file immagine.");
            return;
        }

        if (file.size > 1000000) {
            alert("L'immagine è troppo grande. Scegli un'immagine sotto 1 MB.");
            return;
        }

        const reader = new FileReader();

        reader.onload = async () => {
            const imageBase64 = reader.result;

            try {
                const result = await updateProfileImage(loggedUserId, imageBase64);

                if (result.success) {
                    showProfileImage(imageBase64);
                    alert("Immagine profilo aggiornata.");
                } else {
                    alert(result.message || "Errore durante il salvataggio dell'immagine.");
                }

            } catch (error) {
                console.error("Errore salvataggio immagine:", error);
                alert("Errore di connessione al server.");
            }
        };

        reader.readAsDataURL(file);
    });
}

if (removeProfileImageBtn) {
    removeProfileImageBtn.addEventListener("click", async () => {
        try {
            const result = await deleteProfileImage(loggedUserId);

            if (result.success) {
                showDefaultAvatar();

                if (profileImageInput) {
                    profileImageInput.value = "";
                }

                alert("Immagine profilo rimossa.");
            } else {
                alert(result.message || "Errore durante la rimozione dell'immagine.");
            }

        } catch (error) {
            console.error("Errore rimozione immagine:", error);
            alert("Errore di connessione al server.");
        }
    });
}

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("mindhubUser");
        localStorage.removeItem("mindhubUserId");
        localStorage.removeItem("mindhubUserEmail");
        localStorage.removeItem("mindhubGuest");

        window.location.href = "../index.html";
    });
}

loadUserProfile();
loadProfileScores();