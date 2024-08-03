function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

function signIn(event) {
    event.preventDefault(); // Prevent the default action of the anchor tag

    const email = document.querySelector('.input-field').value;
    const password = document.querySelector('.password-field').value;
    const signinLink = document.getElementById('signin-link');

    if (email === 'ismail@example.com' && password === 'password') {
        // Redirect to the specified URL if credentials are correct
        signinLink.href = '../adminprofile/adminprofile.html'; // Replace with your actual URL
        window.location.href = signinLink.href; // Navigate to the URL
    } else {
        alert('Invalid credentials');
    }
}
