const logoutBtn = document.getElementById("logout-btn");

const profileUsername = document.getElementById("profile-username");
const profileEmail = document.getElementById("profile-email");
const profileUsernameTitle = document.getElementById("profile-username-title");
const loggedUser = localStorage.getItem("mindhubUser");

// Se non c'è nessun utente salvato, rimanda al login
if (!loggedUser) {
    window.location.href = "login.html";
}

// Mostra username nel profilo
if (loggedUser && profileUsername) {
    profileUsername.textContent = loggedUser;
}
if (loggedUser && profileUsernameTitle) {
    profileUsernameTitle.textContent = loggedUser;
}

// Per ora l'email non è disponibile perché non abbiamo ancora il backend
if (profileEmail) {
    profileEmail.textContent = "Not available";
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("mindhubUser");

        window.location.href = "../index.html";
    });
}