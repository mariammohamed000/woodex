// Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}

// Handle Sign Up
// async function signIn(event) {
//     event.preventDefault();

//     // Get form data
//     const email = document.querySelector('.input-field').value;
//     const name = document.querySelector('.name-field').value;
//     const password = document.querySelector('.password-field').value;
//     const confirmPassword = document.querySelector('.confirmpassword-field').value;
//     const mobile = document.querySelector('.mobile-field').value;
//     const address = document.querySelector('.address-field').value;
//     const picture = document.querySelector('.picture-field').files[0]; // File upload

//     // Basic validation
//     if (!validateEmail(email)) {
//         alert('Invalid email format. Please enter a valid email.');
//         return;
//     }

//     if (!validateMobile(mobile)) {
//         alert('Invalid mobile number. Please enter a valid 11-digit mobile number.');
//         return;
//     }

//     if (password.length < 8 || !/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
//         alert('Password must be at least 8 characters long and contain both letters and numbers.');
//         return;
//     }

//     if (password !== confirmPassword) {
//         alert('Passwords do not match. Please try again.');
//         return;
//     }

//     // Prepare form data for submission
//     const formData = new FormData();
//     formData.append('email', email);
//     formData.append('name', name);
//     formData.append('password', password);
//     formData.append('mobile', mobile);
//     formData.append('address', address);
//     if (picture) {
//         formData.append('profilePicture', picture); // Append file
//     }

//     try {
//         // Send data to server
//         const response = await fetch('/signup', { // Use relative path for the local server
//             method: 'POST',
//             body: formData
//         });

//         const result = await response.json();
//         if (response.ok) {
//             alert('Sign up successful!');
//             window.location.href = "/useraccount"; // Redirect after successful sign-up
//         } else {
//             alert(result.error || 'Sign up failed. Please try again.');
//         }
//     } catch (err) {
//         console.error('Error:', err);
//         alert('An error occurred. Please try again.');
//     }
    
// }

// // Validate Email Format
// function validateEmail(email) {
//     const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
//     return re.test(String(email).toLowerCase());
// }

// // Validate Mobile Number Format
// function validateMobile(mobile) {
//     const re = /^\d{11}$/;
//     return re.test(String(mobile));
// }

// // Attach event listener for form submission
// document.getElementById('signup-form').addEventListener('submit', signIn);
