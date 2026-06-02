// NAVBAR LOGIN / USER

const loggedUser = localStorage.getItem("mindhubUser");
const loggedUserId = localStorage.getItem("mindhubUserId");

const authLinks = document.getElementById("auth-links");
const userMenu = document.getElementById("user-menu");

const navbarUsername = document.getElementById("navbar-username");
const navbarProfileImage = document.getElementById("navbar-profile-image");
const navbarDefaultAvatar = document.getElementById("navbar-default-avatar");

function showNavbarAvatar(imageName){
    if(!imageName) {
        showNavbarDefaultAvatar();
        return;
    }
    
    if (navbarProfileImage && navbarDefaultAvatar){
        navbarProfileImage.src = `/assets/avatar/${imageName}`;
        navbarProfileImage.style.display = "block";
        navbarDefaultAvatar.style.display = "none";
    }
}

function showNavbarDefaultAvatar() {
    if (navbarProfileImage && navbarDefaultAvatar) {
        navbarProfileImage.src = "";
        navbarProfileImage.style.display = "none";
        navbarDefaultAvatar.style.display = "block";
    }
}

async function loadNavbarAvatar() {
    if (!loggedUserId) {
        showNavbarDefaultAvatar();
        return; 
    }
    try {
        const result = await getUserProfile(loggedUserId);
        if(result.success && result.user.profile_image) {
            showNavbarAvatar(result.user.profile_image);
        } else {
            showNavbarDefaultAvatar();
        }
    } catch (error) {
        console.error("Errore caricamento avatar navbar:", error);
        showNavbarDefaultAvatar();
    }
}

if (loggedUser && authLinks && userMenu && navbarUsername) {
    authLinks.classList.add("hidden"); //nasconde Login e Register
    userMenu.classList.remove("hidden"); // mostra il menu utente
    navbarUsername.textContent = loggedUser; //scrive nella navbar il nome dell'utente
    loadNavbarAvatar();
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