function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

document.addEventListener("DOMContentLoaded", function () {
  

  // Badge count update
  const favoriteBtn = document.querySelector(
    '.header-action-btn[aria-label="favorite list"] .btn-badge'
  );
  const cartBtn = document.querySelector(
    '.header-action-btn[aria-label="cart"] .btn-badge'
  );

  function updateBadge(btn, count) {
    btn.textContent = count;
  }

  // updateBadge(favoriteBtn, 0);
  // updateBadge(cartBtn, 0);

  // Header menu toggle functionality
  const menuBtn = document.querySelector(
    ".header-action-btn[data-nav-toggler]"
  );
  const header = document.querySelector(".header");

  // menuBtn.addEventListener("click", function () {
  //   const isExpanded = header.classList.toggle("nav-open");
  //   if (isExpanded) {
  //     menuBtn.setAttribute("aria-expanded", "true");
  //     console.log("Menu opened");
  //   } else {
  //     menuBtn.setAttribute("aria-expanded", "false");
  //     console.log("Menu closed");
  //   }
  // });

  //sidebar

  // Sidebar toggle functionality
  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const sidebar = document.querySelector(".sidebar");
  const overlay = document.querySelector("[data-overlay]");

  navTogglers.forEach((toggler) => {
    toggler.addEventListener("click", function () {
      const isExpanded = sidebar.classList.toggle("active");
      overlay.classList.toggle("active", isExpanded);
      if (isExpanded) {
        toggler.setAttribute("aria-expanded", "true");
        console.log("Sidebar opened");
      } else {
        toggler.setAttribute("aria-expanded", "false");
        console.log("Sidebar closed");
      }
    });
  });

  // Dark mode toggle functionality

  // Attach the dark mode toggle function to the button
  function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
  }

  // Navbar link functionality
  const navLinks = document.querySelectorAll("[data-nav-link]");

  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sidebar.classList.remove("active");
      overlay.classList.remove("active");
      navTogglers.forEach((toggler) =>
        toggler.setAttribute("aria-expanded", "false")
      );
      console.log(`Navigated to ${link.getAttribute("href")}`);
    });
  });
  //hero
  document.addEventListener("DOMContentLoaded", function () {
    // Select all hero cards
    const heroCards = document.querySelectorAll(".hero-card");

    // Add hover effect for hero cards
    heroCards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        const img = card.querySelector(".img-cover");
        img.style.transform = "scale(1.1)";
      });

      card.addEventListener("mouseleave", function () {
        const img = card.querySelector(".img-cover");
        img.style.transform = "scale(1)";
      });
    });
  });

  //about
  const aboutCards = document.querySelectorAll(".about-card");

  // Add hover effect for about cards
  aboutCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const img = card.querySelector(".img-cover");
      img.style.transform = "scale(1.1)";
    });

    card.addEventListener("mouseleave", function () {
      const img = card.querySelector(".img-cover");
      img.style.transform = "scale(1)";
    });
  });
  // Add event listeners to filter buttons
  const filterButtons = document.querySelectorAll('[data-filter-btn]');
  console.log(filterButtons)
  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter-btn");
      filterProducts(filter);
    });
  });
  // Function to handle filtering products
  function filterProducts(category) {
    const products = document.querySelectorAll(".product-item");
    products.forEach((product) => {
      const productCategory = product.classList[0]; // Assuming first class is the category
      console.log(
        "Product category:",
        productCategory,
        "Selected category:",
        category
      ); // Debugging log
      if (category === "all" || productCategory === category) {
        product.style.display = "block"; // Show product
      } else {
        product.style.display = "none"; // Hide product
      }
    });
  }

  

  // Select all product cards
  const productCards = document.querySelectorAll(".product-card");

  // Add hover effect for product cards
  productCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const img = card.querySelector(".img-cover");
      img.style.transform = "scale(1.1)";
    });

    card.addEventListener("mouseleave", function () {
      const img = card.querySelector(".img-cover");
      img.style.transform = "scale(1)";
    });
  });

  // footer

  function handleFooterLinkHover() {
    const footerLinks = document.querySelectorAll(".footer-link");

    footerLinks.forEach((link) => {
      link.addEventListener("mouseenter", function () {
        this.style.color = "var(--tan-crayola)";
      });

      link.addEventListener("mouseleave", function () {
        this.style.color = "";
      });
    });
  }

  // Function to handle form submission (if applicable)
  function handleFormSubmission() {
    const form = document.querySelector(".footer-form");
    if (form) {
      form.addEventListener("submit", function (event) {
        event.preventDefault();
        const emailField = form.querySelector(".email-field");
        alert(`Thank you for subscribing with email: ${emailField.value}`);
        emailField.value = ""; // Clear the field after submission
      });
    }
  }

  // Initialize footer interactions
  handleFooterLinkHover();
  handleFormSubmission();

  // Back to Top button
  const backTopBtn = document.querySelector("[data-back-top-btn]");

  // Function to handle scroll event
  function handleScroll() {
    if (window.scrollY > 300) {
      backTopBtn.classList.add("active");
    } else {
      backTopBtn.classList.remove("active");
    }
  }

  // Event listener for scroll
  window.addEventListener("scroll", handleScroll);

  // Smooth scroll to top when the button is clicked
  backTopBtn.addEventListener("click", function (event) {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  document.querySelectorAll(".product-card").forEach((card) => {
    card.addEventListener("click", (event) => {
      // Check if the click target is not a button inside the card
      if (!event.target.closest(".card-action-btn")) {
        window.location.href = "/productdetails"; // Redirect to product details page
      }
    });
  });
});

async function addToWishList(userId, prodId) {
  console.log(userId);
  console.log(prodId);

  fetch(`http://localhost:3000/likeditems/add/${userId}`, {
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
        alert("Product already exist in wishlist");
      }
    })
    .catch((err) => {
      alert(err);
    });
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
        window.location.reload();
      } else {
        alert("Product already exist in cart");
      }
    })
    .catch((err) => {
      console.log(err);
      alert(err);
    });
}
