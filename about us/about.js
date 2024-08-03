// about.js

// Get references to elements
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check if dark mode preference exists in localStorage
if (localStorage.getItem('dark-mode') === 'enabled') {
    document.body.classList.add('dark-mode');
}

// Add event listener to toggle dark mode
darkModeToggle.addEventListener('click', () => {
    // Toggle dark mode class on body
    document.body.classList.toggle('dark-mode');

    // Save dark mode preference to localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('dark-mode', 'enabled');
        darkModeToggle.textContent = '🌞'; // Change icon to sun
    } else {
        localStorage.setItem('dark-mode', 'disabled');
        darkModeToggle.textContent = '🌙'; // Change icon to moon
    }
});
