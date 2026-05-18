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