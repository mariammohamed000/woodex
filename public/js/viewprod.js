let currentProductItem;

function openAddProductPopup() {
  document.getElementById("addProductPopup").style.display = "flex";
}

function closeAddProductPopup() {
  document.getElementById("addProductPopup").style.display = "none";
}

function openEditProductPopup(
  id,
  name,
  price,
  originalPrice,
  discount,
  category,
  sale
) {
  document.getElementById("editName").value = name;
  document.getElementById("editPrice").value = price;
  document.getElementById("editOriginalPrice").value = originalPrice;
  document.getElementById("editDiscount").value = discount;
  document.getElementById("editCategory").value = category;
  document.getElementById("editSale").checked = sale === "true";
  document.getElementById("productId").value = id;
  document.getElementById("editProductPopup").style.display = "flex";
}

function closeEditProductPopup() {
  document.getElementById("editProductPopup").style.display = "none";
}

function deleteProduct(button) {
  if (confirm("Are you sure you want to delete this product?")) {
    button.closest(".product-item").remove();
  }
}

function editProduct(button) {
  openEditProductPopup(button.closest(".product-item"));
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
