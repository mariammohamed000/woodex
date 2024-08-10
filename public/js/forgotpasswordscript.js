function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

function sendCode() {
    const email = document.querySelector('.email-field').value;

    if (!validateEmail(email)) {
        alert('Invalid email format. Please enter a valid email.');
        return;
    }

    alert('Code sent to your email!');
}

function signIn(event) {
    event.preventDefault();
    const code = document.querySelector('.code-field').value;
    const newPassword = document.querySelector('.newpassword-field').value;
    const signinLink = document.getElementById('signin-link');
    if (newPassword.length < 8 || !/\d/.test(newPassword) || !/[a-zA-Z]/.test(newPassword)) {
        alert('Password must be at least 8 characters long and contain both letters and numbers.');
        return;
    }

    if (code && newPassword) {
        alert('Password reset successful! You can now sign in with your new password.');
        window.location.href = "/signin";
        alert('Please fill in all fields.');
    }
}

function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
