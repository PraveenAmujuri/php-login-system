function togglePassword() {
    const p = document.getElementById("password");
    p.type = p.type === "password" ? "text" : "password";
}

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".login-box");
    const email = form.querySelector("input[type='email']");
    const password = document.getElementById("password");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function setError(input, message) {
        input.style.border = "2px solid red";
        input.nextElementSibling?.remove();

        const err = document.createElement("small");
        err.style.color = "red";
        err.innerText = message;

        input.parentElement.appendChild(err);
    }

    function clearError(input) {
        input.style.border = "1px solid #ccc";
        const err = input.parentElement.querySelector("small");
        if (err) err.remove();
    }

    email.addEventListener("input", () => clearError(email));
    password.addEventListener("input", () => clearError(password));

    form.addEventListener("submit", (e) => {
        let valid = true;

        clearError(email);
        clearError(password);

        if (!emailRegex.test(email.value.trim())) {
            setError(email, "Enter a valid email");
            valid = false;
        }

        if (password.value.length < 8) {
            setError(password, "Minimum 8 characters required");
            valid = false;
        }

        if (!valid) e.preventDefault();
    });
});
const params = new URLSearchParams(window.location.search);
const errorBox = document.getElementById("server-error");

if (errorBox) {
    if (params.get("error") === "empty") {
        errorBox.innerText = "All fields are required";
    } else if (params.get("error") === "invalid_email") {
        errorBox.innerText = "Invalid email format";
    } else if (params.get("error") === "weak_password") {
        errorBox.innerText = "Password must be at least 8 characters";
    } else if (params.get("success")) {
        errorBox.style.color = "green";
        errorBox.innerText = "Validation passed (DB coming next)";
    }
}