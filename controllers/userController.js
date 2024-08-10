// controllers/userController.js
const Product = require("../models/productModel");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
// Sign-up controller function
async function signUp(req, res) {
  try {
    let { email, name, password, confirmPassword, mobile, address } = req.body;
    const profilePicture = req.file ? req.file.filename : null;
    if (password !== confirmPassword) {
      return res.render("signup", { error: "Passwords doesn't match" });
    }
    if (!email || !name || !password) {
      return res.render("signup", { error: "Invalid Credentials" });
    }
    password = bcrypt.hashSync(password, 10);
    const user = await User.findOne({ email: email });
    if (user) {
      return res.render("signup", { error: "User Already Exist" });
    }
    const newUser = new User({
      email,
      name,
      password,
      mobile,
      address,
      profilePicture: profilePicture
        ? `http://localhost:3000/${profilePicture}`
        : null,
    });

    await newUser.save();
    req.session.userId = newUser._id;
    res.render("useraccount", {
      message: "Sign-up successful!",
      user: newUser,
    });
  } catch (err) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
}

// Sign-in controller function
async function signIn(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.render("signup", { error: "Invalid Credentials" });
    }

    const user = await User.findOne({ email: email });
    if (!user) {
      return res.render("signin", { error: "Wrong Email or Password." });
    }
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.render("signin", { error: "Wrong Email or Password." });
    }
    req.session.userId = user._id; // Store user ID in session
    // const products = await Product.find();
    res.redirect("/homepage");
  } catch (err) {
    res.status(500).json({ error: "INTERNAL SERVER ERROR" });
  }
}

async function getUserByIdController(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json("not found");
    }
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function addProductToWishlistController(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user.wishList.includes(req.body.prodId)) {
      return res.status(400).json("already exist");
    }
    user.wishList.push(req.body.prodId);
    await user.save();
    return res.status(200).json("added");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function removeProductFromWishlistController(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user.wishList.includes(req.body.prodId)) {
      return res.status(400).json("product doesn't exist");
    }
    user.wishList = user.wishList.filter((prod) => {
      return prod._id != req.body.prodId;
    });
    await user.save();
    return res.status(200).json("added");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function addProductToCartController(req, res) {
  try {
    const user = await User.findById(req.params.id);
    const productExists = user.cart.some(
      (cartItem) => cartItem.item.toString() === req.body.prodId
    );

    if (productExists) {
      return res.status(400).json("already exist");
    }

    user.cart.push({ item: req.body.prodId, quantity: 1 });
    await user.save();

    return res.status(200).json("added");
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function checkOutCartController(req, res, next) {
  try {
    try {
      let data = {
        api_key: process.env.PAYMOB_API_KEY,
      };
      let cart = await User.findById(req.query.user)
        .populate("cart.item")
        .select("cart");
      console.log(cart);
      let user = await User.findById(req.query.user);
      req.user = user;
      let totalPrice = 0;
      cart.cart.forEach((prod) => {
        totalPrice += prod.item.price;
      });
      let order = {
        cart: cart,
        totalPrice: totalPrice,
      };
      req.order = order;
      let request = await fetch("https://accept.paymob.com/api/auth/tokens", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      let response = await request.json();
      req.token = response.token;
      console.log(order);
      next();
    } catch (error) {
      console.log(error);
      return res.status(500).json("INTERNAL SERVER ERROR");
    }
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

async function handlePayment(req, res, next) {
  try {
    let data = {
      auth_token: req.token,
      delivery_needed: "false",
      amount_cents: req.order.totalPrice * 100,
      currency: "EGP",
      items: [
        {
          name: "ASC1515",
          amount_cents: "500000",
          description: "Smart Watch",
          quantity: "1",
        },
        {
          name: "ERT6565",
          amount_cents: "200000",
          description: "Power Bank",
          quantity: "1",
        },
      ],
    };
    let request = await fetch(
      "https://accept.paymob.com/api/ecommerce/orders",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await request.json();
    req.id = response.id;
    console.log("Response: ", response);
    next();
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}
async function paymentUserEndPoint(req, res) {
  try {
    let arr = [];
    const cart = req.order.cart.cart;
    for (const item of cart) {
      const courseId = item.item._id;
      arr.push(courseId);
    }

    let data = {
      auth_token: req.token,
      amount_cents: req.order.totalPrice * 100,
      expiration: 3600,
      order_id: req.id,
      billing_data: {
        apartment: "NA",
        email: req.user.email,
        floor: "NA",
        first_name: req.user.name.split(" ")[0],
        street: "NA",
        building: "NA",
        phone_number: "+201234567899",
        shipping_method: "NA",
        postal_code: "NA",
        city: "Shorouk",
        country: "EG",
        last_name: req.user.name.split(" ")[1]
          ? req.user.name.split(" ")[1]
          : "NA",
        state: "CAI",
      },
      currency: "EGP",
      integration_id: 4272185,
      lock_order_when_paid: "true",
    };
    let request = await fetch(
      "https://accept.paymob.com/api/acceptance/payment_keys",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    let response = await request.json();
    let url = `https://accept.paymob.com/api/acceptance/iframes/793481?payment_token=${response.token}`;
    let user = await User.findById(req.user._id);
    for (let prod of user.cart) {
      if (!user.orders.includes(prod.item._id)) {
        user.orders.push(prod.item._id);
      }
    }
    user.cart = [];
    await user.save();
    return res.redirect(url);
  } catch (error) {
    console.log(error);
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

// Exporting the functions
module.exports = {
  signUp,
  signIn,
  addProductToWishlistController,
  getUserByIdController,
  addProductToCartController,
  removeProductFromWishlistController,
  checkOutCartController,
  handlePayment,
  paymentUserEndPoint,
};
