const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;

        const result = await loginUser(email, password);

        if (result.success) {
            localStorage.removeItem("mindhubGuest");

            localStorage.setItem("mindhubUser", result.user.username);
            localStorage.setItem("mindhubUserId", result.user.id);
            localStorage.setItem("mindhubUserEmail", result.user.email);    

            window.location.href = "../index.html";
        } else {
            alert(result.message || "Errore durante il login.");
        }
        
    });
}

if (registerForm) {
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const username = document.querySelector("#register-username").value;
        const email = document.querySelector("#register-email").value;
        const password = document.querySelector("#register-password").value;
        const confirmPassword = document.querySelector("#register-confirm-password").value;

        if (password !== confirmPassword) {
            alert("Le password non coincidono");
            return;
        }

        const result = await registerUser(username, email, password);

        console.log("Risposta registrazione:", result);

        if (result.success) {
            localStorage.removeItem("mindhubGuest");
            
            localStorage.setItem("mindhubUser", result.user.username);
            localStorage.setItem("mindhubUserId", result.user.id);
            localStorage.setItem("mindhubUserEmail", result.user.email);

            window.location.href = "../index.html";
        } else {
            alert(result.message || "Registrazione non riuscita");
        }
    });
}