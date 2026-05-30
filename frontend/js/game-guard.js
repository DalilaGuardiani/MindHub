const loggedUserId = localStorage.getItem("mindhubUserId");
const isGuest = localStorage.getItem("mindhubGuest") === "true";

if (!loggedUserId && !isGuest) {
    alert("Per giocare devi effettuare il login oppure continuare come ospite.");
    window.location.href = "../index.html#games";
}