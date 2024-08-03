function toggleLike(button) {
    button.classList.toggle('liked');
    button.textContent = button.classList.contains('liked') ? '❤️' : '🤍';
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}
