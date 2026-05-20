function scrollToGames() {
    const gamesSection = document.getElementById("games");
    const navbar = document.querySelector(".navbar");

    const navbarHeight = navbar.offsetHeight;

    const y =
        gamesSection.getBoundingClientRect().top +
        window.scrollY -
        navbarHeight +
        40;

    window.scrollTo({
        top: y,
        behavior: "smooth"
    });
}

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
