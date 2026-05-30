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
