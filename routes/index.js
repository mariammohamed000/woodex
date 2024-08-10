const express = require("express");
const userController = require("../controllers/userController");
const productController = require("../controllers/productController");
const isAuthenticated = require("../isAuthenticated");
const upload = require("../uploadImage");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { adminLoginController } = require("../controllers/adminControllers");
const Product = require("../models/productModel");
const router = express.Router();

// Static routes
// router.get("/seed", async (req, res) => {
//   await User.create({
//     email: "admin",
//     isAdmin: true,
//     address: "lorem",
//     mobile: "lorem",
//     name: "admin",
//     password: bcrypt.hashSync("admin", 10),
//     profilePicture: "http://localhost:3000/1723172792462.png",
//   });
//   return res.send("ok");
// });


/* LANDING PAGE */
router.get("/", async (req, res) => {
  return res.redirect("/homepage");
});

router.get("/homepage", async (req, res) => {
  const products = await Product.find();
  const user = await User.findById(req.session.userId);
  res.render("homepage", { products: products, user: user ? user : undefined });
});

router.get("/aboutus", (req, res) => {
  res.render("aboutus");
});
/* END OF HOME PAGE */

/* USER AUTH */
router.get("/user/:id", userController.getUserByIdController);
router.get("/sign", (req, res) => {
  res.render("sign");
});

router.get("/signup", (req, res) => {
  res.render("signup", { error: "" });
});
router.post("/signup", upload.single("profilePicture"), userController.signUp);

router.get("/signin", (req, res) => {
  res.render("signin", { error: "" }); // Render the sign-in form
});
router.post("/signin", userController.signIn); // Use the signIn function from the controller

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out." });
    }
    res.redirect("/signin"); // Redirect to sign-in page after logging out
  });
});

router.get("/useraccount", isAuthenticated, async (req, res) => {
  const user = await User.findById(req.query.id).populate("orders");
  res.render("useraccount", { user: user, orders: user.orders });
});

router.get("/chooseuser", (req, res) => {
  res.render("chooseuser");
});

router.get("/forgotpassword", (req, res) => {
  res.render("forgotpassword");
});
/* END OF USER AUTH */

/* ADMIN AUTH */
router.get("/adminsignin", (req, res) => {
  res.render("adminsignin", { error: "" });
});
router.post("/adminsignin", adminLoginController);

router.get("/adminprofile", (req, res) => {
  res.render("adminprofile");
});
/* END OF ADMIN AUTH */

/* PRODUCTS */
router.get("/viewprod", async (req, res) => {
  const products = await Product.find();
  res.render("viewprod", { products: products }); // Render
});

router.post(
  "/addProduct",
  upload.single("productPicture"),
  productController.addProductController
);
router.post("/editProduct", productController.updateProductController);
router.post("/deleteProduct/:id", productController.deleteProductController);

router.get("/cart", async (req, res) => {
  const user = await User.findById(req.query.user).populate("cart.item");
  res.render("cart", { cart: user.cart, user: user });
});
router.post("/cart/add/:id", userController.addProductToCartController);

router.get("/likeditems", async (req, res) => {
  const user = await User.findById(req.query.user).populate("wishList");
  res.render("likeditems", { products: user.wishList, user: user });
});
router.post(
  "/likeditems/add/:id",
  userController.addProductToWishlistController
);
router.post(
  "/likeditems/remove/:id",
  userController.removeProductFromWishlistController
);

router.get("/productdetails", (req, res) => {
  res.render("productdetails");
});

router.get("/payment", async (req, res) => {
  const user = await User.findById(req.query.user).populate("cart.item");
  res.render("payment", { user: user, cart: user.cart });
});

router.get(
  "/checkout",
  userController.checkOutCartController,
  userController.handlePayment,
  userController.paymentUserEndPoint
);

router.get(productController.getAllProducts);
router.post(upload.single("productPicture"), productController.addProduct);
router.put(upload.single("productPicture"), productController.editProduct);
router.delete(productController.deleteProduct);
/* END OF PRODUCTS */

module.exports = router;
