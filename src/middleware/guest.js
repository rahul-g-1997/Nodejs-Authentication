// Middleware to check if the user is logged in
// This function ensures that only authenticated users can access specific routes
const isLoggedIn = (req, res, next) => {
  // Check if the user is authenticated using the `req.isAuthenticated` method
  // If the user is authenticated, proceed to the next middleware or route handler
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next(); // Grant access
  }

  // If the user is not authenticated, redirect them to the signin page
  res.redirect("/signin"); // Deny access and redirect to signin
};

// Export the middleware for use in other parts of the application
export default isLoggedIn;
