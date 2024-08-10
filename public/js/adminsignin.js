function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
}

// function signIn(event) {
//     event.preventDefault(); // Prevent the default action of the anchor tag

//     const email = document.querySelector('.input-field').value;
//     const password = document.querySelector('.password-field').value;
//     const mobile = document.querySelector('.mobile-field').value;
//     const address = document.querySelector('.address-field').value;
//     const picture = document.querySelector('.picture-field').files[0];
//     const signinLink = document.getElementById('signin-link');

//     if (email === 'ismail@example.com' && password === 'password') {
//         // Here, you can handle the mobile, address, and picture fields as needed
//         signinLink.href = "/adminprofile"; 
//         window.location.href = signinLink.href; 
//     } else {
//         alert('Invalid credentials');
//     }
// }
