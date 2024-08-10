const toggle = document.querySelector("#darkmode-toggle");

toggle.addEventListener("change", function () {
    if (this.checked) {
        // Toggle button is checked
        document.body.classList.add('dark-mode');
    } else {
        // Toggle button is unchecked
        document.body.classList.remove('dark-mode');
    }
});

function handleButtonClick(event) {
    const button = event.target.closest('a');
    if (button) {
        const gridItem = button.closest('.grid-item');
        const itemName = gridItem.getAttribute('data-name');
        const itemCategory = gridItem.getAttribute('data-category');

        if (button.classList.contains('cart')) {
            addToCart(itemName);
        } else if (button.classList.contains('wishlist')) {
            alert(`Added ${itemName} to the wishlist.`);
        }
    }
}

function addToCart(itemName) {
    const isSignedIn = document.body.getAttribute('data-signed-in') === 'true';
    
    if (!isSignedIn) {
        alert('You must be signed in to add items to the cart.');
        window.location.href = '/sign'; // Redirect to sign page
    } else {
        alert(`Added ${itemName} to the cart.`);
    }
}

// Add event listener to handle button clicks
document.querySelectorAll('.btn.cart, .btn.wishlist').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
