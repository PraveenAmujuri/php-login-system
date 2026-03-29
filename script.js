console.log("JS loaded");
function togglePassword() {
    const p = document.getElementById("password");
    if (p) p.type = p.type === "password" ? "text" : "password";
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    if (!form) return;

    const email = form.querySelector("input[type='email']");
    const password = form.querySelector("input[type='password']");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(input, message) {
        if (!input) return;
        input.style.border = "2px solid red";

        const oldError = input.parentElement.querySelector("small");
        if (oldError) oldError.remove();

        const err = document.createElement("small");
        err.style.color = "red";
        err.innerText = message;
        input.parentElement.appendChild(err);
    }

    function clearError(input) {
        if (!input) return;
        input.style.border = "1px solid #ccc";

        const err = input.parentElement.querySelector("small");
        if (err) err.remove();
    }

    if (email) email.addEventListener("input", () => clearError(email));
    if (password) password.addEventListener("input", () => clearError(password));

    // client-side validation
    form.addEventListener("submit", (e) => {
        let valid = true;

        clearError(email);
        clearError(password);

        if (email && !emailRegex.test(email.value.trim())) {
            setError(email, "Enter a valid email");
            valid = false;
        }

        if (password && password.value.length < 8) {
            setError(password, "Minimum 8 characters required");
            valid = false;
        }

        if (!valid) e.preventDefault();
    });

    // server response handling (login page)
    const errorBox = document.getElementById("server-error");

    if (errorBox) {
        const params = new URLSearchParams(window.location.search);
        const error = params.get("error");

        if (error === "empty") {
            errorBox.innerText = "Please fill all fields";
        } else if (error === "invalid_email") {
            errorBox.innerText = "Enter a valid email address";
        } else if (error === "weak_password") {
            errorBox.innerText = "Password must be at least 8 characters";
        } else if (error === "user_not_found") {
            errorBox.innerHTML = `User not found. <a href="signup.html">Create an account</a>`;
        } else if (error === "wrong_password") {
            errorBox.innerText = "Incorrect password";
        }else if (error === "user_exists") {
            errorBox.innerHTML = `Account already exists. <a href="index.html">Login</a>`;
        } 
        else if (error === "failed") {
            errorBox.innerText = "Something went wrong. Try again.";
        }
    }
});