function toggleLike(button, userId, prodId) {
  button.classList.toggle("liked");
  button.textContent = button.classList.contains("liked") ? "❤️" : "🤍";
  console.log(userId, prodId);
  fetch(`http://localhost:3000/likeditems/remove/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prodId }),
  })
    .then((response) => {
      if (response.ok) {
        window.location.reload();
      } else {
        alert("Something went wrong");
      }
    })
    .catch((err) => {
      alert(err);
    });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

async function addToCart(userId, prodId) {
  console.log(userId);
  console.log(prodId);
  fetch(`http://localhost:3000/cart/add/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prodId }),
  })
    .then((response) => {
      if (response.ok) {
        alert("Added to cart");
      } else {
        alert("Product already exist in cart");
      }
    })
    .catch((err) => {
      alert(err);
    });
}
