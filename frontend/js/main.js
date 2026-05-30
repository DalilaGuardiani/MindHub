// NAVBAR LOGIN / USER

const loggedUser = localStorage.getItem("mindhubUser");

const authLinks = document.getElementById("auth-links");
const userMenu = document.getElementById("user-menu");
const navbarUsername = document.getElementById("navbar-username");

if (loggedUser && authLinks && userMenu && navbarUsername) {
    authLinks.classList.add("hidden");
    userMenu.classList.remove("hidden");
    navbarUsername.textContent = loggedUser;
}

// MODALITÀ OSPITE PER ACCESSO AI GIOCHI

const gameLinks = document.querySelectorAll(".game-link");
const guestModal = document.getElementById("guest-modal");
const continueGuestBtn = document.getElementById("continue-guest-btn");
const closeGuestModal = document.getElementById("close-guest-modal");

let selectedGameUrl = null;

gameLinks.forEach(link => {
    link.addEventListener("click", function (event) {
        const loggedUserId = localStorage.getItem("mindhubUserId");
        const isGuest = localStorage.getItem("mindhubGuest") === "true";

        if (loggedUserId || isGuest) {
            return;
        }

        event.preventDefault();

        selectedGameUrl = this.getAttribute("href");

        if (guestModal) {
            guestModal.classList.remove("hidden");
        }
    });
});

if (continueGuestBtn) {
    continueGuestBtn.addEventListener("click", () => {
        localStorage.setItem("mindhubGuest", "true");

        if (selectedGameUrl) {
            window.location.href = selectedGameUrl;
        }
    });
}

if (closeGuestModal) {
    closeGuestModal.addEventListener("click", () => {
        if (guestModal) {
            guestModal.classList.add("hidden");
        }

        selectedGameUrl = null;
    });
}