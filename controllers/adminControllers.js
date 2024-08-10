const User = require("../models/userModel");
const bcrypt = require("bcrypt");
async function adminLoginController(req, res) {
  try {
    const admin = await User.findOne({ email: req.body.email });
    if (!admin) {
      return res.render("adminsignin", { error: "Wrong email or password" });
    }
    if (!admin.isAdmin) {
      return res.render("adminsignin", { error: "Wrong email or password" });
    }
    const valid = bcrypt.compareSync(req.body.password, admin.password);
    if (!valid) {
      return res.render("adminsignin", { error: "Wrong email or password" });
    }
    return res.render("adminprofile", { user: admin });
  } catch (err) {
    return res.status(500).json("INTERNAL SERVER ERROR");
  }
}

module.exports = { adminLoginController };
