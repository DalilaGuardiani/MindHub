const loginForm = document.querySelector("#login-form");
const registerForm = document.querySelector("#register-form");

if (loginForm) {
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;

        const result = await loginUser(email, password);

        console.log("Risposta login:", result);

        const usernameFromEmail = email.split("@")[0];

        localStorage.setItem("mindhubUser", usernameFromEmail);

        window.location.href = "../index.html";
        //con il backend 
        /*localStorage.setItem("mindhubUser", result.user.username);
        window.location.href = "../index.html";*/ 
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

        /*alert(result.message || "Registrazione inviata al backend");*/
        localStorage.setItem("mindhubUser", username);
        window.location.href = "../index.html";
    });
}