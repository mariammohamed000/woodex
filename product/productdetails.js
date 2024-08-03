const toggle = document.querySelector("#darkmode-toggle");

let bg = document.body;

toggle.addEventListener("change", function () {
  if (this.checked) {
    // Toggle button is checked
    // Perform actions for the checked state
    bg.style.backgroundColor = "black";
  } else {
    // Toggle button is unchecked
    // Perform actions for the unchecked state
    bg.style.backgroundColor = "white";
  }
});

function handleButtonClick(event) {
    const button = event.target.closest('button');
    if (button) {
        const gridItem = button.closest('.grid-item');
        const itemName = gridItem.getAttribute('data-name');
        const itemCategory = gridItem.getAttribute('data-category');

        if (button.classList.contains('cart')) {
            alert(`Added ${itemName} to the cart.`);
        } else if (button.classList.contains('wishlist')) {
            alert(`Added ${itemName} to the wishlist.`);
        }
    }
}

// Add event listener to handle button clicks
document.querySelectorAll('.btn.cart, .btn.wishlist').forEach(button => {
    button.addEventListener('click', handleButtonClick);
});
