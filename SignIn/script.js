// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Handle Sign In
function signIn(event) {
    event.preventDefault();
    const email = document.querySelector('.input-field').value;
    const password = document.querySelector('.password-field').value;
    const signinLink = document.getElementById('signin-link');
    if (!validateEmail(email)) {
        alert('Invalid email format. Please enter a valid email.');
        return;
    }

    if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
        alert('Password must be at least 8 characters long and contain both letters and numbers.');
        return;
    }

    if (email && password) {
        alert('Sign in successful!');
        signinLink.href = '../useraccount/index.html'; // Replace with your actual URL
        window.location.href = signinLink.href;
    } else {
        alert('Please fill in all fields.');
    }
}
 
// Validate Email Format
function validateEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
}
