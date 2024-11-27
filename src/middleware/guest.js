const isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next(); // Proceed to the next middleware or route handler
  }
  res.redirect("/signin"); // Redirect to the signin page if not authenticated
};

// Export the middleware as a default export
export default isLoggedIn;
