function isAuthenticated(req, res, next) {
  if (req.session.userId) {
    return next();
  }
  res.redirect("/signin"); // Redirect to sign-in page if not authenticated
}

module.exports = isAuthenticated;
